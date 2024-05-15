"use client";

import React, { useState, useEffect } from "react";
import PageTitle from "~/app/_components/pageTitle";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  fetchPlayers,
  selectFetchPlayersStatus,
  selectPlayers,
} from "~/lib/features/players/slice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import { type Player } from "~/types/players";
import moment from "moment";
import { Ellipsis, Import, LoaderCircle, Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { FETCH_STATUS } from "~/enums/common";

const PlayersPage = () => {
  const [error, setError] = useState<string>("");
  const dispatch = useAppDispatch();

  const players = useAppSelector(selectPlayers);
  const fetchPlayersStatus = useAppSelector(selectFetchPlayersStatus);

  useEffect(() => {
    dispatch(fetchPlayers()).catch((err) => setError(error));
  }, [dispatch]);

  console.log(players);

  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title="Manage Players" />
        <div className="flex gap-6">
          <Button size="sm">
            <Plus size={17} className="mr-2" /> Add New
          </Button>
          <Button size="sm" variant="secondary">
            Import <Import size={17} className="ml-2" />
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>D.O.B</TableHead>
            <TableHead>UTR Rating</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fetchPlayersStatus === FETCH_STATUS.IN_PROGRESS ? (
            <div className="flex">
              Loading
              <LoaderCircle className="ml-2 animate-spin" size={17} />
            </div>
          ) : (
            <>
              {players.map((player: Player) => (
                <TableRow key={player.id}>
                  <TableCell>{player.firstName}</TableCell>
                  <TableCell>{player.lastName}</TableCell>
                  <TableCell>{player.gender}</TableCell>
                  <TableCell>
                    {moment(player.dateOfBirth).format("MMM DD, YYYY")}
                  </TableCell>
                  <TableCell>{player.utrRating}</TableCell>
                  <TableCell>{player.team?.schoolName}</TableCell>
                  <TableCell>{player.status}</TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger>
                        <Ellipsis />
                      </PopoverTrigger>
                      <PopoverContent className="w-36">
                        <div className="flex flex-col">
                          <p>View Player</p>
                          <p>View Team</p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PlayersPage;
