import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express, { Router, Request } from "express";
import helmet from "helmet";
import path from "path";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { postgraphile } = require("postgraphile");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const PgSimplifyInflectorPlugin = require("@graphile-contrib/pg-simplify-inflector");

import { getContext, AuthPlugin } from "./Authorize";

export const handleCors = (router: Router) =>
  router.use(cors({ credentials: true, origin: true }));

export const handleBodyRequestParsing = (router: Router) => {
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());
};

export const handleCompression = (router: Router) => {
  router.use(compression());
};

export const handleHelmet = (router: Router) => {
  router.use(helmet());
};

export const handleApiDocs = (router: Router) => {
  router.use("/apidocs", express.static(path.join(__dirname, "../apidocs")));
};

type LegacyRelationsType = "omit" | "only" | "deprecated" | undefined;

export const handlePostGraphile = (router: Router) => {
  const {
        DATABASE_HOST,
        DATABASE_USER,
        DATABASE_PORT,
        DATABASE_DB,
        DATABASE_PASSWORD
    } = process.env;

  const DB_URL = `postgres://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_DB}`;

  let postgraphileOptions;

  if (process.env.NODE_ENV === "production") {
    postgraphileOptions = {
      graphqlRoute: "/api/v2/graphql",
      graphiqlRoute: "/api/v2/graphiql",
      subscriptions: true,
      retryOnInitFail: true,
      dynamicJson: true,
      extendedErrors: ["errcode"],
      additionalGraphQLContextFromRequest: async (req: Request) => {
        const httpContext = getContext(req);

        return { httpContext };
      },
      appendPlugins: [PgSimplifyInflectorPlugin, AuthPlugin],
      graphiql: false,
      enableQueryBatching: true,
      disableQueryLog: true, // the default logging has performance issues
      legacyRelations: "omit" as LegacyRelationsType
    };
  } else {
    postgraphileOptions = {
      graphqlRoute: "/api/v2/graphql",
      graphiqlRoute: "/api/v2/graphiql",
      subscriptions: true,
      watchPg: true,
      dynamicJson: true,
      showErrorStack: "json",
      extendedErrors: ["hint", "detail", "errcode"],
      additionalGraphQLContextFromRequest: async (req: Request) => {
        const httpContext = getContext(req);

        return { httpContext };
      },
      appendPlugins: [PgSimplifyInflectorPlugin, AuthPlugin],
      graphiql: true,
      enhanceGraphiql: true,
      enableQueryBatching: true,
      legacyRelations: "omit" as LegacyRelationsType
    };
  }

  router.use(postgraphile(DB_URL, "public", postgraphileOptions));
};
