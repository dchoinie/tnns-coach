import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import teamsReducer from "~/lib/features/teams/slice";

const rootReducer = combineReducers({
  teams: teamsReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: {
      rootReducer,
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
