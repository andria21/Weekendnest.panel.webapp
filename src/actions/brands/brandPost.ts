'use server';

import { authorizedFetch } from "../apiClient";

export interface BrandInput {
  name: string;
  slug: string;
  logoUrl: string;
  description: string;
  isActive: boolean;
}

export interface BrandResponse {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  description: string;
  isActive: boolean;
}

export const createBrand = async (brand: BrandInput): Promise<BrandResponse | null> => {
  try {
    const res = await authorizedFetch('http://localhost:5211/api/catalog/brands', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(brand),
    });

    if (!res.ok) {
      throw new Error(`Failed to create brand: ${res.status} ${res.statusText}`);
    }
    console.log(brand);
    

    const data: BrandResponse = await res.json();
    return data;
  } catch (error) {
    console.error('Error creating brand:', error);
    return null;
  }
};
