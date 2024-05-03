import actionTypes from "./actionTypes";
import { FETCH_STATUS } from "~/enums/common";
import { type TeamActionsType } from "./actions";
import { combineReducers } from "@reduxjs/toolkit";
import { type Team, type State } from "~/types/teams";

const initialTeamsState: Team[] = [];

const teamsReducer = (state = initialTeamsState, action: TeamActionsType) => {
  switch (action.type) {
    case actionTypes.FETCH_TEAMS_SUCCESS: {
      return action.payload;
    }
    default:
      return state;
  }
};

const initialUIState = {
  fetchTeamsStatus: FETCH_STATUS.IDLE,
};

export const uiReducer = (state = initialUIState, action: TeamActionsType) => {
  switch (action.type) {
    case actionTypes.FETCH_TEAMS_REQUEST: {
      return {
        ...state,
        fetchTeamsStatus: FETCH_STATUS.IN_PROGRESS,
      };
    }
    case actionTypes.FETCH_TEAMS_SUCCESS: {
      return {
        ...state,
        fetchTeamsStatus: FETCH_STATUS.SUCCESS,
      };
    }
    case actionTypes.FETCH_TEAMS_FAILURE: {
      return {
        ...state,
        fetchTeamsStatus: FETCH_STATUS.FAILED,
      };
    }
    default:
      return state;
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
