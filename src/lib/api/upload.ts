import { fetcher } from "../utils/fetcher";

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return fetcher<{ url: string }>("/api/upload", {
    method: "POST",
    body: formData,
    headers: {},
  });
}
