import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import vesselLocationsRoute from "./routes/vesselLocations/index";

const app = new Elysia()
  .use(swagger())
  .group("/api", (app) => app.use(vesselLocationsRoute))
  .listen(process.env.PORT ?? 3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
