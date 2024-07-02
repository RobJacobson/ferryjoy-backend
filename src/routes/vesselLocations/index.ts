import { Elysia, t } from "elysia";

import { VesselLocation, fetchVesselLocations } from "../../wsf/vesselLocation";
import { periodRoute } from "./period";

const vesselLocationsByMinuteRoute = periodRoute("minute");
const vesselLocationsBySecondRoute = periodRoute("second");

let currentVesselLocations: VesselLocation[] = [];

// localhost:3000/api/vessellocations
const vesselLocationsRoute = new Elysia({ prefix: "/vessellocations" })
  .get("/", () => fetchVesselLocations())
  .group("/minute", (app) => app.use(vesselLocationsByMinuteRoute))
  .group("/second", (app) => app.use(vesselLocationsBySecondRoute));

export default vesselLocationsRoute;

// Dummy comment to trigger rebuild
