"use server";

import { authorizedFetch } from "../apiClient";
import { z } from "zod";

const CollectionCreateInputSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  imageUrl: z.string().nullable().optional(),
  isActive: z.boolean().optional(),
  position: z.union([z.number(), z.string().transform(Number)]).optional(),
});

const CollectionItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  isActive: z.boolean(),
  position: z.number().optional(),
});

export const createCollection = async (collection: unknown) => {
  try {
    const parsed = CollectionCreateInputSchema.parse(collection);

    const res = await authorizedFetch(
      `${process.env.BASE_URL}/api/catalog/collections`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(parsed),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `Failed to create collection: ${res.status} ${res.statusText}. Body: ${text}`
      );
    }

    const data = await res.json();
    return CollectionItemSchema.parse(data);
  } catch (error) {
    console.error("Error creating collection:", error);
    return null;
  }
};
