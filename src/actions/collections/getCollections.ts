"use server";

import { authorizedFetch } from "../apiClient";
import { z } from "zod";

const CollectionItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  imageUrl: z.string().nullable(),
  isActive: z.boolean(),
  position: z.number(),
});

const CollectionResponseSchema = z.object({
  items: z.array(CollectionItemSchema),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});

export const getCollections = async () => {
  try {
    const res = await authorizedFetch(
      `${process.env.BASE_URL}/api/catalog/collections`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        next: {
          tags: ["collections"],
        },
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `Failed to fetch collections: ${res.status} ${res.statusText}. Body: ${text}`
      );
    }

    const data = await res.json();
    return CollectionResponseSchema.parse(data);
  } catch (error) {
    console.error("Error fetching collections:", error);
    return null;
  }
};
