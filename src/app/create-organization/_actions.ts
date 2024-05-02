/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "../../server/db";
import { teams } from "../../server/db/schema";

export const GetOrgs = async () => {
  const user = auth();

  if (!user?.userId) {
    return { message: "No Logged In User" };
  }

  const orgs = await db.select({ orgName: teams.schoolName }).from(teams);
  try {
    return { message: "Orgs fetch successfull", data: orgs };
  } catch (error) {
    throw new Error("Could not fetch orgs");
  }
};

export const CreateOrganization = async (formData: FormData) => {
  const user = auth();

  if (!user?.userId) {
    return { message: "No Logged In User" };
  }

  const newTeam = {
    schoolName: formData.get("schoolName") as string,
    schoolMascot: formData.get("schoolMascot") as string,
    gender: formData.get("gender") as "male" | "female",
    conference: formData.get("conference") as string,
    division: formData.get("division") as string,
    class: formData.get("class") as string,
    section: formData.get("section") as string,
  };

  try {
    await db.insert(teams).values(newTeam).returning();
    await clerkClient.organizations.createOrganization({
      name: newTeam.schoolName,
      createdBy: user.userId,
    });

    return {
      message: "Team created successfully.",
    };
  } catch (err) {
    return { error: "There was an error creating the team." };
  }
};
