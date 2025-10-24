"use server";

import { z } from "zod";
import { authorizedFetch } from "../apiClient";
import { revalidateTag } from "next/cache";

const BrandUpdateSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  slug: z.string().optional(),
  logoUrl: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});

const BrandResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  logoUrl: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean(),
});

export const updateBrand = async (brand: unknown) => {
  try {
    const parsedBrand = BrandUpdateSchema.parse(brand);

    const res = await authorizedFetch(
      `${process.env.BASE_URL}/api/catalog/brands/${parsedBrand.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(parsedBrand),
      }
    );

    if (!res.ok) {
      throw new Error(
        `Failed to update brand: ${res.status} ${res.statusText}`
      );
    }

    revalidateTag("brands");

    const json = await res.json();
    return BrandResponseSchema.parse(json);
  } catch (error) {
    console.error("Error updating brand:", error);
    return null;
  }
};
