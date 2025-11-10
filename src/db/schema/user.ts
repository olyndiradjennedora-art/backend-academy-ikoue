import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable ("user_table", {
  user_id: text().primaryKey(),
  user_nom: text().notNull(),
  user_prenom: text().notNull(),
  user_email: text().notNull().unique(),
  user_password: text().notNull(),
  user_role: text().notNull(),
  created_at: text().default("active"),
});