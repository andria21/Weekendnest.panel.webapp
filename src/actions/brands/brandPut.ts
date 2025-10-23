"use server";

import { authorizedFetch } from "../apiClient";

export interface BrandUpdate {
  id: number;
  name?: string;
  slug?: string;
  logoUrl?: string;
  description?: string;
  isActive?: boolean;
}

export interface BrandResponse {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  description?: string;
  isActive: boolean;
}

export const updateBrand = async (
  brand: BrandUpdate
): Promise<BrandResponse | null> => {
  try {
    if (!brand.id) throw new Error("Missing brand ID");

    const res = await authorizedFetch(
      `${process.env.BASE_URL}/api/catalog/brands/${brand.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(brand),
      }
    );

    if (!res.ok) {
      throw new Error(
        `Failed to update brand: ${res.status} ${res.statusText}`
      );
    }

    const data: BrandResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error updating brand:", error);
    return null;
  }
};
