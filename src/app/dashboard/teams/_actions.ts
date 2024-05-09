"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "~/server/db";
import { teams } from "~/server/db/schema";
import { redirect } from "next/navigation";

export const createTeam = async (formData: FormData) => {
  const { orgId } = auth();

  if (!orgId) {
    return { message: "No active organization found" };
  }

  // type Team = typeof teams.$inferSelect;
  const newTeam = {
    schoolName: formData.get("schoolName") as string,
    schoolMascot: formData.get("schoolMascot") as string,
    city: formData.get("city") as string,
    state: formData.get("state") as string,
    gender: formData.get("gender") as string,
    level: formData.get("level") as string,
    class: formData.get("class") as string,
    section: formData.get("section") as string,
    division: formData.get("division") as string,
    conference: formData.get("conference") as string,
    clerkOrgId: orgId,
  };

  try {
    const team = await db.insert(teams).values(newTeam);
    console.log(team);
  } catch (error) {
    return { message: "Error creating team" };
  }

  revalidatePath("/dashboard/teams");
  redirect("/dashboard/teams");
  return { message: "Team created successfully" };
};
