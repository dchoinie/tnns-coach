"use client";

import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import { fetchTeams, selectTeams } from "~/lib/features/teams/slice";
import { fetchCurrentUser } from "~/lib/features/users/slice";
import {
  collegeCCCAATeams,
  collegeD1Teams,
  collegeD2Teams,
  collegeD3Teams,
  collegeNAIATeams,
  collegeNJCAATeams,
} from "~/helpers/teams";
import { CreateOrganization } from "@clerk/nextjs";

const CreateOrganizationPage = () => {
  const dispatch = useAppDispatch();

  const teams = useAppSelector(selectTeams);

  useEffect(() => {
    dispatch(fetchTeams()).catch((error) => console.log(error));
    dispatch(fetchCurrentUser()).catch((error) => console.log(error));
  }, [dispatch]);

  return (
    <div className="my-12 flex flex-col">
      <div className="flex px-12">
        <div className="flex w-1/2 flex-col pr-24">
          <h2 className="mb-6 text-3xl">Create or join an organization</h2>
          <p className="mb-6">
            An organization is a person or group of people who manage a team.
            Most of the time an organization will simply correspond directly to
            the team you coach. However in some cases an organization may manage
            more than 1 team (ex. if you are the head coach for both the
            men&apos;s & women&apos;s teams at a school). Once you have created
            your organization, you will then be able to create the team or teams
            that you want to manage.
          </p>
          <p className="mb-6">
            After you name your organization, you will have the opportunity to
            invite any other coaches or staff members to join your organization.
            You can assign any invited members specific roles to manage access
            and permissions within your organization.
          </p>
          <p className="mb-6">
            If you want to join an existing organization, select the
            &quot;Request To Join An Organization&quot; tab and find the team in
            the dropdown. When you click &quot;request to join&quot; an email
            will be sent to the owner(s) of that organization requesting for you
            to be added. Once you have been added, you will be notified and will
            be given access to manage all teams associated with that
            organization.
          </p>
          {/* Skip create/join org option */}
          {/* <Button variant="secondary" className="self-start" size="sm">
            <Link href="/dashboard" className="flex">
              <span>Skip for now</span>
              <ChevronRight className="ml-2 self-center" size={16} />
            </Link>
          </Button> */}
        </div>
        <div className="flex w-1/2">
          <Tabs defaultValue="create" className="w-full">
            <TabsList className="flex w-full justify-around">
              <TabsTrigger value="create">Create New Organization</TabsTrigger>
              <TabsTrigger value="join">
                Request To Join An Organization
              </TabsTrigger>
            </TabsList>
            <TabsContent value="create" className="flex justify-center">
              <div className="mt-12">
                <CreateOrganization
                  routing="hash"
                  afterCreateOrganizationUrl="/dashboard"
                />
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
