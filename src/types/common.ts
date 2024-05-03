import { type schema } from "normalizr";
import { type ThunkDispatch } from "redux-thunk";
import { type RootState } from "~/lib/store";

export interface GenericAction<T = unknown> {
  type: string;
  payload?: T;
}

export interface ApiError {
  code: string | undefined;
  message: string;
}

export type ApiAction = {
  actions: Function[];
  endpoint: string;
  method?: string;
  schema: schema.Object;
  data: Record<string, unknown>;
};

export type Error = ApiError | string | null;
