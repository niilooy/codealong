import { pgTable, text } from "drizzle-orm/pg-core";

export const testing = pgTable("testimg", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
});
