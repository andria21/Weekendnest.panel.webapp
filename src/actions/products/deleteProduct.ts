'use server';

import { authorizedFetch } from '../apiClient';

export const deleteProduct = async (id: number): Promise<boolean> => {
  try {
    const res = await authorizedFetch(`${process.env.BASE_URL}/api/catalog/products/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `Failed to delete product: ${res.status} ${res.statusText}. Body: ${text}`
      );
    }

    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
};