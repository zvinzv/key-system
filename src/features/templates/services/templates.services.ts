import { findManyTemplates } from "../repositories/templates.repository";

export const getTemplates = async () => {
  return await findManyTemplates();
};
