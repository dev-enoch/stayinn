import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { randomBytes } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === "request") {
      const { email } = body;
      if (!email)
        return NextResponse.json(
          { error: "Email is required" },
          { status: 400 },
        );

      const user = await prisma.user.findUnique({ where: { email } });

      if (user) {
        // Generate a secure reset token
        const resetToken = randomBytes(32).toString("hex");
        // Set expiry to 1 hour from now
        const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);

        await prisma.user.update({
          where: { id: user.id },
          data: { resetToken, resetTokenExpiry },
        });

        // In a real application, you would send an email here using SendGrid, Resend, etc.
        // For MVP/Development, we will log the reset link to the server console.
        const resetUrl = `${req.headers.get("origin") || "http://localhost:3000"}/reset-password?token=${resetToken}`;
        console.log(
          `\n\n======================================================`,
        );
        console.log(`🔐 PASSWORD RESET REQUEST for ${email}`);
        console.log(`Click this link to reset: ${resetUrl}`);
        console.log(
          `======================================================\n\n`,
        );
      }

      // Always return 200 even if user not found to prevent email enumeration
      return NextResponse.json(
        { message: "If an account exists, a reset link has been sent." },
        { status: 200 },
      );
    } else if (action === "reset") {
      const { token, password } = body;

      if (!token || !password) {
        return NextResponse.json(
          { error: "Token and new password are required" },
          { status: 400 },
        );
      }

      // Find user with this token and ensure it hasn't expired
      const user = await prisma.user.findFirst({
        where: {
          resetToken: token,
          resetTokenExpiry: { gt: new Date() }, // Token must still be in the future
        },
      });

      if (!user) {
        return NextResponse.json(
          { error: "Invalid or expired reset token" },
          { status: 400 },
        );
      }

      // Hash the new password
      const passwordHash = await hash(password, 12);

      // Update user and clear the reset token
      await prisma.user.update({
        where: { id: user.id },
        data: {
          passwordHash,
          resetToken: null,
          resetTokenExpiry: null,
        },
      });

      return NextResponse.json(
        { message: "Password has been successfully reset" },
        { status: 200 },
      );
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
