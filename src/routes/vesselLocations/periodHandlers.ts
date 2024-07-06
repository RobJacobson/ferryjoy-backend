import { db } from "../../db/db";
import { VesselLocation } from "../../wsf/vesselLocation";
import { vesselLocationsBySecondTable, vesselLocationsByMinuteTable } from "../../db/schema";
import { between } from "drizzle-orm";

// await db.delete(vesselLocationsByMinuteTable);

export const periodHandler = (period: "second" | "minute") => {
  const prevLocations = <Record<number, VesselLocation>>{};
  const table = period === "second" ? vesselLocationsBySecondTable : vesselLocationsByMinuteTable;

  const isNew = (currLocation: VesselLocation) => {
    const prevLocation = prevLocations[currLocation.vesselID];
    const result = !prevLocation || currLocation.timeStamp > prevLocation.timeStamp;
    prevLocations[currLocation.vesselID] = result ? currLocation : prevLocation;
    return result;
  };

  const dedupe = (currLocations: VesselLocation[]) => currLocations.filter(isNew);

  const saveVesselLocations = (locations: VesselLocation[]) => {
    const dedupedLocations = period === "second" ? dedupe(locations) : locations;
    if (dedupedLocations.length === 0) {
      return [];
    }
    return db.insert(table).values(dedupedLocations).returning();
  };

  const getVesselLocations = (start: string, end: string) => {
    return db
      .select()
      .from(table)
      .where(between(table.timeFetched, new Date(start), new Date(end)));
  };

  return {
    saveVesselLocations,
    getVesselLocations,
  };
};
