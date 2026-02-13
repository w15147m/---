import { sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { articles } from "./articles";
import { events } from "./events";

export const article_event = sqliteTable("article_event", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  article_id: integer("article_id").notNull().references(() => articles.id, { onDelete: 'cascade' }),
  event_id: integer("event_id").notNull().references(() => events.id, { onDelete: 'cascade' }),
  created_at: integer("created_at", { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updated_at: integer("updated_at", { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});
