import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FETCH_STATUS } from "~/enums/common";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type Player } from "~/types/players";

const initialState = {
  players: [] as Player[],
  ui: {
    fetchPlayersStatus: FETCH_STATUS.IDLE,
  },
};

// Define the async thunk
export const fetchPlayers = createAsyncThunk(
  "players/fetchPlayers",
  async () => {
    const res = await fetch(`/api/players`);
    return (await res.json()) as Player[];
  },
);

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    // Define other synchronous actions here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayers.pending, (state) => {
        state.ui.fetchPlayersStatus = FETCH_STATUS.IN_PROGRESS;
      })
      .addCase(fetchPlayers.rejected, (state) => {
        state.ui.fetchPlayersStatus = FETCH_STATUS.FAILED;
      })
      .addCase(
        fetchPlayers.fulfilled,
        (state, action: PayloadAction<Player[]>) => {
          state.ui.fetchPlayersStatus = FETCH_STATUS.SUCCESS;
          state.players = action.payload;
        },
      );
  },
  selectors: {
    selectPlayers: (state): Player[] => state.players,
    selectFetchPlayersStatus: (state): FETCH_STATUS =>
      state.ui.fetchPlayersStatus,
  },
});

export const { selectPlayers, selectFetchPlayersStatus } =
  playersSlice.selectors;
export default playersSlice.reducer;
