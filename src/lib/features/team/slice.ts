import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FETCH_STATUS } from "~/enums/common";
import { type Team } from "~/types/teams";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  team: {} as Team,
  ui: {
    fetchTeamStatus: FETCH_STATUS.IDLE,
  },
};

// Define the async thunk
export const fetchTeam = createAsyncThunk(
  "team/fetchTeam",
  async (teamId: number) => {
    const res = await fetch(`/api/teams/${teamId}`);
    return (await res.json()) as Team[];
  },
);

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    // Define other synchronous actions here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeam.pending, (state) => {
        state.ui.fetchTeamStatus = FETCH_STATUS.IN_PROGRESS;
      })
      .addCase(fetchTeam.rejected, (state) => {
        state.ui.fetchTeamStatus = FETCH_STATUS.FAILED;
      })
      .addCase(fetchTeam.fulfilled, (state, action: PayloadAction<Team>) => {
        state.ui.fetchTeamStatus = FETCH_STATUS.SUCCESS;
        state.team = action.payload;
      });
  },
  selectors: {
    selectTeam: (state): Team => state.team,
    selectFetchTeamStatus: (state): FETCH_STATUS => state.ui.fetchTeamStatus,
  },
});

export const { selectTeam, selectFetchTeamStatus } = teamSlice.selectors;
export default teamSlice.reducer;
