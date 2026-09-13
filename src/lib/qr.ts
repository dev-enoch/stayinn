import crypto from "crypto";
import QRCode from "qrcode";

const QR_SIGNING_KEY = process.env.QR_SIGNING_KEY as string;

export interface BookingQRPayload {
  bookingId: string;
  hotelId: string;
  guestName: string;
  checkInDate: string; // ISO String
  checkOutDate: string; // ISO String
  numberOfGuests: number;
}

/**
 * Generates a HMAC-SHA256 signature for the given stringified payload.
 */
export function generateQRSignature(payloadString: string): string {
  if (!QR_SIGNING_KEY) {
    throw new Error("QR_SIGNING_KEY is not defined in environment variables");
  }
  return crypto
    .createHmac("sha256", QR_SIGNING_KEY)
    .update(payloadString)
    .digest("hex");
}

/**
 * Validates a given payload against its signature.
 */
export function verifyQRSignature(
  payloadString: string,
  signature: string,
): boolean {
  if (!QR_SIGNING_KEY) return false;
  const expectedSignature = generateQRSignature(payloadString);
  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(signature),
  );
}

/**
 * Generates the QR data and base64 image for a booking.
 */
export async function generateBookingQR(payload: BookingQRPayload) {
  const payloadString = JSON.stringify(payload);
  const signature = generateQRSignature(payloadString);

  // The QR code will just contain the booking ID and signature for simplicity and size constraints.
  // The scanner can verify the booking by looking up the ID and validating the signature.
  const qrContent = JSON.stringify({
    bId: payload.bookingId,
    sig: signature,
  });

  const base64Image = await QRCode.toDataURL(qrContent, {
    errorCorrectionLevel: "M",
    margin: 2,
    width: 300,
  });

  return {
    qrData: payloadString,
    qrSignature: signature,
    qrImageBase64: base64Image,
  };
}
