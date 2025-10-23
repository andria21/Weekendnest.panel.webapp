'use server';

import { authorizedFetch } from '../apiClient';

export interface CollectionItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
  position: number;
}

export interface CollectionResponse {
  items: CollectionItem[];
  total: number;
  page: number;
  pageSize: number;
}

export const getCollections = async (): Promise<CollectionResponse | null> => {
  try {
    const res = await authorizedFetch(`${process.env.BASE_URL}/api/catalog/collections`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to fetch collections: ${res.status} ${res.statusText}. Body: ${text}`);
    }

    const data: CollectionResponse = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching collections:', error);
    return null;
  }
};
