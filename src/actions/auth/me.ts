"use server";
import { cookies } from "next/headers";

export interface MeResponse {
  id: string;
  email: string;
  name: string;
}

export const meAction = async (): Promise<MeResponse | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return null;
  }

  try {
    const res = await fetch(`${process.env.BASE_URL}/api/Auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      cookieStore.delete("auth_token");
      return null;
    }

    if (!res.ok) {
      console.error("Failed to fetch user info:", res.status, res.statusText);
      return null;
    }

    const data: MeResponse = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching user info:", err);
    return null;
  }
};
