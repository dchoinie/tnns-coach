"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "../../server/db";
import { users } from "../../server/db/schema";

export const SetupProfileComplete = async () => {
  const user = auth();

  if (!user?.userId) {
    return { message: "No Logged In User" };
  }

  try {
    const res = await clerkClient.users.updateUser(user?.userId, {
      publicMetadata: {
        profileComplete: true,
      },
    });
    return { message: res.publicMetadata };
  } catch (err) {
    return { error: "There was an error updating the user metadata." };
  }
};

export type NewUser = typeof users.$inferInsert;
export async function CreateUser(formData: FormData) {
  const newUser = {
    createdAt: new Date().toISOString(),
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    dateOfBirth: formData.get("dateOfBirth") as string,
    title: formData.get("title") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
  };

  try {
    await db.insert(users).values(newUser);
    const insertedUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, newUser.email),
    });
    return { message: "User created successfully.", newUser: insertedUser };
  } catch (error) {
    console.log(error);
    return { error: "There was an error creating the user." };
  }
}
