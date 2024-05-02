"use client";

import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { CreateUser } from "./_actions";
import { Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const SetupProfilePage = () => {
  const [error, setError] = useState("");
  const { user } = useUser();
  const router = useRouter();

  const SubmitBtn = (): JSX.Element => {
    const { pending } = useFormStatus();
    return (
      <Button type="submit" aria-disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          "Submit"
        )}
      </Button>
    );
  };

  const handleSubmit = async (formData: FormData) => {
    const res = await CreateUser(formData);

    if (res?.message) {
      await user?.reload();
      router.push("/create-organization");
    }

    if (res?.error) {
      setError(res?.error);
    }
  };

  return (
    <div className="my-12 flex flex-col items-center">
      <h2 className="mb-6 text-3xl">Create Your Profile</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form action={handleSubmit} className="flex w-1/2 flex-col">
        <div className="flex gap-12">
          <div className="mb-10 w-1/2">
            <Label htmlFor="firstName">First Name</Label>
            <Input required name="firstName" id="firstName" />
          </div>

          <div className="mb-10 w-1/2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input required name="lastName" id="lastName" />
          </div>
        </div>

        <div className="flex gap-12">
          <div className="mb-10 w-1/2">
            <Label htmlFor="email">Email</Label>
            <Input required name="email" id="email" />
          </div>

          <div className="mb-10 w-1/2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              required
              placeholder="123-456-7890"
              name="phone"
              id="phone"
            />
          </div>
        </div>

        <div className="mb-10">
          <Label htmlFor="dateOfBirth">Date Of Birth</Label>
          <Input
            required
            placeholder="YYYY-MM-DD"
            name="dateOfBirth"
            id="dateOfBirth"
          />
        </div>

        <div className="mb-10">
          <Label htmlFor="title">Title</Label>
          <Input
            required
            placeholder="Head Coach, Assistant Coach, ect..."
            name="title"
            id="title"
          />
        </div>

        <SubmitBtn />
      </form>
    </div>
  );
};

export default SetupProfilePage;
