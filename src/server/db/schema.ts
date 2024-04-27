// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  date,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `tnns-coach_${name}`);

export const genderEnum = pgEnum("gender", ["male", "female"]);
export const resultEnum = pgEnum("result", ["win", "loss", "tie"]);
export const positionEnum = pgEnum("position", [
  "1_singles",
  "2_singles",
  "3_singles",
  "4_singles",
  "5_singles",
  "6_singles",
  "exhibition_singles",
  "1_doubles",
  "2_doubles",
  "3_doubles",
  "exhibition_doubles",
]);
export const matchTypeEnum = pgEnum("match_format", [
  "hs_varsity",
  "college_DI",
  "college_DII",
  "college_DIII",
  "hs_junior_varsity",
  "middle_school",
  "custom",
]);

export const users = createTable("user", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  firstName: varchar("first_name", { length: 256 }),
  lastName: varchar("last_name", { length: 256 }),
  email: varchar("email", { length: 256 }),
  phone: varchar("phone", { length: 256 }),
  dateOfBirth: date("date_of_birth"),
  managedTeams: integer("managed_teams").references(() => teams.id),
});

export const teams = createTable("team", {
  id: serial("id").primaryKey(),
  schoolName: varchar("school_name", { length: 256 }),
  schoolMascot: varchar("school_mascot", { length: 256 }),
  gender: genderEnum("gender"),
  conference: varchar("conference", { length: 256 }),
  division: varchar("division", { length: 256 }),
});

export const players = createTable("player", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  firstName: varchar("first_name", { length: 256 }),
  lastName: varchar("last_name", { length: 256 }),
  nickname: varchar("nickname", { length: 256 }),
  dateOfBirth: date("date_of_birth"),
  gender: genderEnum("gender"),
  utrRating: integer("utr_rating"),
  teamId: integer("team_id").references(() => teams.id),
});

export const teamMatches = createTable("team_match", {
  id: serial("id").primaryKey(),
  date: date("date"),
  matchType: matchTypeEnum("match_type"),
  homeTeamId: integer("home_team_id").references(() => teams.id),
  awayTeamId: integer("away_team_id").references(() => teams.id),
  location: integer("location").references(() => sites.id),
  matches: integer("matches").references(
    () => doublesMatches.id || singlesMatches.id,
  ),
  result: integer("result").references(() => matchResults.id),
});

export const matchResults = createTable("match_result", {
  id: serial("id").primaryKey(),
  homeTeamResult: resultEnum("home_team_result"),
  awayTeamResult: resultEnum("away_team_result"),
  score: varchar("score", { length: 256 }),
});

export const sites = createTable("site", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  address: varchar("address", { length: 256 }),
  city: varchar("city", { length: 256 }),
  state: varchar("state", { length: 256 }),
  zip: varchar("zip", { length: 256 }),
  numberOfCourts: integer("number_of_courts"),
});

export const singlesMatches = createTable("singles_match", {
  id: serial("id").primaryKey(),
  homePlayerId: integer("home_player_id").references(() => players.id),
  awayPlayerId: integer("away_player_id").references(() => players.id),
  homePlayerResult: resultEnum("home_player_result"),
  awayPlayerResult: resultEnum("away_player_result"),
  score: varchar("score", { length: 256 }),
});

export const doublesMatches = createTable("doubles_match", {
  id: serial("id").primaryKey(),
  homeTeamId: integer("home_team_id").references(() => doublesTeams.id),
  awayTeamId: integer("away_team_id").references(() => doublesTeams.id),
  homeTeamResult: resultEnum("home_team_result"),
  awayTeamResult: resultEnum("away_team_result"),
  score: varchar("score", { length: 256 }),
});

export const doublesTeams = createTable("doubles_team", {
  id: serial("id").primaryKey(),
  player_1_id: integer("player_1_id").references(() => players.id),
  player_2_id: integer("player_2_id").references(() => players.id),
});
