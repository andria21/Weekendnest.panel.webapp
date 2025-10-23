import { z } from "zod";

export const CategoryDataSchema = z.object({
  id: z.number(),
  parentId: z.number().nullable(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  isActive: z.boolean(),
  position: z.number(),
});

export const CategoryInputSchema = z.object({
  parentId: z.union([z.number(), z.string()]).transform((v) =>
    v === "" ? null : Number(v)
  ).nullable(),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  position: z.number().default(0),
});

export type CategoryData = z.infer<typeof CategoryDataSchema>;
export type CategoryInput = z.infer<typeof CategoryInputSchema>;
