"use server";

import { authorizedFetch } from "../apiClient";
import { ProductResponseSchema, ProductResponse } from "@/types/product";

export const getProducts = async (): Promise<ProductResponse> => {
  try {
    const res = await authorizedFetch(
      `${process.env.BASE_URL}/api/catalog/products`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        next: {
          tags: ["products"],
        },
      }
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch products: ${res.status} ${res.statusText}`
      );
    }

    const data = await res.json();
    return ProductResponseSchema.parse(data);
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
