/* eslint-disable import/no-anonymous-default-export */
import { createSelector } from "@reduxjs/toolkit";
import { type State, type Team, type UI } from "~/types/teams";

const teams = createSelector(
  (state: State) => state.teams,
  (teams: Team[]) => teams,
);

const fetchTeamsStatus = createSelector(
  (state: State) => state.ui,
  (ui: UI) => ui.fetchTeamsStatus,
);

export default {
  teams,
  fetchTeamsStatus,
};
