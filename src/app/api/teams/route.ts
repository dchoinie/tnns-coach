"use server";

import { db } from "../../../server/db";
import { teams } from "../../../server/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const teamsRes = await db.select().from(teams);
    return NextResponse.json(teamsRes);
  } catch (error) {
    throw new Error("Failed to fetch organizations");
  }
}
