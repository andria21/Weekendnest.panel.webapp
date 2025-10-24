'use server';

import { revalidateTag } from "next/cache";
import { authorizedFetch } from "../apiClient";
import {
  CategoryUpdateInputSchema,
  CategoryDataSchema,
  CategoryUpdateInput,
  CategoryData,
} from "@/types/categoryUpdate";

export const updateCategory = async (
  id: number,
  category: CategoryUpdateInput
): Promise<CategoryData | null> => {
  try {
    const parsed = CategoryUpdateInputSchema.parse(category);

    const res = await authorizedFetch(
      `${process.env.BASE_URL}/api/catalog/categories/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(parsed),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `Failed to update category: ${res.status} ${res.statusText}. Body: ${text}`
      );
    }

    revalidateTag('categories')

    const data = await res.json();
    return CategoryDataSchema.parse(data);
  } catch (error) {
    console.error("Error updating category:", error);
    return null;
  }
};
