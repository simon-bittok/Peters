import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgTable, primaryKey, text, timestamp, varchar } from "drizzle-orm/pg-core";

import { roleTable } from "./roles.ts";

export const permissionTable = pgTable("permissions", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar({ length: 255 }).unique().notNull(),
  description: text(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const roleToPermissionTable = pgTable(
  "roles_to_permissions",
  {
    roleId: text("role_id")
      .notNull()
      .references(() => roleTable.id),
    permissionId: text("permission_id")
      .notNull()
      .references(() => permissionTable.id),
    assignedAt: timestamp("assigned_at").notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.roleId, t.permissionId] })],
);

export const roleRelations = relations(roleTable, ({ many }) => ({
  roleToPermission: many(roleToPermissionTable),
}));

export const permissionRelations = relations(permissionTable, ({ many }) => ({
  roleToPermission: many(roleToPermissionTable),
}));

export const roleToPermissionRelations = relations(roleToPermissionTable, ({ one }) => ({
  role: one(roleTable, {
    fields: [roleToPermissionTable.roleId],
    references: [roleTable.id],
  }),
  permission: one(permissionTable, {
    fields: [roleToPermissionTable.permissionId],
    references: [permissionTable.id],
  }),
}));

export type PermissionModel = typeof permissionTable.$inferSelect;
export type PermissionInsertModel = typeof permissionTable.$inferInsert;
export type RolePermissionModel = typeof roleToPermissionTable.$inferSelect;
export type RolePermissionInsertModel = typeof roleToPermissionTable.$inferInsert;
