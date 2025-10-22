'use server';

import { authorizedFetch } from '../apiClient';

export interface CategoryTreeItem {
  id: number;
  name: string;
  slug: string;
  isActive: boolean;
  parentId: number | null;
  children: CategoryTreeItem[];
}

export const getCategoryTree = async (): Promise<CategoryTreeItem[]> => {
  try {
    const res = await authorizedFetch('http://localhost:5211/api/catalog/categories/tree', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to fetch category tree: ${res.status} ${res.statusText}. Body: ${text}`);
    }

    const data: CategoryTreeItem[] = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching category tree:', error);
    return [];
  }
};
