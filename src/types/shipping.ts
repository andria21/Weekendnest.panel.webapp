import { z } from "zod";

export const ShippingOptionSchema = z.object({
  code: z.string(),
  name: z.string(),
  price: z.number(),
});

export type ShippingOption = z.infer<typeof ShippingOptionSchema>;
