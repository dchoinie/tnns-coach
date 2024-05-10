"use server";

import { db } from "~/server/db";
import { teams } from "~/server/db/schema";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { type NextApiRequest } from "next";

export async function GET(req: NextApiRequest) {
  const { orgId } = auth();

  const { teamId } = req.query;

  if (!orgId) {
    return { message: "Organization not found" };
  }

  if (!teamId) {
    return { message: "TeamId is required" };
  }

  console.log("teamId", teamId);
  console.log("teamsId", teams.id);

  try {
    const teamRes = await db
      .select()
      .from(teams)
      .where(eq(teams.id, Number(teamId)));
    return NextResponse.json(teamRes);
  } catch (error) {
    throw new Error("Failed to fetch team");
  }
}
