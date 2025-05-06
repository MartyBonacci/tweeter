
import { useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import { db } from "../db";
import { profileTable } from "../db/schema";
import { eq } from "drizzle-orm";

export default function Verify() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState({ loading: true, error: null, success: false });

  useEffect(() => {
    async function verify() {
      if (!token) {
        setStatus({ loading: false, error: "No verification token provided", success: false });
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
          setStatus({ loading: false, error: "Invalid or expired verification token", success: false });
          return;
        }

        // Update user to remove token (marking as verified)
        await db
          .update(profileTable)
          .set({ profileActivationToken: null })
          .where(eq(profileTable.profileId, user.profileId));

        setStatus({ loading: false, error: null, success: true });
      } catch (error) {
        console.error("Verification error:", error);
        setStatus({ loading: false, error: "Failed to verify email", success: false });
      }
    }
    verify();
  }, [token]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow dark:bg-gray-800">
      <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
      {status.loading ? (
        <div>Verifying your email...</div>
      ) : status.success ? (
        <div className="text-green-600">Your email has been verified successfully!</div>
      ) : (
        <div className="text-red-600">{status.error}</div>
      )}
    </div>
  );
}
