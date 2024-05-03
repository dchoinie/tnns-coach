/* eslint-disable import/no-anonymous-default-export */
import { createSelector } from "@reduxjs/toolkit";
import { type RootState } from "~/lib/store";
import { type Team, type UI } from "~/types/teams";

const teams = createSelector(
  (state: RootState) => state.teams.teams,
  (teams: Team[]) => teams,
);

const fetchTeamsStatus = createSelector(
  (state: RootState) => state.teams.ui,
  (ui: UI) => ui.fetchTeamsStatus,
);

export default {
  teams,
  fetchTeamsStatus,
};
