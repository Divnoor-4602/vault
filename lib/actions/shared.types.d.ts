export interface CreateUserParams {
  clerk_id: string;
  username: string | null;
  email: string;
  image_url?: string;
}

export interface UpdateUserParams {
  clerk_id: string;
  username?: string | null;
  email?: string;
  image_url?: string;
  interests?: string[];
}

export interface DeleteUserParams {
  clerk_id: string | undefined;
}

export interface CompleteUserOnboardingParams {
  authors?: string[];
  genres?: string[];
  books?: string[];
}

export interface SearchBookParams {
  title?: string = "";
  author?: string = "";
  genre?: string = "";
  limit?: number = 10;
}

export interface BookParams {
  title: any;
  author_name: string;
  cover_i: string;
}
