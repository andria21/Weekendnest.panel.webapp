// app/actions/apiClient.ts
'use server';

import { cookies } from 'next/headers';

export const authorizedFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  return fetch(url, { ...options, headers });
};
