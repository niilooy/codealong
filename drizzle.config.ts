import { defineConfig } from 'drizzle-kit'
import dotenv from "dotenv";
dotenv.config({
  path: ".env.local",
});
export default defineConfig({
  schema: "./src/db/schema.ts",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DRIZZLE_DB_URL!,
  }
})