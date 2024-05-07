import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FETCH_STATUS } from "~/enums/common";
import { type User } from "~/types/users";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {} as User,
  ui: {
    fetchCurrentUserStatus: FETCH_STATUS.IDLE,
  },
};

// Define the async thunk
export const fetchCurrentUser = createAsyncThunk(
  "users/fetchCurrentUser",
  async () => {
    const res = await fetch("/api/users/current");
    return (await res.json()) as User;
  },
);

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    // Define other synchronous actions here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.ui.fetchCurrentUserStatus = FETCH_STATUS.IN_PROGRESS;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.ui.fetchCurrentUserStatus = FETCH_STATUS.FAILED;
      })
      .addCase(
        fetchCurrentUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.ui.fetchCurrentUserStatus = FETCH_STATUS.SUCCESS;
          state.currentUser = action.payload;
        },
      );
  },
  selectors: {
    selectCurrentUser: (state): User => state.currentUser,
    selectFetchCurrentUserStatus: (state): FETCH_STATUS =>
      state.ui.fetchCurrentUserStatus,
  },
});

export const { selectCurrentUser, selectFetchCurrentUserStatus } =
  currentUserSlice.selectors;
export default currentUserSlice.reducer;
