export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      profileComplete?: boolean;
      setupTeamComplete?: boolean;
    };
  }
}
