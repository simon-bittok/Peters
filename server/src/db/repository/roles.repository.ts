import { eq } from "drizzle-orm";

import db from "@/db/index.ts";
import { roleTable } from "@/db/schema/roles.ts";
import { EntityNotFound } from "@/errors/index.ts";

export async function fetchRoleByName(name: "admin" | "staff" | "customer") {
  try {
    const result = await db.select().from(roleTable).where(eq(roleTable.name, name));

    if (result.length === 0) {
      throw new EntityNotFound(`Role with name ${name} not found`);
    }

    return result[0];
  } catch (error) {
    console.error("An error occurred when fetching role: ", error);

    if (error instanceof Error) {
      if (error instanceof EntityNotFound) {
        throw error;
      }

      throw new Error(`Failed to fetch role: ${error.message}`);
    }

    throw new Error("Failed to fetch role: Unkown error");
  }
}
