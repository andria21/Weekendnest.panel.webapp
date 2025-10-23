import { z } from "zod";

export const ProductItemSchema = z.object({
  id: z.number(),
  sku: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  brandId: z.number(),
  featured: z.boolean(),
  status: z.string(),
});

export type ProductItem = z.infer<typeof ProductItemSchema>;

export const ProductResponseSchema = z.object({
  items: z.array(ProductItemSchema),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});

export type ProductResponse = z.infer<typeof ProductResponseSchema>;

export const ProductUpdateInputSchema = z.object({
  sku: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  brandId: z.number(),
  featured: z.boolean(),
  status: z.string(),
});
export type ProductUpdateInput = z.infer<typeof ProductUpdateInputSchema>;
