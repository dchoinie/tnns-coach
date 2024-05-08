"use client";

import React, { useEffect, useState } from "react";
import {
  fetchTeams,
  selectFetchTeamsStatus,
  selectTeams,
} from "~/lib/features/teams/slice";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
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
import { useFormStatus } from "react-dom";
import { type Team } from "~/types/teams";
import Link from "next/link";
import { MousePointerClick, PlusCircle, LoaderCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOrganization } from "@clerk/nextjs";
import { Input } from "~/components/ui/input";
import { FETCH_STATUS } from "~/enums/common";
import { ScrollArea } from "~/components/ui/scroll-area";

const createTeamFormSchema = z.object({
  schoolName: z.string().min(2).max(50),
  schoolMascot: z.string().min(2).max(50),
  gender: z.string().min(2).max(50),
  level: z.string().min(2).max(50),
  class: z.string().min(2).max(50),
  section: z.string().min(2).max(50),
  division: z.string().min(2).max(50),
  conference: z.string().min(2).max(50),
  clerkOrgId: z.string().min(2).max(50),
});

const TeamsPage = () => {
  const [error, setError] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const dispatch = useAppDispatch();
  const { pending } = useFormStatus();

  const teams = useAppSelector(selectTeams);
  const fetchTeamsStatus = useAppSelector(selectFetchTeamsStatus);
  const org = useOrganization();
  const currentOrgId = org?.organization?.id ?? "";

  const createTeamForm = useForm<z.infer<typeof createTeamFormSchema>>({
    resolver: zodResolver(createTeamFormSchema),
    defaultValues: {
      schoolName: "",
      schoolMascot: "",
      gender: "",
      level: "",
      class: "",
      section: "",
      division: "",
      conference: "",
      clerkOrgId: currentOrgId,
    },
  });

  useEffect(() => {
    dispatch(fetchTeams()).catch((err) => setError("Error fetching teams"));
  }, [dispatch]);

  const onSubmit = (values: z.infer<typeof createTeamFormSchema>) => {
    console.log(values);
  };

  return (
    <div>
      <Table className="bg-white">
        <TableHeader>
          <TableRow>
            <TableHead>Team Name</TableHead>
            <TableHead>Mascot</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Section</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fetchTeamsStatus === FETCH_STATUS.IN_PROGRESS ? (
            <TableRow>
              <TableCell className="flex">
                <span>loading</span>
                <LoaderCircle className="ml-2 animate-spin repeat-infinite" />
              </TableCell>
            </TableRow>
          ) : (
            <>
              {teams.length > 0 ? (
                <>
                  {teams.map((team: Team) => (
                    <TableRow key={team.id}>
                      <TableCell className="text-brand underline">
                        <Link
                          href={`/dashboard/teams/${team.id}`}
                          className="flex"
                        >
                          <span>{team.schoolName}</span>
                          <MousePointerClick className="ml-2" />
                        </Link>
                      </TableCell>
                      <TableCell>{team.schoolMascot}</TableCell>
                      <TableCell className="capitalize">
                        {team.gender}
                      </TableCell>
                      <TableCell className="capitalize">{team.level}</TableCell>
                      {team.level === "highSchool" && (
                        <>
                          <TableCell>{team.class}</TableCell>
                          <TableCell>{team.section}</TableCell>
                        </>
                      )}
                      {team.level === "college" && (
                        <>
                          <TableCell>{team.division}</TableCell>
                          <TableCell>{team.conference}</TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </>
              ) : (
                <>
                  <TableRow>
                    <TableCell className="text-center" colSpan={6}>
                      No teams found, please click below to create one
                    </TableCell>
                  </TableRow>
                </>
              )}
            </>
          )}
        </TableBody>
      </Table>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="absolute bottom-10 right-10 h-12 rounded-full">
            <PlusCircle size={20} />
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
                  action={createTeamForm.handleSubmit(onSubmit)}
                  method="POST"
                  // onSubmit={createTeamForm.handleSubmit(onSubmit)}
                  className="space-y-8 px-3 py-3"
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
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
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
                </form>
              </Form>
            </ScrollArea>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamsPage;
