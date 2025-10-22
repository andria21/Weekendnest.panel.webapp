'use server';

import { authorizedFetch } from '../apiClient';

export interface CategoryInput {
  parentId?: number;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  position: number;
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

export const createCategory = async (category: CategoryInput): Promise<CategoryData | null> => {
  try {
    const res = await authorizedFetch('http://localhost:5211/api/catalog/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(category),
    });    

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to create category: ${res.status} ${res.statusText}. Body: ${text}`);
    }

    const data: CategoryData = await res.json();
    return data;
  } catch (error) {
    console.error('Error creating category:', error);
    return null;
  }
};
