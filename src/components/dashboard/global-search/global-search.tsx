"use client";

import {
  ArrowDown,
  ArrowUp,
  CornerDownLeft,
  Grid2x2Plus,
  UserPlus,
} from "lucide-react";
import { Button } from "../../ui/button";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { Separator } from "../../ui/separator";
import { Links } from "../sidebar";
import { useGlobalSearch } from "./global-search-context";
import { SearchItem, searchItems } from "./global-search-data";
import InputGroupComponent from "./global-search-input";
import { GlobalSearchList } from "./global-search-list";
import Footer from "./global-search-footer";

export default function GlobalSearch() {
  const { open, setOpen, onKeyDown, inputRef, recentIds } = useGlobalSearch();
  const recentItems = recentIds
    .map((id) => searchItems.find((item) => item.id === id))
    .filter((item): item is SearchItem => Boolean(item));
  const items = [
    ...recentItems.map((item) => ({
      ...item,
      group: "recent" as const,
    })),

    ...searchItems,
  ];
  return (
    <div className="max-w-4xl">
      <InputGroupComponent />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverAnchor className="w-full"></PopoverAnchor>
        <PopoverContent
          onKeyDown={onKeyDown}
          side="bottom"
          alignOffset={0}
          sideOffset={8}
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => {
            if (inputRef.current?.contains(e.target as Node)) {
              e.preventDefault();
            }
          }}
          className="overflow-hidden flex justify-between w-[var(--radix-popover-trigger-width)] min-h-96 bg-foreground/5 backdrop-blur-xl p-0"
        >
          <GlobalSearchList items={items} />
          <div>
            <Separator className="" />
            <Footer />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
