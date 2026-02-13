import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { chapters } from "./chapters";

export const articles = sqliteTable("articles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  chapter_id: integer("chapter_id").notNull().references(() => chapters.id, { onDelete: 'cascade' }),
  title_ar: text("title_ar", { length: 255 }).notNull(),
  title_en: text("title_en", { length: 255 }),
  short_description: text("short_description"),
  created_at: integer("created_at", { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updated_at: integer("updated_at", { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});
