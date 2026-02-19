import { exit } from "node:process";

import db from "@/db/index.ts";
import { fetchRoleByName } from "@/db/repository/roles.repository.ts";
import * as schema from "@/db/schema/index.ts";
import { permissionTable, type PermissionInsertModel } from "@/db/schema/permissions.ts";
import { auth } from "@/utils/auth.ts";

export async function seedRoles() {
  const roles: schema.RoleCreateType[] = [
    { name: "admin", description: "System administrator" },
    { name: "staff", description: "Shop staff" },
    { name: "customer", description: "Regular customer" },
  ];

  try {
    await db.insert(schema.roleTable).values(roles);

    console.log("Successfully seeded role table");
  } catch (e) {
    console.error("Error occurred during seeding roles ", e);
    throw e;
  }
}

export async function seedAdmin() {
  const adminUserParams = {
    email: "admin@example.com",
    name: "System Administrator",
    password: "ChangeMe123!",
  };

  try {
    const adminUser = await auth.api.signUpEmail({
      body: adminUserParams,
    });

    if (!adminUser.user) {
      throw new Error("Failed to create system admin!");
    }

    console.log("Successfully seeded system admin ", adminUser.user.name);

    return adminUser.user;
  } catch (e) {
    console.error("Error occurred during seeding admin user", e);
    throw e;
  }
}

export async function seedPermissions() {
  const permissions: PermissionInsertModel[] = [
    // user table permissions
    { name: "user:read", description: "view users" },
    { name: "user:create", description: "create users" },
    { name: "user:update", description: "update user details" },
    { name: "user:delete", description: "delete users" },
    { name: "user:ban", description: "ban users" },
    // create new roles
    { name: "role:read", description: "read roles" },
    { name: "role:create", description: "create roles" },
    { name: "role:update", description: "update role details" },
    { name: "role:delete", description: "delete roles" },
    { name: "role:assign", description: "assign roles to users" },
    // set new permissions
    { name: "permission:read", description: "read permission" },
    { name: "permission:create", description: "create permission" },
    { name: "permission:update", description: "update permission details" },
    { name: "permission:delete", description: "delete permission" },
    { name: "permission:assign", description: "assign permissions to roles" },
    // continue
  ];

  try {
    await db.insert(permissionTable).values(permissions);

    console.log("Successfully seeded permissions table");
  } catch (e) {
    console.error("Error occurred during seeding permissions ", e);
    throw e;
  }
}

export async function seed() {
  try {
    await seedRoles();

    const adminUser = await seedAdmin();

    const adminRole = await fetchRoleByName("admin");

    const userRole: schema.UserRoleCreateType = {
      userId: adminUser.id,
      roleId: adminRole.id,
    };

    await db.insert(schema.userToRoleTable).values(userRole);

    console.log("Successfully created administrator");

    await seedPermissions();
  } catch (error) {
    console.error("Error occurred during seeding ", error);
    throw error;
  }
}

if (import.meta.filename) {
  await seed();

  exit(0);
}
