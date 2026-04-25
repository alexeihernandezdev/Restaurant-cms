import { fetcher } from "./fetcher";

interface CategoryInput {
  name: string;
  description?: string;
}

export async function createCategory(data: CategoryInput) {
  return fetcher("/api/categories", { method: "POST", body: data });
}

export async function updateCategory(id: string, data: CategoryInput) {
  return fetcher(`/api/categories/${id}`, { method: "PUT", body: data });
}

export async function deleteCategory(id: string) {
  return fetcher(`/api/categories/${id}`, { method: "DELETE" });
}
