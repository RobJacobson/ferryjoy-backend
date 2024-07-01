import { pgTable, integer, real, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";

export const vesselLocationsBySecondTable = pgTable("vessel_locations_by_second", {
  id: serial("id").primaryKey(),
  vesselID: integer("vessel_id").notNull(),
  vesselName: text("vessel_name").notNull(),
  departTermID: integer("depart_term_id").notNull(),
  departTermName: text("depart_term_name").notNull(),
  departTermAbrv: text("depart_term_abrv").notNull(),
  arrivTermID: integer("arriv_term_id"),
  arrivTermName: text("arriv_term_name"),
  arrivTermAbrv: text("arriv_term_abrv"),
  lat: real("lat").notNull(),
  lon: real("lon").notNull(),
  speed: real("speed").notNull(),
  heading: integer("heading").notNull(),
  inService: boolean("in_service").notNull(),
  atDock: boolean("at_dock").notNull(),
  leftDock: timestamp("left_dock"),
  eta: timestamp("eta"),
  schedDeparture: timestamp("sched_departure"),
  opRouteAbrv: text("op_route_abrv"),
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
  departTermAbrv: text("depart_term_abrv").notNull(),
  arrivTermID: integer("arriv_term_id"),
  arrivTermName: text("arriv_term_name"),
  arrivTermAbrv: text("arriv_term_abrv"),
  lat: real("lat").notNull(),
  lon: real("lon").notNull(),
  speed: real("speed").notNull(),
  heading: integer("heading").notNull(),
  inService: boolean("in_service").notNull(),
  atDock: boolean("at_dock").notNull(),
  leftDock: timestamp("left_dock"),
  eta: timestamp("eta"),
  schedDeparture: timestamp("sched_departure"),
  opRouteAbrv: text("op_route_abrv"),
  vesselPosNum: integer("vessel_pos_num"),
  timeStamp: timestamp("time_stamp").notNull(),
  timeFetched: timestamp("time_fetched").notNull(),
});

// export type InsertVesselLocation = typeof vesselLocationsByMinuteTable.$inferInsert;
// export type SelectVesselLocation = typeof vesselLocationsByMinuteTable.$inferSelect;
