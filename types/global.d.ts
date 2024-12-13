export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean;
      userPreferences?: {
        authors: string[];
        genres: string[];
        books: string[];
      };
    };
  }
}
