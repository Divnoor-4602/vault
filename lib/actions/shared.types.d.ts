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
}

export interface DeleteUserParams {
  clerk_id: string | undefined;
}
