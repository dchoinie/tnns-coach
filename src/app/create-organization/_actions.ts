"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "../../server/db";
import { teams, usersToTeams, users } from "../../server/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export const CreateTeam = async (formData: FormData) => {
  const { userId } = auth();

  const currentUser = await db
    .select()
    .from(users)
    .where(eq(userId, users.clerkId));

  if (!userId || !currentUser) {
    return { message: "No Logged In User" };
  }

  const newTeam = {
    schoolName: formData.get("schoolName") as string,
    schoolMascot: formData.get("schoolMascot") as string,
    gender: formData.get("gender") as string,
    city: formData.get("city") as string,
    state: formData.get("state") as string,
    conference: formData.get("conference") as string,
    level: formData.get("level") as string,
    division: formData.get("division") as string,
    class: formData.get("class") as string,
    section: formData.get("section") as string,
  };

  const createTeam = await db.insert(teams).values(newTeam).returning();

  await clerkClient.organizations.createOrganization({
    name: newTeam.schoolName,
    createdBy: userId,
  });

  // const addUserToTeam = {
  //   userId: currentUser.id as number,
  //   teamId: createTeam.id as number,
  // };

  // await db.insert(usersToTeams).values(addUserToTeam);

  try {
    return NextResponse.json({ message: "Team created" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ data: err }, { status: 500 });
  } finally {
    redirect("/dashboard")
  }
};
