import db from "@/db";
import { not } from "drizzle-orm";

export const findManyTemplates = async () => {
  return await db.query.templates.findMany({
    with: {
      inputs: {
        orderBy: {
          sortOrder: "asc",
        },
      },
      credentials: true,
      service: true,
    },
    where: {
      deletedAt: {
        isNull: true,
      },
    },
  });
};
