"use server";

import { prisma } from "@/lib/prisma";
import { comparePassword, hashPassword, signAccessToken, signRefreshToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";

export async function loginAction(prevState: any, formData: FormData) {
  const identifier = formData.get("identifier") as string;
  const password = formData.get("password") as string;

  if (!identifier || !password) {
    return { error: "Missing fields" };
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { phone: identifier }
        ]
      }
    });

    if (!user) {
      return { error: "Invalid credentials" };
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return { error: "Invalid credentials" };
    }

    const accessToken = await signAccessToken({ userId: user.id, email: user.email, role: user.role });
    const refreshToken = await signRefreshToken({ userId: user.id });

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

  // Redirect outside try-catch to avoid swallowing NEXT_REDIRECT
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

  const role = roleValue === "HOTEL_MANAGER" ? Role.HOTEL_MANAGER : Role.BOOKER;

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { phone }
        ]
      }
    });

    if (existingUser) {
      return { error: "User with this email or phone already exists" };
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        phone,
        passwordHash,
        role
      }
    });

    const accessToken = await signAccessToken({ userId: user.id, email: user.email, role: user.role });
    const refreshToken = await signRefreshToken({ userId: user.id });

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
