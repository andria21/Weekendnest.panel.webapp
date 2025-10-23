'use server';

import { authorizedFetch } from '../apiClient';
import type { ProductItem } from './getProducts';

export interface ProductUpdateInput {
  sku: string;
  name: string;
  slug: string;
  description?: string;
  brandId: number;
  featured: boolean;
  status: string;
}

export const updateProduct = async (
  id: number,
  product: ProductUpdateInput
): Promise<ProductItem | null> => {
  try {
    const res = await authorizedFetch(`${process.env.BASE_URL}/api/catalog/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(product),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `Failed to update product: ${res.status} ${res.statusText}. Body: ${text}`
      );
    }

    const data: ProductItem = await res.json();
    return data;
  } catch (error) {
    console.error('Error updating product:', error);
    return null;
  }
};
