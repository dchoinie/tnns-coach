import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FETCH_STATUS } from "~/enums/common";
import { type Team } from "~/types/teams";
import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "~/lib/store";

interface TeamsState {
  teams: Team[];
  ui: {
    fetchTeamsStatus: FETCH_STATUS;
  };
}

const initialState = {
  teams: [] as Team[],
  ui: {
    fetchTeamsStatus: FETCH_STATUS.IDLE,
  },
};

// Define the async thunk
export const fetchTeams = createAsyncThunk("teams/fetchTeams", async () => {
  const res = await fetch("/api/teams");
  return (await res.json()) as Team[];
});

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    // Define other synchronous actions here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.ui.fetchTeamsStatus = FETCH_STATUS.IN_PROGRESS;
      })
      .addCase(fetchTeams.rejected, (state) => {
        state.ui.fetchTeamsStatus = FETCH_STATUS.FAILED;
      })
      .addCase(fetchTeams.fulfilled, (state, action: PayloadAction<Team[]>) => {
        state.ui.fetchTeamsStatus = FETCH_STATUS.SUCCESS;
        state.teams = action.payload;
      });
  },
  selectors: {
    selectTeams: (state) => state.teams,
    selectFetchTeamsStatus: (state) => state.ui.fetchTeamsStatus,
  },
});

// export { selectTeams, selectFetchTeamsStatus } = teamsSlice.selectors;

export default teamsSlice.reducer;
