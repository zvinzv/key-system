import * as z from "zod";

const ServicesSchema = z.object({
  name: z.string(),
  slug: z.string(),
  icon: z.string().optional(),
});
export { ServicesSchema };
