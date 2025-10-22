"use server";
import { cookies } from "next/headers";

export const loginAction = async (formData: FormData): Promise<void> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) throw new Error("Email and password required");

  const res = await fetch("http://localhost:5211/api/Auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Invalid credentials");

  const data = await res.json();
  if (!data.token) throw new Error("No token returned");

  const cookieStore = await cookies();
  cookieStore.set("auth_token", data.token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: data.expiresIn ?? 60 * 60 * 24, // 1 day
  });
};