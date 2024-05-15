import { db } from "~/server/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { players, teams } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return { message: "Could not find user" };
  }

  try {
    const playersRes = await db
      .select({
        id: players.id,
        firstName: players.firstName,
        lastName: players.lastName,
        gender: players.gender,
        dateOfBirth: players.dateOfBirth,
        utrRating: players.utrRating,
        status: players.status,
        team: {
          id: teams.id,
          schoolName: teams.schoolName,
        },
      })
      .from(players)
      .leftJoin(teams, eq(players.teamId, teams.id));
    return NextResponse.json(playersRes);
  } catch (error) {
    throw new Error("Failed to fetch players");
  }
}
