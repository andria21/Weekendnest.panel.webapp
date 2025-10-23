"use server";

import { authorizedFetch } from "../apiClient";
import { z } from "zod";
import { ShippingOptionSchema, ShippingOption } from "@/types/shipping";

const ShippingResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(ShippingOptionSchema),
});

export const getShippingOptions = async (country: string): Promise<ShippingOption[]> => {
  try {
    const res = await authorizedFetch(
      `${process.env.BASE_URL}/api/shipping/methods?country=${encodeURIComponent(country)}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `Failed to fetch shipping options: ${res.status} ${res.statusText}. Body: ${text}`
      );
    }

    const data = await res.json();
    const parsed = ShippingResponseSchema.parse(data);
    return parsed.success ? parsed.data : [];
  } catch (err) {
    console.error("Error fetching shipping options:", err);
    return [];
  }
};
