import { NextFunction, Request, Response } from "express";
import { makeWrapResolversPlugin } from "graphile-utils";

import { HTTP401Error } from "../utils/httpErrors";
import { Principal } from "../dto/Principal";
import { LogLevel } from "../enum/LogLevel";
import { Logger } from "../services/Logger";

const logger = Logger.getInstance();

export function getContext(req: Request) {
  const httpContext = Reflect.getMetadata(
    "inversify-express-utils:httpcontext",
    req
  );

  const principal: Principal = httpContext.user;

  return principal;
}

const Authorize = (permissions: string[] = []) => {
  const error = new HTTP401Error("You don't have access to this resource.");

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const httpContext = getContext(req);

      if (!httpContext) {
        logger.log(LogLevel.Info, "HttpContext not found.", {
          httpContext
        });

        return next(error);
      }

      const isAuthenticated = await httpContext.isAuthenticated();

      if (!isAuthenticated) {
        logger.log(LogLevel.Info, "User not authenticated.", {
          httpContext
        });

        return next(error);
      }

      if (permissions.length && httpContext.details.permissions) {
        if (httpContext.hasPermission(permissions)) {
          return next();
        } else {
          logger.log(LogLevel.Info, "User doesn't have required permission.", {
            httpContext
          });

          return next(error);
        }
      } else {
        return next();
      }
    } catch (e) {
      logger.log(LogLevel.Info, "Authorization error occurred.", {
        e
      });

      return next(error);
    }
  };
};

const validateGraphQLPermissions = (permissionRequired: string[]) => {
  return async (resolver: any, user: any, args: any, context: any) => {
    const { httpContext } = context;
    const isAuthenticated = await httpContext.isAuthenticated();

    if (!isAuthenticated) {
      logger.log(LogLevel.Info, "User not authenticated", {
        httpContext
      });
      throw "User not authenticated";
    }

    if (permissionRequired.length && httpContext.details.permissions) {
      if (!httpContext.hasPermission(permissionRequired)) {
        logger.log(LogLevel.Info, "User doesn't have required permission.", {
          httpContext
        });
        throw 'User doesn\'t have required permission.';
      }
    }
    return resolver();
  };
};

const GRAPHQL_PERMISSIONS = {
  Mutation: {
    createUser: validateGraphQLPermissions(["user:create"]),
    updateUser: validateGraphQLPermissions(["user:update"]),
    deleteUser: validateGraphQLPermissions(["user:delete"])
  },
  Query: {
    users: validateGraphQLPermissions(["user:read"]),
    user: validateGraphQLPermissions(["user:read"])
    // getEventList: validateGraphQLPermissions([])
  }
};

export const AuthPlugin = makeWrapResolversPlugin(GRAPHQL_PERMISSIONS);

export { Authorize };
