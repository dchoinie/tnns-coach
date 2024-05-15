"use client";

import React, { useEffect, useState } from "react";
import {
  fetchTeams,
  selectFetchTeamsStatus,
  selectTeams,
} from "~/lib/features/teams/slice";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { type Team } from "~/types/teams";
import { PlusCircle, LoaderCircle, Pencil, Users } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";
import { FETCH_STATUS } from "~/enums/common";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useFormStatus } from "react-dom";
import { createTeam } from "./_actions";
import { useFormState } from "react-dom";
import { stateSelect } from "~/helpers/teams";
import Link from "next/link";
import PageTitle from "~/app/_components/pageTitle";

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

const TeamsPage = () => {
  const [error, setError] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const dispatch = useAppDispatch();

  const teams = useAppSelector(selectTeams);
  const fetchTeamsStatus = useAppSelector(selectFetchTeamsStatus);

  const createTeamForm = useForm<z.infer<typeof createTeamFormSchema>>({
    resolver: zodResolver(createTeamFormSchema),
    defaultValues: {
      schoolName: "",
      schoolMascot: "",
      city: "",
      state: "",
      gender: "",
      level: "",
      class: "",
      section: "",
      division: "",
      conference: "",
    },
  });

  useEffect(() => {
    dispatch(fetchTeams()).catch((err) => setError("Error fetching teams"));
  }, [dispatch]);

  return (
    <>
      <div className="flex justify-between">
        <PageTitle title="Managed Teams" />
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">
              <PlusCircle size={17} className="mr-2" /> Add New
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create A Team</DialogTitle>
            </DialogHeader>
            <div>
              <ScrollArea className="h-[475px]">
                <Form {...createTeamForm}>
                  <form
                    className="space-y-8 px-3 py-3"
                    action={createTeam}
                    method="post"
                  >
                    <FormField
                      control={createTeamForm.control}
                      name="schoolName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>School Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                            <Input {...field} />
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
                            <Input {...field} />
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
                            onValueChange={(value: string) => {
                              setLevel(value);
                              field.onChange(value);
                            }}
                            defaultValue={field.value}
                            name="level"
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="highSchool">
                                High School
                              </SelectItem>
                              <SelectItem value="college">College</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {level === "highSchool" && (
                      <>
                        <FormField
                          control={createTeamForm.control}
                          name="class"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Class</FormLabel>
                              <FormControl>
                                <Input {...field} />
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
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                    {level === "college" && (
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
                                <Input {...field} />
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
              </ScrollArea>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        {fetchTeamsStatus === FETCH_STATUS.IN_PROGRESS ? (
          <>
            <LoaderCircle className="animate-spin" />
          </>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-12">
              {teams.map((team: Team) => (
                <Card key={team.id}>
                  <CardHeader>
                    <CardTitle>{team.schoolName}</CardTitle>
                    <CardDescription>{team.schoolMascot}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{`Class: ${team.class}`}</p>
                    <p>{`Section: ${team.section}`}</p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex gap-6">
                      <Button variant="default" size="sm" asChild>
                        <Link
                          href={`/dashboard/teams/${team.id}`}
                          className="flex"
                        >
                          <Pencil size={17} className="mr-2" />
                          <span>Edit</span>
                        </Link>
                      </Button>
                      <Button size="sm" variant="secondary" asChild>
                        <Link
                          href={`/dashboard/teams/${team.id}/players`}
                          className="flex"
                        >
                          <Users size={17} className="mr-2" />
                          <span>View Players</span>
                        </Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TeamsPage;