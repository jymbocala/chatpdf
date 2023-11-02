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

// Terminal commands: 
// 1. npx drizzle-kit push:pg
  // Ensure that CompilerOptions taget in the tsconfig.json file is set to "es6"
  // This command will look at our schema and make sure that our database in Neon is synced.
  
// 2. npx drizzle-kit studio
  // Ensure you have pg package installed: npm install pg
  // This command will open a browser database client. "Drizzle studio grabs your drizzle config file, connects to your database and lets you browse, add, delete and update everything based on your existing drizzle sql schema."