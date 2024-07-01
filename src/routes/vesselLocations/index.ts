import { Elysia, t } from "elysia";
import {
  saveVesselLocationByMinute,
  saveVesselLocationBySecond,
  getVesselLocationsByMinute,
  getVesselLocationsBySecond,
} from "./handlers";
import cron, { Patterns } from "@elysiajs/cron";
import { VesselLocation, fetchVesselLocations } from "../../wsf/vesselLocation";

let currentVesselLocations: VesselLocation[] = [];

// localhost:3000/api/vessellocations
const vesselLocationsRoute = new Elysia({ prefix: "/vessellocations" })
  .use(
    cron({
      name: "fetchVesselLocationsBySecond",
      pattern: Patterns.everySecond(),
      run: async () => {
        currentVesselLocations = await fetchVesselLocations();
        const saved = await saveVesselLocationBySecond(currentVesselLocations);
        console.log(saved.length);
      },
    })
  )
  // .use(
  //   cron({
  //     name: "fetchVesselLocationsByMinute",
  //     pattern: Patterns.everyMinute(),
  //     run: () =>
  //       fetchVesselLocations().then((response) => {
  //         saveVesselLocationByMinute(response);
  //       }),
  //   })
  // )
  .get("/", () => currentVesselLocations)
  .get(
    "/minute/:start/:end",
    ({ params: { start, end } }) => getVesselLocationsByMinute(start, end),
    {
      params: t.Object({
        start: t.String(),
        end: t.String(),
      }),
    }
  )
  .get(
    "/second/:start/:end",
    ({ params: { start, end } }) => getVesselLocationsBySecond(start, end),
    {
      params: t.Object({
        start: t.String(),
        end: t.String(),
      }),
    }
  );

export default vesselLocationsRoute;
