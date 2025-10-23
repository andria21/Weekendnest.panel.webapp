// app/actions/getProducts.ts
"use server";

export interface ProductItem {
  id: number;
  sku: string;
  name: string;
  slug: string;
  description?: string;
  brandId: number;
  featured: boolean;
  status: string;
}

export interface ProductResponse {
  items: ProductItem[];
  total: number;
  page: number;
  pageSize: number;
}

export const getProducts = async (): Promise<ProductResponse> => {
  try {
    const res = await fetch("http://localhost:5211/api/catalog/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch products: ${res.status} ${res.statusText}`
      );
    }

    const data: ProductResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      items: [],
      total: 0,
      page: 1,
      pageSize: 20,
    };
  }
};
