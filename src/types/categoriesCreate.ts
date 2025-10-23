import { z } from "zod";

export const CategoryInputSchema = z.object({
  parentId: z
    .string()
    .optional()
    .refine((val) => val === undefined || val === "" || !isNaN(Number(val)), {
      message: "parentId must be a number",
    })
    .transform((val) =>
      val === undefined || val === "" ? undefined : Number(val)
    ),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  isActive: z.boolean(),
  position: z.number(),
});

export const CategoryDataSchema = CategoryInputSchema.extend({
  id: z.number(),
});

export type CategoryInput = z.infer<typeof CategoryInputSchema>;
export type CategoryData = z.infer<typeof CategoryDataSchema>;
