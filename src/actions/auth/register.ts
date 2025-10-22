"use server";

import { cookies } from "next/headers";

export const registerAction = async (
  _prevState: { success: boolean; message: string },
  formData: FormData
): Promise<{ success: boolean; message: string }> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token)
    throw new Error("Unauthorized: You must be logged in to register a user.");

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const title = Number(formData.get("title"));
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const dobDay = Number(formData.get("dobDay"));
  const dobMonth = Number(formData.get("dobMonth"));
  const dobYear = Number(formData.get("dobYear"));
  const mobilePhone = formData.get("mobilePhone") as string;

  if (!email || !password || !firstName || !lastName)
    throw new Error("Missing required fields");

  const res = await fetch("http://localhost:5211/api/Auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email,
      password,
      title,
      firstName,
      lastName,
      dobDay,
      dobMonth,
      dobYear,
      mobilePhone,
    }),
  });

  // if (!res.ok) {
  //   const errorText = await res.text();
  //   throw new Error(`Registration failed: ${errorText || res.statusText}`);
  // }
  if (!res.ok) {
    const text = await res.text();
    return { success: false, message: text || "Failed to register user" };
  }

  return { success: true, message: "User registered successfully" };
};
