/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { useEffect, useState } from "react";
import RecentMatches from "~/app/_components/RecentMatches";
import PageTitle from "~/app/_components/pageTitle";
import {
  fetchTeam,
  selectFetchTeamStatus,
  selectTeam,
} from "~/lib/features/team/slice";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";
import { useForm } from "react-hook-form";
import { useFormStatus } from "react-dom";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import { stateSelect } from "~/helpers/teams";
import { Button } from "~/components/ui/button";
import { PlusCircle, LoaderCircle, Pencil, Users } from "lucide-react";

const demoTeam = {
  id: 10,
  schoolName: "Mankato West",
  schoolMascot: "Scarletts",
  city: "Mankato",
  state: "MN",
  gender: "male",
  level: "highSchool",
  class: "AA",
  section: "5",
  clerkOrdId: "",
};

const demoMatches = [
  {
    id: 224,
    date: "04-30-2024",
    matchType: "hs_varsity",
    opponentTeamName: "Mankato East",
    location: "Mankato East High School",
    result: "win",
    score: "5-2",
  },
  {
    id: 238,
    date: "04-24-2024",
    matchType: "hs_varsity",
    opponentTeamName: "Rochester Mayo",
    location: "Rochester Mayo High School",
    result: "win",
    score: "4-3",
  },
  {
    id: 234,
    date: "04-12-2024",
    matchType: "hs_varsity",
    opponentTeamName: "New Ulm",
    location: "Mankato West High School",
    result: "loss",
    score: "3-4",
  },
];

// write db query to fetch matches, sort by most recent date, limit to 3

const TeamPage = ({ params }: { params: { teamId: number } }) => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>("");
  const [formEnabled, setFormEnables] = useState<boolean>(false);
  const { teamId } = params;

  const team = useAppSelector(selectTeam);
  const fetchTeamStatus = useAppSelector(selectFetchTeamStatus);

  useEffect(() => {
    dispatch(fetchTeam(teamId)).catch((err) => setError("Error fetching team"));
  }, [dispatch]);

  const createTeamFormSchema = z.object({
    schoolName: z.string().min(2).max(50),
    schoolMascot: z.string().min(2).max(50),
    city: z.string().min(2).max(50),
    state: z.string().min(2).max(2),
    gender: z.string().min(2).max(50),
    level: z.string().min(2).max(50),
    class: z.string().min(1).max(50),
    section: z.string().min(1).max(50),
    division: z.string().min(1).max(50),
    conference: z.string().min(1).max(50),
  });

  interface SubmitButtonProps {
    label: string;
    loading: React.ReactNode;
  }

  const SubmitButton = ({ label, loading }: SubmitButtonProps) => {
    const { pending } = useFormStatus();

    return (
      <Button disabled={pending} type="submit">
        {pending ? loading : label}
      </Button>
    );
  };

  const createTeamForm = useForm<z.infer<typeof createTeamFormSchema>>({
    resolver: zodResolver(createTeamFormSchema),
    defaultValues: {
      schoolName: demoTeam.schoolName,
      schoolMascot: demoTeam.schoolMascot,
      city: demoTeam.city,
      state: demoTeam.state,
      gender: demoTeam.gender,
      level: demoTeam.level,
      class: demoTeam.class,
      section: demoTeam.section,
    },
  });

  return (
    <div>
      <PageTitle title="Manage Team" />
      <div className="grid grid-cols-2 gap-12">
        <Form {...createTeamForm}>
          <form
            className="space-y-8 px-3 py-3"
            // action={createTeam}
            method="post"
          >
            <FormField
              control={createTeamForm.control}
              name="schoolName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Name</FormLabel>
                  <FormControl>
                    <Input disabled={!formEnabled} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={createTeamForm.control}
              name="schoolMascot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mascot</FormLabel>
                  <FormControl>
                    <Input disabled={!formEnabled} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={createTeamForm.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input disabled={!formEnabled} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={createTeamForm.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>{stateSelect()}</FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={createTeamForm.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    name="gender"
                    disabled={!formEnabled}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={createTeamForm.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    name="level"
                    disabled={!formEnabled}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="highSchool">High School</SelectItem>
                      <SelectItem value="college">College</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {demoTeam.level === "highSchool" && (
              <>
                <FormField
                  control={createTeamForm.control}
                  name="class"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class</FormLabel>
                      <FormControl>
                        <Input disabled={!formEnabled} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createTeamForm.control}
                  name="section"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section</FormLabel>
                      <FormControl>
                        <Input disabled={!formEnabled} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {demoTeam.level === "college" && (
              <>
                <FormField
                  control={createTeamForm.control}
                  name="division"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Division</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        name="division"
                        disabled={!formEnabled}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a division" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="DI">DI</SelectItem>
                          <SelectItem value="DII">DII</SelectItem>
                          <SelectItem value="DIII">DIII</SelectItem>
                          <SelectItem value="NAIA">NAIA</SelectItem>
                          <SelectItem value="NJCAA">NJCAA</SelectItem>
                          <SelectItem value="CCCAA">CCCAA</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createTeamForm.control}
                  name="conference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Conference</FormLabel>
                      <FormControl>
                        <Input disabled={!formEnabled} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <SubmitButton
              label="Save Team"
              loading={
                <div className="flex">
                  <LoaderCircle className="mr-2 animate-spin" /> Saving
                </div>
              }
            />
          </form>
        </Form>
        <div>
          <RecentMatches matches={demoMatches} />
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
