// actions/auth.ts
"use server";

import { apiFetch } from "@/lib/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const JWT_COOKIE_KEY = "jwt";
const HOME_PAGE = "/dashboard";

interface LoginResponse {
  token: string;
  email: string;
}

interface AuthActionResponse {
  success: boolean;
  message: string;
}

interface MeResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}
// -----------------------------------------------------------------

/**
 * Server Action to handle user login.
 * @param formData FormData from the login form.
 * @returns A promise that resolves to a success/error message object.
 */
export async function loginAction(
  prevState: AuthActionResponse,
  formData: FormData
): Promise<AuthActionResponse> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, message: "Email and password are required." };
  }

  try {
    // mock wait
    // await new Promise((r) => setTimeout(r, 1000));
    const data: LoginResponse = await apiFetch("/auth/login", "POST", {
      email,
      password,
    });

    if (data.token) {
      const cookieStore = await cookies();
      cookieStore.set(JWT_COOKIE_KEY, data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      });

      // 2. Redirect the user
      redirect(HOME_PAGE);
    }

    return { success: true, message: "Login successful!" };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unknown error occurred during login.";
    return { success: false, message: errorMessage };
  }
}

/**
 * Server Action to handle user registration.
 * (Based on your 'Auth - Register' endpoint)
 * @param formData FormData from the registration form.
 * @returns A promise that resolves to a success/error message object.
 */
export async function registerAction(
  prevState: AuthActionResponse,
  formData: FormData
): Promise<AuthActionResponse> {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!firstName || !lastName || !email || !password) {
    return {
      success: false,
      message: "All fields are required for registration.",
    };
  }

  try {
    await apiFetch("/auth/register", "POST", {
      firstName,
      lastName,
      email,
      password,
    });

    return {
      success: true,
      message: "Registration successful. Please log in.",
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unknown error occurred during registration.";
    return { success: false, message: errorMessage };
  }
}

export async function meAction(): Promise<MeResponse | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(JWT_COOKIE_KEY)?.value;

    if (!token) return null;

    return await apiFetch<MeResponse>("/auth/me", "GET", undefined, token);
  } catch (error) {
    console.error("Failed to fetch user with meAction:", error);
    return null;
  }
}
