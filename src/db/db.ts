import { Pool } from "pg";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("Database credentials missing.");
}

const client = new Pool({ connectionString: process.env.DATABASE_URL });

export const db: NodePgDatabase<typeof schema> = drizzle(client, { schema });
