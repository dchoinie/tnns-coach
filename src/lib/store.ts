import { configureStore } from "@reduxjs/toolkit";
import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import teamsReducer from "~/lib/features/teams/slice";
import currentUserReducer from "~/lib/features/users/slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      teams: teamsReducer,
      currentUser: currentUserReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
  });
};

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
