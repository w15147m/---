import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { articles } from "./articles";

export const items = sqliteTable("items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  article_id: integer("article_id").notNull().references(() => articles.id, { onDelete: 'cascade' }),
  sequence_order: integer("sequence_order").notNull(),
  arabic_text: text("arabic_text"),
  urdu_translation: text("urdu_translation"),
  english_translation: text("english_translation"),
  instruction: text("instruction"),
  created_at: integer("created_at", { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updated_at: integer("updated_at", { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});
