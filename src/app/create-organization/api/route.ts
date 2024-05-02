import { NextResponse } from "next/server";
import { db } from "../../../server/db";
import { teams } from "../../../server/db/schema";

export async function GET() {
  try {
    const orgs = await db.select().from(teams);
    return NextResponse.json({ data: orgs });
  } catch (error) {
    throw new Error("Failed to fetch organizations");
  }
}
