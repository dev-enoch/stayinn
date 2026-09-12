import { SignJWT, jwtVerify, JWTPayload } from "jose";
import bcrypt from "bcryptjs";

const getAccessSecret = () =>
  new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);
const getRefreshSecret = () =>
  new TextEncoder().encode(process.env.JWT_REFRESH_SECRET);

export interface SessionPayload {
  userId: string;
  email?: string;
  role?: string;
}

export async function signAccessToken(payload: SessionPayload) {
  return new SignJWT(payload as unknown as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(getAccessSecret());
}

export async function signRefreshToken(payload: { userId: string }) {
  return new SignJWT(payload as unknown as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getRefreshSecret());
}

export async function verifyAccessToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getAccessSecret());
    return payload as unknown as SessionPayload;
  } catch (error: unknown) {
    return null;
  }
}

export async function verifyRefreshToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getRefreshSecret());
    return payload as unknown as { userId: string };
  } catch (error: unknown) {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

import { cookies } from "next/headers";

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (!token) return null;
    return verifyAccessToken(token);
  } catch (error) {
    return null;
  }
}
