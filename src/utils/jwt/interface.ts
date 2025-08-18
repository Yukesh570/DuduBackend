export interface JwtPayload {
  iss?: string | undefined;
  sub?: string | undefined;
  aud?: string | string[] | undefined;
  exp?: number | undefined;
  nbf?: number | undefined;
  iat?: number | undefined;
  jti?: string | undefined;
}

export interface loginJwt extends JwtPayload {
  userId: number;
  username: string;
  userType: string;
}