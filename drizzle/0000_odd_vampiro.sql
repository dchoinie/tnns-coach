DO $$ BEGIN
 CREATE TYPE "public"."match_format" AS ENUM('hs_varsity', 'college_DI', 'college_DII', 'college_DIII', 'college_NAIA', 'junior_college', 'hs_junior_varsity', 'middle_school', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."position" AS ENUM('1_singles', '2_singles', '3_singles', '4_singles', '5_singles', '6_singles', 'exhibition_singles', '1_doubles', '2_doubles', '3_doubles', 'exhibition_doubles');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."result" AS ENUM('win', 'loss', 'tie');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tnns-coach_doubles_matches" (
	"id" serial PRIMARY KEY NOT NULL,
	"home_team_id" integer,
	"away_team_names" varchar(256),
	"result" "result",
	"score" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tnns-coach_doubles_teams" (
	"id" serial PRIMARY KEY NOT NULL,
	"player_1_id" integer,
	"player_2_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tnns-coach_players" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"first_name" varchar(256),
	"last_name" varchar(256),
	"nickname" varchar(256),
	"date_of_birth" date,
	"gender" varchar(6),
	"utr_rating" integer,
	"status" varchar(8),
	"team_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tnns-coach_singles_matches" (
	"id" serial PRIMARY KEY NOT NULL,
	"home_player_id" integer,
	"opponent_name" varchar(256),
	"result" "result",
	"score" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tnns-coach_sites" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"address" varchar(256),
	"city" varchar(256),
	"state" varchar(256),
	"zip" varchar(256),
	"number_of_courts" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tnns-coach_team_matches" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date,
	"match_type" "match_format",
	"opponent_team_name" varchar(256),
	"location" integer,
	"matches" integer,
	"result" varchar(256),
	"score" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tnns-coach_teams" (
	"id" serial PRIMARY KEY NOT NULL,
	"school_name" varchar(256),
	"school_mascot" varchar(256),
	"city" varchar(256),
	"state" varchar(256),
	"gender" varchar(256),
	"level" varchar(256),
	"conference" varchar(256),
	"division" varchar(256),
	"class" varchar(256),
	"section" varchar(256),
	"clerk_org_id" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tnns-coach_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"clerk_id" varchar(256),
	"created_at" date DEFAULT CURRENT_DATE NOT NULL,
	"first_name" varchar(256),
	"last_name" varchar(256),
	"email" varchar(256),
	"phone" varchar(256),
	"date_of_birth" date,
	"title" varchar(256)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tnns-coach_doubles_matches" ADD CONSTRAINT "tnns-coach_doubles_matches_home_team_id_tnns-coach_doubles_teams_id_fk" FOREIGN KEY ("home_team_id") REFERENCES "public"."tnns-coach_doubles_teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tnns-coach_doubles_teams" ADD CONSTRAINT "tnns-coach_doubles_teams_player_1_id_tnns-coach_players_id_fk" FOREIGN KEY ("player_1_id") REFERENCES "public"."tnns-coach_players"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tnns-coach_doubles_teams" ADD CONSTRAINT "tnns-coach_doubles_teams_player_2_id_tnns-coach_players_id_fk" FOREIGN KEY ("player_2_id") REFERENCES "public"."tnns-coach_players"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tnns-coach_players" ADD CONSTRAINT "tnns-coach_players_team_id_tnns-coach_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."tnns-coach_teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tnns-coach_singles_matches" ADD CONSTRAINT "tnns-coach_singles_matches_home_player_id_tnns-coach_players_id_fk" FOREIGN KEY ("home_player_id") REFERENCES "public"."tnns-coach_players"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tnns-coach_team_matches" ADD CONSTRAINT "tnns-coach_team_matches_location_tnns-coach_sites_id_fk" FOREIGN KEY ("location") REFERENCES "public"."tnns-coach_sites"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tnns-coach_team_matches" ADD CONSTRAINT "tnns-coach_team_matches_matches_tnns-coach_doubles_matches_id_fk" FOREIGN KEY ("matches") REFERENCES "public"."tnns-coach_doubles_matches"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
