import { fetcher } from "./fetcher";

interface RegisterInput {
  name: string;
  restaurantName: string;
  slug: string;
  email: string;
  password: string;
}

interface AuthResponse {
  // Add fields as needed based on your auth implementation
}

export async function register(data: RegisterInput): Promise<AuthResponse> {
  return fetcher<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: data,
  });
}
