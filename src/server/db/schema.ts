import { relations, sql } from "drizzle-orm";
import {
  pgTableCreator,
  timestamp,
  varchar,
  date,
  integer,
  pgEnum,
  serial,
  primaryKey,
  boolean,
  real,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `tnns-coach_${name}`);

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
  "college_NAIA",
  "junior_college",
  "hs_junior_varsity",
  "middle_school",
  "custom",
]);

export const users = createTable("users", {
  id: serial("id").notNull().primaryKey(),
  clerkId: varchar("clerk_id", { length: 256 }),
  createdAt: date("created_at")
    .default(sql`CURRENT_DATE`)
    .notNull(),
  firstName: varchar("first_name", { length: 256 }),
  lastName: varchar("last_name", { length: 256 }),
  email: varchar("email", { length: 256 }),
  phone: varchar("phone", { length: 256 }),
  dateOfBirth: date("date_of_birth", { mode: "string" }),
  title: varchar("title", { length: 256 }),
});

export const teams = createTable("teams", {
  id: serial("id").notNull().primaryKey(),
  schoolName: varchar("school_name", { length: 256 }),
  schoolMascot: varchar("school_mascot", { length: 256 }),
  city: varchar("city", { length: 256 }),
  state: varchar("state", { length: 256 }),
  gender: varchar("gender", { length: 256 }),
  level: varchar("level", { length: 256 }),
  conference: varchar("conference", { length: 256 }),
  division: varchar("division", { length: 256 }),
  class: varchar("class", { length: 256 }),
  section: varchar("section", { length: 256 }),
  clerkOrgId: varchar("clerk_org_id", { length: 256 }),
});

export const teamsRelations = relations(teams, ({ many }) => ({
  players: many(players),
}));

export const players = createTable("players", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  firstName: varchar("first_name", { length: 256 }),
  lastName: varchar("last_name", { length: 256 }),
  nickname: varchar("nickname", { length: 256 }),
  dateOfBirth: date("date_of_birth"),
  gender: varchar("gender", { length: 6, enum: ["male", "female"] }),
  utrRating: real("utr_rating"),
  status: varchar("status", { length: 8, enum: ["active", "inactive"] }),
  teamId: integer("team_id").references(() => teams.id),
});

export const playersRelations = relations(players, ({ one }) => ({
  teams: one(teams, {
    fields: [players.teamId],
    references: [teams.id],
  }),
}));

export const teamMatches = createTable("team_matches", {
  id: serial("id").primaryKey(),
  date: date("date"),
  matchType: matchTypeEnum("match_type"),
  opponentTeamName: varchar("opponent_team_name", { length: 256 }),
  location: integer("location").references(() => sites.id),
  matches: integer("matches").references(
    () => doublesMatches.id || singlesMatches.id,
  ),
  result: varchar("result", { length: 256 }),
  score: varchar("score", { length: 256 }),
});

export const sites = createTable("sites", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  address: varchar("address", { length: 256 }),
  city: varchar("city", { length: 256 }),
  state: varchar("state", { length: 256 }),
  zip: varchar("zip", { length: 256 }),
  numberOfCourts: integer("number_of_courts"),
});

export const singlesMatches = createTable("singles_matches", {
  id: serial("id").primaryKey(),
  playerId: integer("home_player_id").references(() => players.id),
  opponentName: varchar("opponent_name", { length: 256 }),
  result: resultEnum("result"),
  score: varchar("score", { length: 256 }),
});

export const doublesMatches = createTable("doubles_matches", {
  id: serial("id").primaryKey(),
  teamId: integer("home_team_id").references(() => doublesTeams.id),
  awayTeamNames: varchar("away_team_names", { length: 256 }),
  result: resultEnum("result"),
  score: varchar("score", { length: 256 }),
});

export const doublesTeams = createTable("doubles_teams", {
  id: serial("id").primaryKey(),
  player_1_id: integer("player_1_id").references(() => players.id),
  player_2_id: integer("player_2_id").references(() => players.id),
});
