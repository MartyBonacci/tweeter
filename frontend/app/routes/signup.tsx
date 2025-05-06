
import { useState } from "react";
import type { ActionFunctionArgs } from "react-router";
import { Form, useActionData, useNavigation } from "react-router";
import { uuidv7 } from "uuidv7";
import pkg from "@node-rs/argon2";
const { argon2id } = pkg;
import crypto from 'crypto';
import { db } from "../db";
import { profileTable } from "../db/schema";
import { eq } from "drizzle-orm";

interface ActionData {
  success?: boolean;
  error?: string;
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    // Get form data
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Validate input
    if (!name || !email || !password || !confirmPassword) {
      return { error: "All fields are required" };
    }

    if (password !== confirmPassword) {
      return { error: "Passwords don't match" };
    }

    // Check for existing user
    const existingUser = await db
      .select()
      .from(profileTable)
      .where(eq(profileTable.profileEmail, email))
      .limit(1);

    if (existingUser.length > 0) {
      return { error: "Email already registered" };
    }

    // Generate secure values
    const passwordHash = await argon2id.hash(password);
    const activationToken = crypto.randomBytes(16).toString('hex');
    const userId = uuidv7();

    console.log({
                 profileId: userId,
                 profileName: name,
                 profileEmail: email,
                 profilePasswordHash: passwordHash,
                 profileActivationToken: activationToken,
               })

    // Create new user profile
    await db.insert(profileTable).values({
      profileId: userId,
      profileName: name,
      profileEmail: email,
      profilePasswordHash: passwordHash,
      profileActivationToken: activationToken,
    });

    return { success: true };
  } catch (error) {
    console.error('Signup error:', error);
    return { error: "Failed to create account" };
  }
}

export default function Signup() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Your Account</h1>
      {actionData?.error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-lg">
          {actionData.error}
        </div>
      )}
      {actionData?.success && (
        <div className="mb-4 p-4 text-green-700 bg-green-100 rounded-lg">
          Account created successfully! Please check your email for activation.
        </div>
      )}
      <Form method="post" className="space-y-4 p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50"
        >
          {isSubmitting ? "Creating Account..." : "Sign Up"}
        </button>
      </Form>
    </div>
  );
}
