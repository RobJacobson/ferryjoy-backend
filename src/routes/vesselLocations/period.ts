import { Elysia, t } from "elysia";
import cron, { Patterns } from "@elysiajs/cron";
import { VesselLocation, fetchVesselLocations } from "../../wsf/vesselLocation";
import { periodHandler } from "./periodHandlers";

export const periodRoute = (period: "second" | "minute") => {
  let vesselLocations: VesselLocation[] = [];
  const { getVesselLocations, saveVesselLocations } = periodHandler(period);

  return new Elysia()
    .use(
      cron({
        name: `fetchVesselLocations ${period}`,
        pattern: period === "second" ? "*/5 * * * * *" : Patterns.everyMinute(),
        run: async () => {
          vesselLocations = await fetchVesselLocations();
          const saved = await saveVesselLocations(vesselLocations);
          if (saved.length > 0) {
            console.log(`${new Date()} VesselLocations ${period}: ${saved.length}`);
          }
        },
      })
    )
    .get("/", () => vesselLocations)
    .get("/:start/:end", ({ params: { start, end } }) => getVesselLocations(start, end), {
      params: t.Object({
        start: t.String(),
        end: t.String(),
      }),
    });
};

export default periodRoute;
