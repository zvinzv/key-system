import { Grid2x2Plus, LucideIcon, UserPlus } from "lucide-react";
import { Links } from "../sidebar";

export type SearchGroup =
  | "search"
  | "pages"
  | "actions"
  | "accounts"
  | "templates"
  | "recent";

export type SearchItem = {
  id: string;
  Icon: LucideIcon;
  title: string;
  group: SearchGroup;
  description?: string;
  href?: string;
};

const pages: SearchItem[] = Links.flatMap((group) =>
  group.links.map((link) => ({
    id: link.href,
    Icon: link.Icon,
    href: link.href,
    title: link.lable,
    group: "pages",
    description: link.description,
  })),
);
const actions: SearchItem[] = [
  {
    id: "create-account",
    Icon: UserPlus,
    title: "انشئ حساب جديد",
    group: "actions",
    description: "انشئ حساب شخصي او لفئة معينة",
  },
  {
    id: "create-template",
    Icon: Grid2x2Plus,
    title: "انشئ قالب جديد",
    group: "actions",
    description: "انشئ قالب جديد للحسابات الجديدة",
  },
];
export const searchItems: SearchItem[] = [...pages, ...actions];
