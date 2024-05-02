import { type schema } from "normalizr";

export interface GenericAction<T = unknown> {
  type: string;
  payload?: T;
}

export interface ApiError {
  code: string | undefined;
  message: string;
}

export type ApiAction = {
  actions: GenericAction[];
  endpoint: string;
  method?: string;
  schema: schema.Object;
  data: Record<string, unknown>;
};

export type Error = ApiError | string | null;
