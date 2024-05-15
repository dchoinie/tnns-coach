import { type FETCH_STATUS } from "~/enums/common";
import { type Team } from "./teams";

export interface Player {
  id: number;
  createdAt: Date;
  firstName: string;
  lastName: string;
  nickname: string;
  dateOfBirth: Date;
  gender: string;
  utrRating: number;
  status: string;
  teamId: number;
  team?: Team;
}

export interface UI {
  fetchPlayersStatus: FETCH_STATUS;
}

export interface State {
  ui: UI;
  players: Player[];
}
