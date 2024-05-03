/* eslint-disable import/no-anonymous-default-export */
import type * as CommonTypes from "~/types/common";
import { schema } from "normalizr";
import { type ThunkDispatch } from "redux-thunk";
import actions from "./actions";
import { type Team } from "~/types/teams";
import { type RootState } from "~/lib/store";

const { fetchTeamsRequest, fetchTeamsSuccess, fetchTeamsFailure } = actions;

const fetchTeamsRequestOp = (
  dispatch: ThunkDispatch<RootState, undefined, CommonTypes.GenericAction>,
): void => {
  dispatch(fetchTeamsRequest());
};

const fetchTeamsSuccessOp = (
  dispatch: ThunkDispatch<RootState, undefined, CommonTypes.GenericAction>,
  response: Team[],
): void => {
  dispatch(fetchTeamsSuccess(response));
};

const fetchTeamsFailureOp = (
  dispatch: ThunkDispatch<RootState, undefined, CommonTypes.GenericAction>,
  error: CommonTypes.Error,
): void => {
  dispatch(fetchTeamsFailure(error));
};

const fetchTeams = (): CommonTypes.ApiAction => ({
  actions: [fetchTeamsRequestOp, fetchTeamsSuccessOp, fetchTeamsFailureOp],
  endpoint: "/create-organization/api",
  method: "GET",
  schema: new schema.Object({}),
  data: {},
});

export default {
  fetchTeams,
};
