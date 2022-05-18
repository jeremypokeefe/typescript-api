export interface IDecodedToken {
  authenticated: boolean;
  userId?: string;
  permissions?: string[];
}
