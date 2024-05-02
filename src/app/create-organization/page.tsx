"use client";

import React, { useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "~/components/ui/select";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
import { ChevronRight, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { CreateOrganization, GetOrgs } from "./_actions";
import styles from "../../styles/loading.module.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { type Team } from "~/types/teams";

const CreateOrganizationPage = () => {
  const [error, setError] = useState("");
  const [level, setLevel] = useState("");
  const [teams, setTeams] = useState([] as Team[]);
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
    <div className="my-12 flex flex-col">
      <div className="flex px-12">
        <div className="flex w-1/2 flex-col pr-24">
          <h2 className="mb-6 text-3xl">Create or join an organization</h2>
          <p className="mb-6">
            To create a new organization or request to join an existing one,
            please fill out the appropriate form. If you&apos;re creating a new
            organization, select the &quot;Create New Organization&quot; tab and
            enter your school name and details in the provided fields. If you
            wish to join an existing organization, select the &quot;Request To
            Join Current Organization&quot; tab and follow the instructions.
            Please ensure all required fields are filled out accurately before
            submitting your request.
          </p>
          <p className="mb-6">
            To access the features of TNNS Coach, all users must be associated
            with an organization. This allows us to tailor your experience and
            provide relevant content. However, if you&apos;d like to explore the
            app before joining or creating an organization, you&apos;re welcome
            to do so. Simply click the button below to proceed. Please note that
            full functionality will not be available until you&apos;re
            associated with an organization.
          </p>
          <Button variant="secondary" className="self-start" size="sm">
            <Link href="/dashboard" className="flex">
              <span>Skip for now</span>
              <ChevronRight className="ml-2 self-center" size={16} />
            </Link>
          </Button>
        </div>
        <div className="flex w-1/2">
          <Tabs defaultValue="create" className="w-full">
            <TabsList className="flex w-full justify-around">
              <TabsTrigger value="create">Create New Organization</TabsTrigger>
              <TabsTrigger value="join">
                Request To Join Current Organization
              </TabsTrigger>
            </TabsList>
            <TabsContent value="create">
              <div className="my-12 flex flex-col">
                {error && <p className="text-red-500">{error}</p>}
                <form action={handleSubmit} className="flex flex-col">
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
                      <Select
                        onValueChange={(value: string) => setLevel(value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="highSchool">
                            High School
                          </SelectItem>
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
                            <SelectItem value="NJCAA">
                              Junior College (NJCAA)
                            </SelectItem>
                            <SelectItem value="CCCAA">
                              Junior College (CCCAA)
                            </SelectItem>
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
            </TabsContent>
            <TabsContent value="join">
              <Select>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select a timezone" />
                </SelectTrigger>
                <SelectContent>
                  {/* {orgs.map((org) => (
                    <SelectItem key={org.orgName} value={org.orgName}>
                      {org.orgName}
                    </SelectItem>
                  ))} */}
                </SelectContent>
              </Select>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CreateOrganizationPage;
