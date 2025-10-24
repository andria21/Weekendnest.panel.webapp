"use server";

import { authorizedFetch } from "../apiClient";
import { CategoryDataSchema, CategoryData } from "@/types/categoriesGet";

export const getCategory = async (
  categoryId: string | number
): Promise<CategoryData | null> => {
  try {
    if (!categoryId) throw new Error("Category ID is required");

    const url = `${process.env.BASE_URL}/api/catalog/categories/${categoryId}`;
    const res = await authorizedFetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: {
        tags: ["categories"],
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `Failed to fetch category: ${res.status} ${res.statusText}. Body: ${text}`
      );
    }

    const data = await res.json();
    return CategoryDataSchema.parse(data);
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
};
