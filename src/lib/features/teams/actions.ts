import type * as CommonTypes from "~/types/common";
import actionTypes from "./actionTypes";
import { type ActionCreatorsMapObject } from "redux";
import { type Team } from "~/types/teams";

const fetchTeamsRequest = (): CommonTypes.GenericAction => ({
  type: actionTypes.FETCH_TEAMS_REQUEST,
});

const fetchTeamsSuccess = (payload: Team[]): CommonTypes.GenericAction => ({
  type: actionTypes.FETCH_TEAMS_SUCCESS,
  payload,
});

const fetchTeamsFailure = (
  error: CommonTypes.Error,
): CommonTypes.GenericAction => ({
  type: actionTypes.FETCH_TEAMS_FAILURE,
  payload: error,
});

const actionCreators = {
  fetchTeamsRequest,
  fetchTeamsSuccess,
  fetchTeamsFailure,
};

type ActionUnion<T extends ActionCreatorsMapObject> = ReturnType<T[keyof T]>;
export type TeamActionsType = ActionUnion<typeof actionCreators>;

export default actionCreators;
