// Docs: https://orm.drizzle.team/kit-docs/overview
import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

// Note: dotenv is installed and initialized here as Next.js does not allow files from outside of the src folder to access process.env

export default {
  driver: "pg",
  schema: "./src/lib/db/schema.ts",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;

// Terminal command: npx drizzle-kit push:pg
// This command will look at our schema and make sure that our database in Neon is synced.
