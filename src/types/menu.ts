export interface MenuResponse {
  slug: string;
  name: string;
  theme?: string;
  logo?: string;
  menus?: Array<{
    name: string;
    type: string;
    branch: string | null;
    categories: Array<{
      name: string;
      items: Array<{
        name: string;
        description?: string;
        price: number;
        image?: string;
        tags?: string[];
        recommendedFor?: string[];
        allergens?: string[];
        flavors?: string[];
        isFavorite?: boolean;
      }>;
    }>;
  }>;

  branches?: Array<{
    name: string;
    slug: string;
  }>;

  // 🔽 Campo clave para el renderizado condicional
  redirectToAll?: boolean;
}
