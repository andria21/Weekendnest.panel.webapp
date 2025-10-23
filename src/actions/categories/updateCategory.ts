'use server';

import { authorizedFetch } from '../apiClient';

export interface CategoryUpdateInput {
  parentId?: number | null;
  name?: string;
  slug?: string;
  description?: string;
  isActive?: boolean;
  position?: number;
}

export interface CategoryData {
  id: number;
  parentId?: number;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  position: number;
}

export const updateCategory = async (
  id: number,
  category: CategoryUpdateInput
): Promise<CategoryData | null> => {
  try {
    const res = await authorizedFetch(`${process.env.BASE_URL}/api/catalog/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(category),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to update category: ${res.status} ${res.statusText}. Body: ${text}`);
    }

    const data: CategoryData = await res.json();
    return data;
  } catch (error) {
    console.error('Error updating category:', error);
    return null;
  }
};
