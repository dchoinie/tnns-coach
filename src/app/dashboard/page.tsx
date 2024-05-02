"use client";

import React from "react";
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

const DashboardPage = () => {
  const org = useOrganization();
  const list = useOrganizationList();
  const user = useUser();
  console.log(list);
  console.log(org);
  console.log(user);

  return <div></div>;
};

export default DashboardPage;
