"use server";

import { authorizedFetch } from "../apiClient";
import {
  CategoryData,
  CategoryDataSchema,
  CategoryInput,
  CategoryInputSchema,
} from "@/types/categoriesCreate";

export const createCategory = async (
  category: CategoryInput
): Promise<CategoryData | null> => {
  try {
    const parsed = CategoryInputSchema.parse(category);

    const res = await authorizedFetch(
      `${process.env.BASE_URL}/api/catalog/categories`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(parsed),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `Failed to create category: ${res.status} ${res.statusText}. Body: ${text}`
      );
    }

    const data = await res.json();
    return CategoryDataSchema.parse(data);
  } catch (error) {
    console.error("Error creating category:", error);
    return null;
  }
};
