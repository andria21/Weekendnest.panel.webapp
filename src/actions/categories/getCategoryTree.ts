"use server";

import { z } from "zod";
import { authorizedFetch } from "../apiClient";
import {
  CategoryTreeItemSchema,
  CategoryTreeItem,
} from "@/types/categoriesTreeGet";

export const getCategoryTree = async (): Promise<CategoryTreeItem[]> => {
  try {
    const res = await authorizedFetch(
      `${process.env.BASE_URL}/api/catalog/categories/tree`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `Failed to fetch category tree: ${res.status} ${res.statusText}. Body: ${text}`
      );
    }

    const data = await res.json();
    return z.array(CategoryTreeItemSchema).parse(data);
  } catch (error) {
    console.error("Error fetching category tree:", error);
    return [];
  }
};
