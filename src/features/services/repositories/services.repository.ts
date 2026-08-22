import db from "@/db";
import { ServicesInsertType } from "../types/services.type";
import { services } from "@/db/schema";
import { eq } from "drizzle-orm";

export const findManyServicesWithTemplates = async () => {
  const data = await db.query.services.findMany({
    with: {
      templates: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return data;
};

export const insertService = async (
  data: ServicesInsertType,
  userId: string,
) => {
  await db.insert(services).values({
    ...data,
    userId,
  });
};

export const updateService = async (id: string, data: ServicesInsertType) => {
  await db.update(services).set(data).where(eq(services.id, id));
};
export const deleteServiceById = async (id: string) => {
  await db.delete(services).where(eq(services.id, id));
};
