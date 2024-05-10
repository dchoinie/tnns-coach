"use client";

import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  matches: any[];
}

const RecentMatches = ({ matches }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Matches</CardTitle>
        <CardDescription>
          Latest results, click below to view all results
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Opponent</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Result</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matches.map((match: any) => (
              <TableRow
                key={match.id}
                className={
                  match.result === "win" ? "bg-green-200" : "bg-red-200"
                }
              >
                <TableCell>{match.date}</TableCell>
                <TableCell>{match.opponentTeamName}</TableCell>
                <TableCell>{match.score}</TableCell>
                <TableCell className="capitalize">{match.result}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Button asChild variant="default" size="sm">
          <Link href="/dashboard/team-matches" className="flex">
            <span>View All Matches</span>
            <ChevronRightIcon size={17} className="ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentMatches;
