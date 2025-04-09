import type { MenuResponse } from "../types/menu";
import { getRequest } from "./requests";

export const getMenuBySlug = async (slug: string): Promise<MenuResponse> => {
  return await getRequest<MenuResponse>(`/public/menus/${slug}`);
};
