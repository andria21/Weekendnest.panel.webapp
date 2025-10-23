import { z } from "zod";

export const CategoryTreeItemSchema: z.ZodType<unknown> = z.lazy(() =>
  z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    isActive: z.boolean(),
    parentId: z.number().nullable(),
    children: z.array(CategoryTreeItemSchema),
  })
);

export type CategoryTreeItem = z.infer<typeof CategoryTreeItemSchema>;
