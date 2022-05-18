import { interfaces } from "inversify-express-utils";
import { IDecodedToken } from "../dto/IDecodedToken";

export class Principal implements interfaces.Principal {
  public details: any;

  public constructor(
    decodedToken: IDecodedToken = {
      authenticated: false,
      userId: undefined,
      permissions: []
    }
  ) {
    this.details = decodedToken;
  }

  public isAuthenticated(): Promise<boolean> {
    return Promise.resolve(this.details ? this.details.authenticated : false);
  }

  public isResourceOwner(resourceId: any): Promise<boolean> {
    throw Error("Not Implemented");
  }

  public isInRole(role: string): Promise<boolean> {
    throw Error("Not Implemented");
  }

  public hasPermission(permissions: string[]) {
    const userPermissions = this.details.permissions as string[];
    const matches = userPermissions.filter(permission =>
          permissions.includes(permission)
      );

    return Boolean(matches.length);
  }
}
