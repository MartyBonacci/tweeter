
import { useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import { db } from "../db";
import { profileTable } from "../db/schema";
import { eq } from "drizzle-orm";

export default function Verify() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [verificationStatus, setVerificationStatus] = useState<{
    success?: boolean;
    error?: string;
  }>({});

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setVerificationStatus({ error: "No verification token provided" });
        return;
      }

      try {
        // Find user with matching token
        const [user] = await db
          .select()
          .from(profileTable)
          .where(eq(profileTable.profileActivationToken, token))
          .limit(1);

        if (!user) {
          setVerificationStatus({ error: "Invalid or expired verification token" });
          return;
        }

        // Remove activation token to mark email as verified
        await db
          .update(profileTable)
          .set({ profileActivationToken: null })
          .where(eq(profileTable.profileId, user.profileId));

        setVerificationStatus({ success: true });
      } catch (error) {
        console.error("Verification error:", error);
        setVerificationStatus({ error: "Failed to verify email" });
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow dark:bg-gray-800">
      <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
      {verificationStatus.success ? (
        <div className="text-green-600">
          Your email has been successfully verified! You can now log in.
        </div>
      ) : verificationStatus.error ? (
        <div className="text-red-600">{verificationStatus.error}</div>
      ) : (
        <div>Verifying your email...</div>
      )}
    </div>
  );
}
