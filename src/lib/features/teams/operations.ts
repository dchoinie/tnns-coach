/* eslint-disable import/no-anonymous-default-export */
import type * as CommonTypes from "~/types/common";
import { schema } from "normalizr";
import actions from "./actions";
import { type Dispatch } from "@reduxjs/toolkit";
import { type Team } from "~/types/teams";

const { fetchTeamsRequest, fetchTeamsSuccess, fetchTeamsFailure } = actions;

const fetchTeamsRequestOp = (dispatch: CommonTypes.GenericAction): void => {
  dispatch(fetchTeamsRequest());
};

const fetchTeamsSuccessOp = (
  dispatch: CommonTypes.GenericAction,
  response: Team[],
) => {
  dispatch(fetchTeamsSuccess(response));
};

const fetchTeamsFailureOp = (dispatch: Dispatch, error: CommonTypes.Error) => {
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
