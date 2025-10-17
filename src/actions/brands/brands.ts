// app/actions/getBrands.ts
export interface BrandItem {
  description: string;
  id: string;
  isActive: boolean;
  logoUrl: string;
  name: string;
  slug: string;
}

export interface BrandResponse {
  items: BrandItem[];
  total: number;
  page: number;
  pageSize: number;
}

export const getBrands = async (): Promise<BrandResponse> => {
  try {
    const res = await fetch("http://localhost:5211/api/catalog/brands", {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch brands: ${res.status} ${res.statusText}`
      );
    }

    const data: BrandResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    return {
      items: [],
      total: 0,
      page: 1,
      pageSize: 20,
    };
  }
};
