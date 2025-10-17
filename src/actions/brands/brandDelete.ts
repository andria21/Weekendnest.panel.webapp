'use server';

import { authorizedFetch } from "../apiClient";

export const deleteBrand = async (id: string | number): Promise<boolean> => {
  try {
    if (!id) throw new Error('Missing brand ID');

    const res = await authorizedFetch(`http://localhost:5211/api/catalog/brands/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to delete brand: ${res.status} ${res.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Error deleting brand:', error);
    return false;
  }
};
