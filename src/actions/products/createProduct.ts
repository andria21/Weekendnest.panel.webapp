'use server';

import { authorizedFetch } from '../apiClient';
import type { ProductItem } from './getProducts';

export interface ProductCreateInput {
  sku: string;
  name: string;
  slug: string;
  description?: string;
  brandId: number;
  featured: boolean;
  status: string;
}

export const createProduct = async (
  product: ProductCreateInput
): Promise<ProductItem | null> => {
  try {
    const res = await authorizedFetch(`${process.env.BASE_URL}/api/catalog/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(product),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `Failed to create product: ${res.status} ${res.statusText}. Body: ${text}`
      );
    }

    const data: ProductItem = await res.json();
    return data;
  } catch (error) {
    console.error('Error creating product:', error);
    return null;
  }
};
