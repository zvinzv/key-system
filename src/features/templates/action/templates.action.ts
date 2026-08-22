"use server";

import { getTemplates } from "../services/templates.services";

export const getTemplatesAction = async () => {
  return await getTemplates();
};
