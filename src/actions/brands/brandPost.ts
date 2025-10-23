"use server";

import { z } from "zod";
import { authorizedFetch } from "../apiClient";

const BrandInputSchema = z.object({
  name: z.string(),
  slug: z.string(),
  logoUrl: z.string(),
  description: z.string(),
  isActive: z.boolean(),
});

const BrandResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  logoUrl: z.string(),
  description: z.string(),
  isActive: z.boolean(),
});

export const createBrand = async (brand: unknown) => {
  try {
    const parsedBrand = BrandInputSchema.parse(brand);

    const res = await authorizedFetch(
      `${process.env.BASE_URL}/api/catalog/brands`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(parsedBrand),
      }
    );

    if (!res.ok) {
      throw new Error(
        `Failed to create brand: ${res.status} ${res.statusText}`
      );
    }

    const json = await res.json();
    return BrandResponseSchema.parse(json);
  } catch (error) {
    console.error("Error creating brand:", error);
    return null;
  }
};
