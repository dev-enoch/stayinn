"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { apiClient } from "@/lib/api-client";

export async function loginAction(prevState: any, formData: FormData) {
  const identifier = formData.get("identifier") as string;
  const password = formData.get("password") as string;

  if (!identifier || !password) {
    return { error: "Missing fields" };
  }

  try {
    const response = await apiClient.post('/api/auth/login', { identifier, password });

    if (!response.success) {
      return { error: response.error?.message || "Invalid credentials" };
    }

    const { accessToken, refreshToken } = response.data;

    const cookieStore = await cookies();
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60
    });

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60
    });

  } catch (error) {
    console.error("Login error:", error);
    return { error: "Something went wrong. Please try again." };
  }

  redirect("/");
}

export async function registerAction(prevState: any, formData: FormData) {
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;
  const roleValue = formData.get("role") as string;

  if (!fullName || !email || !phone || !password || !roleValue) {
    return { error: "All fields are required" };
  }

  const role = roleValue === "HOTEL_MANAGER" ? "HOTEL_MANAGER" : "BOOKER";

  try {
    const response = await apiClient.post('/api/auth/register', {
      fullName, email, phone, password, role
    });

    if (!response.success) {
      return { error: response.error?.message || "Failed to create account" };
    }

    const { accessToken, refreshToken } = response.data;

    const cookieStore = await cookies();
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60
    });

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60
    });

  } catch (error) {
    console.error("Register error:", error);
    return { error: "Failed to create account. Please try again." };
  }

  redirect("/");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  redirect("/login");
}
