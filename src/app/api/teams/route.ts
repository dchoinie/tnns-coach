"use server";

import { db } from "~/server/db";
import { teams } from "~/server/db/schema";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function GET() {
  const { orgId } = auth();

  if (!orgId) {
    return { message: "Organization not found" };
  }

  try {
    const teamsRes = await db
      .select()
      .from(teams)
      .where(eq(teams.clerkOrgId, orgId));
    return NextResponse.json(teamsRes);
  } catch (error) {
    throw new Error("Failed to fetch teams");
  }
}
