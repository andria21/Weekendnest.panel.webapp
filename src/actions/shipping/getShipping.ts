"use server";

import { authorizedFetch } from "../apiClient";

export interface ShippingOption {
  code: string;
  name: string;
  price: number;
}

export interface ShippingResponse {
  success: boolean;
  data: ShippingOption[];
}

export const getShippingOptions = async (
  country: string
): Promise<ShippingOption[]> => {
  try {
    const res = await authorizedFetch(
      `${
        process.env.BASE_URL
      }/api/shipping/methods?country=${encodeURIComponent(country)}`,
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

    const data: ShippingResponse = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error("Error fetching shipping options:", err);
    return [];
  }
};
