import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const slots = sqliteTable("slot", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  coach_id: text("coach_id")
    .references(() => users.id)
    .notNull(),
  student_id: text("student_id").references(() => users.id),
  start_date: int("start_date").notNull(),
  end_date: int("end_date").notNull(),
  status: text("status").default("free"),
});

export type InsertSlots = typeof slots.$inferInsert;
export type SelectSlots = typeof slots.$inferSelect;
