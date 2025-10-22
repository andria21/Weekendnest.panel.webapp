'use server';

import { authorizedFetch } from '../apiClient';
import type { CollectionItem } from './getCollections';

export interface CollectionCreateInput {
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  isActive?: boolean;
  position?: number;
}

export const createCollection = async (
  collection: CollectionCreateInput
): Promise<CollectionItem | null> => {
  try {
    const res = await authorizedFetch('http://localhost:5211/api/catalog/collections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(collection),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `Failed to create collection: ${res.status} ${res.statusText}. Body: ${text}`
      );
    }

    const data: CollectionItem = await res.json();
    return data;
  } catch (error) {
    console.error('Error creating collection:', error);
    return null;
  }
};
