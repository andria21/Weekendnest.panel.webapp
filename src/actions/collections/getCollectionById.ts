'use server';

import { authorizedFetch } from '../apiClient';

export interface CollectionData {
  id: number;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  position: number;
}

export const getCollectionById = async (
  id: number
): Promise<CollectionData | null> => {
  try {
    const res = await authorizedFetch(`${process.env.BASE_URL}/api/catalog/collections/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `Failed to fetch collection: ${res.status} ${res.statusText}. Body: ${text}`
      );
    }

    const data: CollectionData = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching collection by ID:', error);
    return null;
  }
};
