import { fetcher } from "./fetcher";

interface DishInput {
  name: string;
  description?: string;
  price: number;
  categoryId: string;
  available?: boolean;
  imageUrl?: string;
}

export async function createDish(data: DishInput) {
  return fetcher("/api/dishes", { method: "POST", body: data });
}

export async function updateDish(id: string, data: Partial<DishInput>) {
  return fetcher(`/api/dishes/${id}`, { method: "PUT", body: data });
}

export async function deleteDish(id: string) {
  return fetcher(`/api/dishes/${id}`, { method: "DELETE" });
}
