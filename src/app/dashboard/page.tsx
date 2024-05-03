"use client";

import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { buttonVariants } from "~/components/ui/button";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { useOrganization, useOrganizationList, useUser } from "@clerk/nextjs";
import { useAppDispatch } from "~/lib/hooks";
import { fetchTeams } from "~/lib/features/teams/slice";

const DashboardPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTeams()).catch((error) => console.log(error));
  }, [dispatch]);
  return <div></div>;
};

export default DashboardPage;
