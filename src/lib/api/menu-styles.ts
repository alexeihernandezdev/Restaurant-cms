import { fetcher } from "../utils/fetcher";

interface MenuStyleInput {
  template: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
}

export async function updateMenuStyle(id: string, data: MenuStyleInput) {
  return fetcher(`/api/menu-styles/${id}`, { method: "PUT", body: data });
}
