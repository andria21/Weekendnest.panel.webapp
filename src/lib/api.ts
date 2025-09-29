const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:7142";

/**
 * A basic fetch wrapper for the Weekendnest Auth API.
 * @param path The API endpoint path (e.g., '/auth/login').
 * @param method The HTTP method (e.g., 'POST').
 * @param body The request body object.
 * @returns The response data or throws an error.
 */
export async function apiFetch<T>(
  path: string,
  method: string = 'GET',
  body?: unknown,
  token?: string
): Promise<T> {
  const url = `${API_BASE_URL}/api${path}`;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
    cache: 'no-store',
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(url, config);

  if (response.status === 204) {
    return { success: true, message: 'Operation successful (no content)' } as T;
  }

  const data = await response.json();

  if (!response.ok) {
    const errorMessage = data.message || data.error || `HTTP error! Status: ${response.status}`;
    throw new Error(errorMessage);
  }

  return data;
}
