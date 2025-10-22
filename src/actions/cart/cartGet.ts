'use server';

import { authorizedFetch } from '../apiClient';

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
}

export interface CartData {
  id: number;
  cartKey: string;
  userId: number;
  items: CartItem[];
  subtotal: number;
  currency: string;
}

export interface CartResponse {
  success: boolean;
  data: CartData;
}

export const getCart = async (cartId: string | number): Promise<CartResponse | null> => {
  try {
    if (!cartId) throw new Error('Cart ID is required');

    const url = `http://localhost:5211/api/cart?cartId=${cartId}`;

    const res = await authorizedFetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(`Failed to fetch cart: ${res.status} ${res.statusText}`);
    }

    return data as CartResponse;
  } catch (error) {
    console.error('Error fetching cart:', error);
    return null;
  }
};
