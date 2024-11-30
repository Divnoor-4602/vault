export interface CreateUserParams {
  clerk_id: string;
  username: string | null;
  email: string;
  image_url?: string;
}
