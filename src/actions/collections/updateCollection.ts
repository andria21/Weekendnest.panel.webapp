'use server';

import { authorizedFetch } from '../apiClient';

export interface CollectionUpdateInput {
  name?: string;
  slug?: string;
  description?: string;
  imageUrl?: string;
  isActive?: boolean;
  position?: number;
}

export interface CollectionData {
  id: number;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
  position: number;
}

export const updateCollection = async (
  id: number,
  collection: CollectionUpdateInput
): Promise<CollectionData | null> => {
  try {
    const res = await authorizedFetch(`${process.env.BASE_URL}/api/catalog/collections/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(collection),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to update collection: ${res.status} ${res.statusText}. Body: ${text}`);
    }

    const data: CollectionData = await res.json();
    return data;
  } catch (error) {
    console.error('Error updating collection:', error);
    return null;
  }
};
