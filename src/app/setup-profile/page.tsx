"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { setupProfileComplete } from "./_actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  createdAt: z.string().datetime(),
  dateOfBirth: z.string().refine((str) => !isNaN(Date.parse(str)), {
    message: "Invalid date format",
  }),
  title: z.string().min(2).max(50),
});

const SetupProfilePage = () => {
  const [error, setError] = useState("");
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    const res = await setupProfileComplete(formData);
    console.log(formData);
    if (res?.message) {
      await user?.reload();
      router.push("/setup-team");
    }
    if (res?.error) {
      setError(res?.error);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      createdAt: new Date().toISOString(),
      dateOfBirth: "",
      title: "",
    },
  });

  return (
    <div className="my-16 flex justify-center">
      <div className="flex w-1/2 flex-col">
        <h2 className="mb-10 text-2xl">Create Your Profile</h2>
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Of Birth</FormLabel>
                  <FormControl>
                    <Input placeholder="YYYY-MM-DD" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Head Coach, Assistant Coach, ect..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SetupProfilePage;
