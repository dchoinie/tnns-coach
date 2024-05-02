import actionTypes from "./actionTypes";
import { FETCH_STATUS } from "~/enums/common";
import { type TeamActionsType } from "./actions";
import { combineReducers } from "@reduxjs/toolkit";
import { type Team, type State } from "~/types/teams";

const initialTeamsState = [] as Team[];

const teamsReducer = (state = initialTeamsState, action: TeamActionsType) => {
  switch (action.type) {
    case actionTypes.FETCH_TEAMS_SUCCESS: {
      return {
        ...state,
        teams: action.payload as Team[],
      };
    }
  }
};

const initialUIState = {
  fetchTeamsStatus: FETCH_STATUS.NOT_STARTED,
};

export const uiReducer = (state = initialUIState, action: TeamActionsType) => {
  switch (action.type) {
    case actionTypes.FETCH_TEAMS_REQUEST: {
      return {
        ...state,
        ui: {
          fetchTeamsStatus: FETCH_STATUS.IN_PROGRESS,
        },
      };
    }
    case actionTypes.FETCH_TEAMS_SUCCESS: {
      return {
        ...state,
        teams: action.payload,
        ui: {
          fetchTeamsStatus: FETCH_STATUS.SUCCESS,
        },
      };
    }
    case actionTypes.FETCH_TEAMS_FAILURE: {
      return {
        ...state,
        ui: {
          fetchTeamsStatus: FETCH_STATUS.FAILED,
        },
      };
    }
  }
};

export const initialState: State = {
  ui: initialUIState,
  teams: initialTeamsState,
};

export default combineReducers({
  ui: uiReducer,
  teams: teamsReducer,
});
