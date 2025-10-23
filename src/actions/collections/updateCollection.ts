'use server';

import { authorizedFetch } from '../apiClient';
import { z } from 'zod';

const CollectionUpdateInputSchema = z.object({
  name: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().nullable().optional(),
  isActive: z.boolean().optional(),
  position: z.number().optional(),
});

const CollectionDataSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  imageUrl: z.string().nullable(),
  isActive: z.boolean(),
  position: z.number(),
});

export const updateCollection = async (id: number, collection: unknown) => {
  try {
    const parsed = CollectionUpdateInputSchema.parse(collection);

    const res = await authorizedFetch(
      `${process.env.BASE_URL}/api/catalog/collections/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(parsed),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `Failed to update collection: ${res.status} ${res.statusText}. Body: ${text}`
      );
    }

    const data = await res.json();
    return CollectionDataSchema.parse(data);
  } catch (error) {
    console.error('Error updating collection:', error);
    return null;
  }
};
