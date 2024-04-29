"use client";

import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { CreateUser } from "./_actions";

const SetupProfilePage = () => {
  const { pending } = useFormStatus();

  return (
    <div className="my-12 flex flex-col items-center">
      <h2 className="mb-6 text-3xl">Create Your Profile</h2>
      <form action={CreateUser} className="flex w-1/2 flex-col">
        <div className="flex gap-12">
          <div className="mb-10 w-1/2">
            <Label htmlFor="firstName">First Name</Label>
            <Input placeholder="" name="firstName" id="firstName" />
          </div>

          <div className="mb-10 w-1/2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input placeholder="" name="lastName" id="lastName" />
          </div>
        </div>

        <div className="flex gap-12">
          <div className="mb-10 w-1/2">
            <Label htmlFor="email">Email</Label>
            <Input placeholder="" name="email" id="email" />
          </div>

          <div className="mb-10 w-1/2">
            <Label htmlFor="phone">Phone</Label>
            <Input placeholder="123-456-7890" name="phone" id="phone" />
          </div>
        </div>

        <div className="mb-10">
          <Label htmlFor="dateOfBirth">Date Of Birth</Label>
          <Input placeholder="YYYY-MM-DD" name="dateOfBirth" id="dateOfBirth" />
        </div>

        <div className="mb-10">
          <Label htmlFor="title">Title</Label>
          <Input
            placeholder="Head Coach, Assistant Coach, ect..."
            name="title"
            id="title"
          />
        </div>

        <Button type="submit" aria-disabled={pending}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SetupProfilePage;
