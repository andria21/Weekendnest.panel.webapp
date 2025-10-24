"use server";

import { revalidateTag } from "next/cache";
import { authorizedFetch } from "../apiClient";
import { z } from "zod";

const ProductCreateInputSchema = z.object({
  sku: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  brandId: z.number(),
  featured: z.boolean(),
  status: z.string(),
});

type ProductCreateInput = z.infer<typeof ProductCreateInputSchema>;

export const createProduct = async (
  product: ProductCreateInput
): Promise<ProductCreateInput | null> => {
  try {
    const parsed = ProductCreateInputSchema.parse(product);

    const res = await authorizedFetch(
      `${process.env.BASE_URL}/api/catalog/products`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(parsed),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `Failed to create product: ${res.status} ${res.statusText}. Body: ${text}`
      );
    }

    revalidateTag('products')

    const data: ProductCreateInput = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating product:", error);
    return null;
  }
};
