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

const dashboardPage = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Coaching Staff</CardTitle>
          <CardDescription>
            In the Coaching Staff section, you have the ability to manage
            users/coaches. This includes tasks such as adding new staff,
            updating existing member information, assigning roles, and removing
            individuals from the team.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            className={buttonVariants({ variant: "default" })}
            href="/dashboard/coaching-staff"
          >
            Manage Coaching Staff
          </Link>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Team Management</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Player Management</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Team Matches</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Individual Matches</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
};

export default dashboardPage;
