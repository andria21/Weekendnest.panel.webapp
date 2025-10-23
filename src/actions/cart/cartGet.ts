'use server';

import { authorizedFetch } from '../apiClient';
import { z } from 'zod';

const CartItemSchema = z.object({
  id: z.number(),
  productId: z.number(),
  quantity: z.number(),
  price: z.number(),
});

const CartDataSchema = z.object({
  id: z.number(),
  cartKey: z.string(),
  userId: z.number(),
  items: z.array(CartItemSchema),
  subtotal: z.number(),
  currency: z.string(),
});

const CartResponseSchema = z.object({
  success: z.boolean(),
  data: CartDataSchema,
});

export type CartItem = z.infer<typeof CartItemSchema>;
export type CartData = z.infer<typeof CartDataSchema>;
export type CartResponse = z.infer<typeof CartResponseSchema>;

export const getCart = async (cartId: string | number): Promise<CartResponse | null> => {
  try {
    if (!cartId) throw new Error('Cart ID is required');

    const url = `${process.env.BASE_URL}/api/cart?cartId=${cartId}`;

    const res = await authorizedFetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await res.json();

    const parsed = CartResponseSchema.safeParse(json);
    if (!parsed.success) {
      console.error('Cart response validation failed:', parsed.error);
      return null;
    }

    return parsed.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    return null;
  }
};
