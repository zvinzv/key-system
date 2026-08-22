import { auth } from "@/lib/auth";
import {
  deleteServiceById,
  findManyServicesWithTemplates,
  insertService,
  updateService,
} from "../repositories/services.repository";
import { ServicesInsertType } from "../types/services.type";
import { headers } from "next/headers";

export const getServices = async () => {
  return await findManyServicesWithTemplates();
};
export const addService = async (data: ServicesInsertType) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.session) {
    throw new Error("403");
  }
  return await insertService(data, session.user.id);
};
export const editService = async (id: string, data: ServicesInsertType) => {
  return await updateService(id, data);
};
export const deleteService = async (id: string) => {
  return await deleteServiceById(id);
};
