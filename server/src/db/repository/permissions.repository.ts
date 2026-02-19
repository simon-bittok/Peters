import { eq } from "drizzle-orm";

import { db } from "@/db/client.ts";
import { permissionTable } from "@/db/schema/permissions.ts";
import { EntityNotFound } from "@/errors/index.ts";

export async function fetchPermissionByName(name: string) {
  try {
    const result = await db.select().from(permissionTable).where(eq(permissionTable.name, name));

    if (result.length === 0) {
      throw new EntityNotFound(`permission with name ${name} not found`);
    }

    return result[0];
  } catch (error) {
    console.error("An error occurred when fetching permission: ", error);

    if (error instanceof Error) {
      if (error instanceof EntityNotFound) {
        throw error;
      }

      throw new Error(`Failed to fetch permission: ${error.message}`);
    }

    throw new Error("Failed to fetch permission: Unkown error");
  }
}
