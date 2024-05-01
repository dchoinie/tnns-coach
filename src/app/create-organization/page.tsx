"use client";

import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useUser } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { CreateOrganization } from "./_actions";
import styles from "../../styles/loading.module.css";

const CreateOrganizationPage = () => {
  const [error, setError] = useState("");
  const [level, setLevel] = useState("");
  const { user } = useUser();
  const router = useRouter();

  const SubmitBtn = (): JSX.Element => {
    const { pending } = useFormStatus();
    return (
      <Button type="submit" aria-disabled={pending}>
        {pending ? (
          <LoaderCircle className={styles.loadingSpinner} />
        ) : (
          "Submit"
        )}
      </Button>
    );
  };

  const handleSubmit = async (formData: FormData) => {
    const res = await CreateOrganization(formData);

    if (res?.message) {
      router.push("/dashboard");
    }

    if (res?.error) {
      setError(res?.error);
    }
  };

  return (
    <div className="my-12 flex flex-col items-center">
      <h2 className="mb-6 text-3xl">Create Your Organization</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form action={handleSubmit} className="flex w-1/2 flex-col">
        <div className="flex gap-12">
          <div className="mb-10 w-1/2">
            <Label htmlFor="schoolName">School Name</Label>
            <Input required name="schoolName" id="schoolName" />
          </div>
          <div className="mb-10 w-1/2">
            <Label htmlFor="schoolMascot">Mascot</Label>
            <Input required name="schoolMascot" id="schoolMascot" />
          </div>
        </div>

        <div className="flex gap-12">
          <div className="mb-10 w-1/2">
            <Label htmlFor="gender">Gender</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Men</SelectItem>
                <SelectItem value="female">Women</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-10 w-1/2">
            <Label htmlFor="level">Level</Label>
            <Select onValueChange={(value: string) => setLevel(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="highSchool">High School</SelectItem>
                <SelectItem value="college">College</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {level === "highSchool" && (
          <div className="flex gap-12">
            <div className="mb-10 w-1/2">
              <Label htmlFor="class">Class</Label>
              <Input name="class" id="class" />
            </div>

            <div className="mb-10 w-1/2">
              <Label htmlFor="section">Section</Label>
              <Input name="section" id="section" />
            </div>
          </div>
        )}

        {level === "college" && (
          <div className="flex gap-12">
            <div className="mb-10 w-1/2">
              <Label htmlFor="class">Division</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Division" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DI">DI</SelectItem>
                  <SelectItem value="DII">DII</SelectItem>
                  <SelectItem value="DIII">DIII</SelectItem>
                  <SelectItem value="NAIA">NAIA</SelectItem>
                  <SelectItem value="NJCAA">Junior College (NJCAA)</SelectItem>
                  <SelectItem value="CCCAA">Junior College (CCCAA)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-10 w-1/2">
              <Label htmlFor="section">Conference</Label>
              <Input name="conference" id="conference" />
            </div>
          </div>
        )}

        <SubmitBtn />
      </form>
    </div>
  );
};

export default CreateOrganizationPage;
