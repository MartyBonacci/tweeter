
import { useSearchParams } from "@react-router/node";
import { db } from "../db";
import { profileTable } from "../db/schema";
import { eq } from "drizzle-orm";

export default function Verify() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const verifyEmail = async (token: string | null) => {
    if (!token) {
      return { error: "No verification token provided" };
    }

    try {
      // Find user with matching token
      const [user] = await db
        .select()
        .from(profileTable)
        .where(eq(profileTable.profileActivationToken, token))
        .limit(1);

      if (!user) {
        return { error: "Invalid or expired verification token" };
      }

      // Update user to remove token (marking as verified)
      await db
        .update(profileTable)
        .set({ profileActivationToken: null })
        .where(eq(profileTable.profileId, user.profileId));

      return { success: true };
    } catch (error) {
      console.error("Verification error:", error);
      return { error: "Failed to verify email" };
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow dark:bg-gray-800">
      <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
      {token ? (
        <div>Verifying your email...</div>
      ) : (
        <div className="text-red-600">No verification token provided</div>
      )}
    </div>
  );
}
