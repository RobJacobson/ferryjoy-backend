import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, integer, real, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";

export const vesselLocationsBySecondTable = pgTable("vessel_locations_by_second", {
  id: serial("id").primaryKey(),
  vesselID: integer("vessel_id").notNull(),
  vesselName: text("vessel_name").notNull(),
  departTermID: integer("depart_term_id").notNull(),
  departTermName: text("depart_term_name").notNull(),
  departTermAbbrev: text("depart_term_abbrev").notNull(),
  arrivTermID: integer("arriv_term_id"),
  arrivTermName: text("arriv_term_name"),
  arrivTermAbbrev: text("arriv_term_abbrev"),
  lat: real("lat").notNull(),
  lon: real("lon").notNull(),
  speed: real("speed").notNull(),
  heading: integer("heading").notNull(),
  inService: boolean("in_service").notNull(),
  atDock: boolean("at_dock").notNull(),
  leftDock: timestamp("left_dock"),
  eta: text("eta"),
  schedDeparture: timestamp("sched_departure"),
  opRouteAbbrev: text("op_route_abbrev"),
  vesselPosNum: integer("vessel_pos_num"),
  timeStamp: timestamp("time_stamp").notNull(),
  timeFetched: timestamp("time_fetched").notNull(),
});

export const vesselLocationsByMinuteTable = pgTable("vessel_locations_by_minute", {
  id: serial("id").primaryKey(),
  vesselID: integer("vessel_id").notNull(),
  vesselName: text("vessel_name").notNull(),
  departTermID: integer("depart_term_id").notNull(),
  departTermName: text("depart_term_name").notNull(),
  departTermAbbrev: text("depart_term_abbrev").notNull(),
  arrivTermID: integer("arriv_term_id"),
  arrivTermName: text("arriv_term_name"),
  arrivTermAbbrev: text("arriv_term_abbrev"),
  lat: real("lat").notNull(),
  lon: real("lon").notNull(),
  speed: real("speed").notNull(),
  heading: integer("heading").notNull(),
  inService: boolean("in_service").notNull(),
  atDock: boolean("at_dock").notNull(),
  leftDock: timestamp("left_dock"),
  eta: timestamp("eta"),
  schedDeparture: timestamp("sched_departure"),
  opRouteAbbrev: text("op_route_abbrev"),
  vesselPosNum: integer("vessel_pos_num"),
  timeStamp: timestamp("time_stamp").notNull(),
  timeFetched: timestamp("time_fetched").notNull(),
});

export type NewVesselLocation = InferInsertModel<typeof vesselLocationsByMinuteTable>;
export type SelectVesselLocation = InferSelectModel<typeof vesselLocationsByMinuteTable>;
