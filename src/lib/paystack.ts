import crypto from "crypto";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY as string;

export interface PaystackInitResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
    status: string;
    reference: string;
    amount: number;
    gateway_response: string;
    channel: string;
    currency: string;
  };
}

export async function initializeTransaction(
  email: string,
  amount: number, // in kobo
  reference: string,
  metadata?: Record<string, unknown>,
): Promise<PaystackInitResponse> {
  const response = await fetch(
    "https://api.paystack.co/transaction/initialize",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount,
        reference,
        metadata,
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/payments/callback`,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to initialize Paystack transaction");
  }

  return response.json();
}

export async function verifyTransaction(
  reference: string,
): Promise<PaystackVerifyResponse> {
  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to verify Paystack transaction");
  }

  return response.json();
}

export function verifyPaystackSignature(
  payload: string,
  signature: string,
): boolean {
  if (!PAYSTACK_SECRET) return false;
  const hash = crypto
    .createHmac("sha512", PAYSTACK_SECRET)
    .update(payload)
    .digest("hex");
  return hash === signature;
}
