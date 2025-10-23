'use server';

import { authorizedFetch } from '../apiClient';
import { ProductItemSchema, ProductUpdateInputSchema, ProductItem, ProductUpdateInput } from '@/types/product';

export const updateProduct = async (
  id: number,
  product: ProductUpdateInput
): Promise<ProductItem | null> => {
  try {
    const parsedInput = ProductUpdateInputSchema.parse(product);

    const res = await authorizedFetch(`${process.env.BASE_URL}/api/catalog/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(parsedInput),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `Failed to update product: ${res.status} ${res.statusText}. Body: ${text}`
      );
    }

    const data = await res.json();
    return ProductItemSchema.parse(data);
  } catch (error) {
    console.error('Error updating product:', error);
    return null;
  }
};
