import { z } from "zod";

export const CategoryUpdateInputSchema = z.object({
  parentId: z
    .union([z.number(), z.null(), z.string().transform(Number)])
    .optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
  position: z
    .union([z.number(), z.string().transform(Number)])
    .optional(),
});

export const CategoryDataSchema = z.object({
  id: z.number(),
  parentId: z.number().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  isActive: z.boolean(),
  position: z.number(),
});

export type CategoryUpdateInput = z.infer<typeof CategoryUpdateInputSchema>;
export type CategoryData = z.infer<typeof CategoryDataSchema>;
