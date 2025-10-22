'use server';

import { authorizedFetch } from '../apiClient';

export const deleteCategory = async (id: string | number): Promise<boolean> => {
  try {
    if (!id) throw new Error('Missing category ID');

    const res = await authorizedFetch(`http://localhost:5211/api/catalog/categories/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to delete category: ${res.status} ${res.statusText}. Body: ${text}`);
    }

    return true;
  } catch (error) {
    console.error('Error deleting category:', error);
    return false;
  }
};
