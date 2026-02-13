import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const events = sqliteTable("events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name", { length: 255 }).notNull(),
  details: text("details"),
  created_at: integer("created_at", { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updated_at: integer("updated_at", { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});
