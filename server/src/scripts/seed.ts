import { exit } from "node:process";

import db from "@/db/index.ts";
import { fetchRoleByName } from "@/db/repository/roles.repository.ts";
import * as schema from "@/db/schema/index.ts";
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
  } catch (error) {
    console.error("Error occurred during seeding ", error);
    throw error;
  }
}

if (import.meta.filename) {
  await seed();

  exit(0);
}
