import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgTable, primaryKey, text, timestamp, varchar } from "drizzle-orm/pg-core";

import { user } from "./auth.ts";

export const roleTable = pgTable("roles", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar({ length: 50 }).unique().notNull(),
  description: text(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const userToRoleTable = pgTable(
  "user_to_roles",
  {
    userId: text("user_id")
      .references(() => user.id, { onDelete: "cascade" })
      .notNull(),
    roleId: text("role_id")
      .references(() => roleTable.id, { onDelete: "cascade" })
      .notNull(),
    assignedAt: timestamp("assigned_at").notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.roleId] })],
);

export const userRelations = relations(user, ({ many }) => ({
  userToRole: many(userToRoleTable),
}));

export const roleRelations = relations(roleTable, ({ many }) => ({
  userToRole: many(userToRoleTable),
}));

export const userToRoleRelations = relations(userToRoleTable, ({ one }) => ({
  user: one(user, {
    fields: [userToRoleTable.userId],
    references: [user.id],
  }),
  role: one(roleTable, {
    fields: [userToRoleTable.roleId],
    references: [roleTable.id],
  }),
}));

export type RoleType = typeof roleTable.$inferSelect;
export type RoleCreateType = typeof roleTable.$inferInsert;
export type UserRoleType = typeof userToRoleTable.$inferSelect;
export type UserRoleCreateType = typeof userToRoleTable.$inferInsert;
