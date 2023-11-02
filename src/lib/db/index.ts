//  Docs: https://orm.drizzle.team/docs/quick-postgresql/neon
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from 'drizzle-orm/neon-http';


neonConfig.fetchConnectionCache = true;

// const result = await db.select().from(...);

// Check if database url exists
if (!process.env.DATABASE_URL) {
  throw new Error("database url not found");
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql);


// TODO: need a schema (defines the shape of the database)