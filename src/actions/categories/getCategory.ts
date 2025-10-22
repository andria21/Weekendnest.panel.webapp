'use server';

import { authorizedFetch } from '../apiClient';

export interface CategoryData {
  id: number;
  parentId: number | null;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  position: number;
}

export const getCategory = async (categoryId: string | number): Promise<CategoryData | null> => {
  try {
    if (!categoryId) throw new Error('Category ID is required');

    const url = `http://localhost:5211/api/catalog/categories/${categoryId}`;

    const res = await authorizedFetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to fetch category: ${res.status} ${res.statusText}. Body: ${text}`);
    }

    const data: CategoryData = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
};
