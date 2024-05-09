import {
  SelectItem,
  SelectGroup,
  SelectLabel,
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "~/components/ui/select";
import { type Team } from "~/types/teams";

export const teamsSelectList = (title: string, teams: Team[]): JSX.Element => {
  return (
    <>
      {teams.length > 0 && (
        <SelectGroup>
          <SelectLabel>{title}</SelectLabel>
          {teams.map((team: Team) => (
            <SelectItem key={team.id} value={String(team.id)}>
              {team.schoolName}
            </SelectItem>
          ))}
        </SelectGroup>
      )}
    </>
  );
};

export const collegeD1Teams = (teams: Team[]): JSX.Element => {
  const d1 = teams.filter(
    (team: Team) => team.level === "college" && team.division === "DI",
  );
  return teamsSelectList("D1", d1);
};

export const collegeD2Teams = (teams: Team[]): JSX.Element => {
  const d2 = teams.filter(
    (team: Team) => team.level === "college" && team.division === "DII",
  );
  return teamsSelectList("D2", d2);
};

export const collegeD3Teams = (teams: Team[]): JSX.Element => {
  const d3 = teams.filter(
    (team: Team) => team.level === "college" && team.division === "DIII",
  );
  return teamsSelectList("D3", d3);
};

export const collegeNAIATeams = (teams: Team[]): JSX.Element => {
  const naia = teams.filter(
    (team: Team) => team.level === "college" && team.division === "NAIA",
  );
  return teamsSelectList("NAIA", naia);
};

export const collegeNJCAATeams = (teams: Team[]): JSX.Element => {
  const njcaa = teams.filter(
    (team: Team) => team.level === "college" && team.division === "NJCAA",
  );
  return teamsSelectList("NJCAA", njcaa);
};

export const collegeCCCAATeams = (teams: Team[]): JSX.Element => {
  const cccaa = teams.filter(
    (team: Team) => team.level === "college" && team.division === "CCCAA",
  );
  return teamsSelectList("CCCAA", cccaa);
};

const stateSelectItem = (state: string): JSX.Element => (
  <SelectItem key={state} value={state}>
    {state}
  </SelectItem>
);

const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

export const stateSelect = (): JSX.Element => {
  return (
    <Select name="state">
      <SelectTrigger>
        <SelectValue placeholder="Select a state" />
      </SelectTrigger>
      <SelectContent>
        {states.map((state: string) => stateSelectItem(state))}
      </SelectContent>
    </Select>
  );
};
