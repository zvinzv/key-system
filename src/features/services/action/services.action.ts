"use server";

import {
  addService,
  deleteService,
  editService,
  getServices,
} from "../services/services.services";
import { ServicesInsertType } from "../types/services.type";

export const getServicesAction = async () => {
  return await getServices();
};
export const addServiceAction = async (data: ServicesInsertType) => {
  return await addService(data);
};
export const editServiceAction = async (
  id: string,
  data: ServicesInsertType,
) => {
  return await editService(id, data);
};
export const deleteServiceAction = async (id: string) => {
  return await deleteService(id);
};
