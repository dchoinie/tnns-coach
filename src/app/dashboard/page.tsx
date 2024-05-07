"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import {
  fetchTeams,
  selectTeams,
  selectFetchTeamsStatus,
} from "~/lib/features/teams/slice";
import { fetchCurrentUser } from "~/lib/features/users/slice";
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert";
import { AlertCircle, ChevronRight, LoaderCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { FETCH_STATUS } from "~/enums/common";

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const user = useUser();
  const teams = useAppSelector(selectTeams);
  const fetchTeamsStatus = useAppSelector(selectFetchTeamsStatus);

  useEffect(() => {
    dispatch(fetchTeams()).catch((error) => console.log(error));
    dispatch(fetchCurrentUser()).catch((error) => console.log(error));
  }, [dispatch]);

  return (
    <>
      {fetchTeamsStatus === FETCH_STATUS.IN_PROGRESS ? (
        <>
          <div className="flex">
            <span>Loading</span>
            <LoaderCircle className="ml-2 animate-spin repeat-infinite" />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col">
            {teams.length > 0 ? null : (
              <>
                <div className="flex">
                  <Alert variant="destructive" className="w-1/2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>You need to create a team</AlertTitle>
                    <AlertDescription>
                      <div className="mb-4">
                        You need to create a team to start using the features of
                        this application.
                      </div>
                      <Button variant="outline" size="sm">
                        <Link href="/dashboard/teams" className="flex">
                          <span>Go To Team Management</span>
                          <ChevronRight
                            size={17}
                            className="ml-2 self-center"
                          />
                        </Link>
                      </Button>
                    </AlertDescription>
                  </Alert>
                </div>
              </>
            )}

            <div className="grid grid-cols-2"></div>
          </div>
        </>
      )}
    </>
  );
};

export default DashboardPage;
