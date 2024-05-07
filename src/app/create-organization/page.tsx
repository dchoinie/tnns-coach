"use client";

import React, { useState, useEffect, FormEvent } from "react";
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
import { Button } from "~/components/ui/button";
import { ChevronRight, LoaderCircle } from "lucide-react";
import styles from "../../styles/loading.module.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import { fetchTeams, selectTeams } from "~/lib/features/teams/slice";
import {
  fetchCurrentUser,
  selectCurrentUser,
} from "~/lib/features/users/slice";
import {
  collegeCCCAATeams,
  collegeD1Teams,
  collegeD2Teams,
  collegeD3Teams,
  collegeNAIATeams,
  collegeNJCAATeams,
  stateSelect,
} from "~/helpers/teams";
import { CreateTeam } from "./_actions";

const CreateOrganizationPage = () => {
  const [error, setError] = useState("");
  const [level, setLevel] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const teams = useAppSelector(selectTeams);

  useEffect(() => {
    dispatch(fetchTeams()).catch((error) => console.log(error));
    dispatch(fetchCurrentUser()).catch((error) => console.log(error));
  }, [dispatch]);

  const SubmitBtn = (): JSX.Element => {
    return (
      <Button type="submit" aria-disabled={isLoading}>
        {isLoading ? (
          <LoaderCircle className={styles.loadingSpinner} />
        ) : (
          "Submit"
        )}
      </Button>
    );
  };

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);

    try {
      await CreateTeam(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
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
                <form
                  action={handleSubmit}
                  method="POST"
                  className="flex flex-col"
                >
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
                      <Label htmlFor="city">City</Label>
                      <Input required name="city" id="city" />
                    </div>
                    <div className="mb-10 w-1/2">
                      <Label htmlFor="state">State</Label>
                      {stateSelect()}
                    </div>
                  </div>
                  <div className="flex gap-12">
                    <div className="mb-10 w-1/2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select id="gender" name="gender">
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
                        id="level"
                        name="level"
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
            <TabsContent value="join" className="flex flex-col">
              <Select>
                <SelectTrigger className="my-6 w-1/2 self-center">
                  <SelectValue placeholder="Select a team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>College</SelectLabel>
                    {collegeD1Teams(teams)}
                    {collegeD2Teams(teams)}
                    {collegeD3Teams(teams)}
                    {collegeNAIATeams(teams)}
                    {collegeNJCAATeams(teams)}
                    {collegeCCCAATeams(teams)}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button>Request To Join</Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CreateOrganizationPage;
