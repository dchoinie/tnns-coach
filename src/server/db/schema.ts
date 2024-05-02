import { relations, sql } from "drizzle-orm";
import {
  pgTableCreator,
  timestamp,
  varchar,
  date,
  integer,
  pgEnum,
  serial,
  pgTable,
  primaryKey,
  boolean,
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

export const users = createTable("user", {
  id: serial("id").notNull().primaryKey(),
  createdAt: date("created_at")
    .default(sql`CURRENT_DATE`)
    .notNull(),
  firstName: varchar("first_name", { length: 256 }),
  lastName: varchar("last_name", { length: 256 }),
  email: varchar("email", { length: 256 }),
  phone: varchar("phone", { length: 256 }),
  dateOfBirth: date("date_of_birth", { mode: "string" }),
  title: varchar("title", { length: 256 }),
  profileCompleted: boolean("profile_completed"),
  organizationCompleted: boolean("organization_completed"),
});

export const usersRelations = relations(users, ({ many }) => ({
  usersToTeams: many(teams),
}));

export const teams = createTable("team", {
  id: serial("id").notNull().primaryKey(),
  schoolName: varchar("school_name", { length: 256 }),
  schoolMascot: varchar("school_mascot", { length: 256 }),
  gender: varchar("gender", { length: 256 }),
  conference: varchar("conference", { length: 256 }),
  division: varchar("division", { length: 256 }),
  class: varchar("class", { length: 256 }),
  section: varchar("section", { length: 256 }),
  clerkOrgId: varchar("clerk_org_id", { length: 256 }),
});

export const teamsRelations = relations(teams, ({ many }) => ({
  usersToTeams: many(usersToTeams),
  players: many(players),
}));

export const usersToTeams = pgTable(
  "users_to_teams",
  {
    userId: integer("user_id").references(() => users.id),
    teamId: integer("team_id").references(() => teams.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.teamId] }),
  }),
);

export const players = createTable("player", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  firstName: varchar("first_name", { length: 256 }),
  lastName: varchar("last_name", { length: 256 }),
  nickname: varchar("nickname", { length: 256 }),
  dateOfBirth: date("date_of_birth"),
  gender: varchar("gender", { length: 6, enum: ["male", "female"] }),
  utrRating: integer("utr_rating"),
  status: varchar("status", { length: 8, enum: ["active", "inactive"] }),
  teamId: integer("team_id").references(() => teams.id),
});

export const playersRelations = relations(players, ({ one }) => ({
  teams: one(teams, {
    fields: [players.teamId],
    references: [teams.id],
  }),
}));

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
