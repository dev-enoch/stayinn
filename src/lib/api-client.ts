import { cookies } from "next/headers";

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  // Fallback for local development if NEXT_PUBLIC_APP_URL is not set
  return process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";
};

const getHeaders = async (initHeaders?: HeadersInit) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  
  const headers = new Headers(initHeaders);
  headers.set("Content-Type", "application/json");
  
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  
  return headers;
};

export const apiClient = {
  async get(path: string, options?: RequestInit) {
    const headers = await getHeaders(options?.headers);
    const res = await fetch(`${getBaseUrl()}${path}`, {
      ...options,
      method: "GET",
      headers,
    });
    return res.json();
  },

  async post(path: string, body?: any, options?: RequestInit) {
    const headers = await getHeaders(options?.headers);
    const res = await fetch(`${getBaseUrl()}${path}`, {
      ...options,
      method: "POST",
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    return res.json();
  },

  async put(path: string, body?: any, options?: RequestInit) {
    const headers = await getHeaders(options?.headers);
    const res = await fetch(`${getBaseUrl()}${path}`, {
      ...options,
      method: "PUT",
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    return res.json();
  },

  async delete(path: string, options?: RequestInit) {
    const headers = await getHeaders(options?.headers);
    const res = await fetch(`${getBaseUrl()}${path}`, {
      ...options,
      method: "DELETE",
      headers,
    });
    return res.json();
  }
};
