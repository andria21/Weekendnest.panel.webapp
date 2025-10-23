'use server';

import { authorizedFetch } from '../apiClient';
import { z } from 'zod';

const CollectionDataSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  imageUrl: z.string().nullable().optional(),
  isActive: z.boolean(),
  position: z.number(),
});

export const getCollectionById = async (id: number) => {
  try {
    const res = await authorizedFetch(
      `${process.env.BASE_URL}/api/catalog/collections/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `Failed to fetch collection: ${res.status} ${res.statusText}. Body: ${text}`
      );
    }

    const data = await res.json();
    return CollectionDataSchema.parse(data);
  } catch (error) {
    console.error('Error fetching collection by ID:', error);
    return null;
  }
};
