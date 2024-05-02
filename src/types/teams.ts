import { type FETCH_STATUS } from "~/enums/common";

export interface Team {
  id: number;
  schoolName: string;
  schoolMascot: string;
  gender: string;
  conference: string;
  division: string;
  class: string;
  section: string;
  clerkOrgId: string;
}

export interface UI {
  fetchTeamsStatus: FETCH_STATUS;
}

export interface State {
  ui: UI;
  teams: Team[];
}
