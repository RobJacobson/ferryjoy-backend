import { db } from "../../db/db";
import { VesselLocation } from "../../wsf/vesselLocation";
import { vesselLocationsBySecondTable, vesselLocationsByMinuteTable } from "../../db/schema";
import { and, gte, lt } from "drizzle-orm";

// await db.delete(vesselLocationsBySecondTable);
// await db.delete(vesselLocationsByMinuteTable);

const prevLocations = <Record<number, VesselLocation>>{};

const newVesselLocations = (currLocations: VesselLocation[]) => {
  return currLocations.filter((curr) => {
    const prev = prevLocations[curr.vesselID];
    const isNew = !prev || curr.timeStamp > prev.timeStamp;
    prevLocations[curr.vesselID] = isNew ? curr : prev;
    return isNew;
  });
};

export const saveVesselLocationBySecond = async (locations: VesselLocation[]) => {
  const filteredLocations = newVesselLocations(locations);
  if (filteredLocations.length === 0) {
    return [];
  }
  return await db.insert(vesselLocationsBySecondTable).values(filteredLocations).returning();
};

export const saveVesselLocationByMinute = async (locations: VesselLocation[]) => {
  if (locations.length === 0) {
    return [];
  }
  const results = await db
    .insert(vesselLocationsByMinuteTable)
    .values(locations.map(toJSON))
    .returning();
  // results.forEach(console.log);
  return results;
};

export const getVesselLocationsBySecond = async (start: string, end: string) => {
  return await db.select().from(vesselLocationsBySecondTable);
};

export const getVesselLocationsByMinute = async (start: string, end: string) => {
  console.log("minute");
  return await db
    .select()
    .from(vesselLocationsByMinuteTable)
    .where(
      and(
        gte(vesselLocationsByMinuteTable.timeFetched, new Date(start)),
        lt(vesselLocationsByMinuteTable.timeFetched, new Date(end))
      )
    );
};

const toJSON = (vl: VesselLocation) => JSON.parse(JSON.stringify(vl));
