import { db } from "~/server/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return { message: "Could not find user" };
  }

  const currentUser = await db
    .select()
    .from(users)
    .where(eq(userId, users.clerkId));

  try {
    return NextResponse.json(currentUser);
  } catch (error) {
    throw new Error("Failed to fetch current user");
  }
}
