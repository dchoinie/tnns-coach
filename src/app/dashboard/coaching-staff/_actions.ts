"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "../../../server/db";
import { useOrganizationList } from "@clerk/nextjs";
import { teams } from "../../../server/db/schema";

export async function GetTeamById(id: number) {
  try {
    const team = await db.query.teams.findMany({
      where: (teams, { eq }) => eq(teams.id, id),
    });
    return team;
  } catch (error) {
    throw new Error("Could not fetch team");
  }
}

export type NewTeam = typeof teams.$inferInsert;
export async function CreateTeam(formData: FormData) {
  const user = auth();
  const { createOrganization } = useOrganizationList();

  const genderValue = formData.get("gender");
  if (genderValue !== "male" && genderValue !== "female") {
    throw new Error("Invalid gender value");
  }

  const newTeam = {
    schoolName: formData.get("schoolName") as string,
    schoolMascot: formData.get("schoolMascot") as string,
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    gender: genderValue as "male" | "female",
    conference: formData.get("conference") as string,
    division: formData.get("division") as string,
  };

  if (!user?.userId) {
    return { message: "No Logged In User" };
  }

  try {
    await db.insert(teams).values(newTeam).returning();
    if (createOrganization) {
      await createOrganization({ name: newTeam.schoolName });
    }

    return {
      message: "Team created successfully.",
    };
  } catch (error) {
    console.log(error);
    return { error: "There was an error creating the team." };
  }
}
