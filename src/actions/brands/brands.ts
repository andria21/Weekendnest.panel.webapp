"use server";

import { z } from "zod";

const BrandItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  logoUrl: z.string(),
  isActive: z.boolean(),
});

const BrandResponseSchema = z.object({
  items: z.array(BrandItemSchema),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});

type BrandItem = z.infer<typeof BrandItemSchema>;
type BrandResponse = z.infer<typeof BrandResponseSchema>;

export const getBrands = async (): Promise<BrandResponse> => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/catalog/brands`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      next: {
        tags: ["brands"],
      },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch brands: ${res.status} ${res.statusText}`
      );
    }

    const json = await res.json();

    const data = BrandResponseSchema.parse(json);

    return data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    return {
      items: [],
      total: 0,
      page: 1,
      pageSize: 20,
    };
  }
};
