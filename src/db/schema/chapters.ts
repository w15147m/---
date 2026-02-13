import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const chapters = sqliteTable("chapters", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  parent_id: integer("parent_id").references((): any => chapters.id, { onDelete: 'cascade' }),
  name: text("name", { length: 255 }).notNull(),
  thumbnail_url: text("thumbnail_url", { length: 255 }),
  created_at: integer("created_at", { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updated_at: integer("updated_at", { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});
