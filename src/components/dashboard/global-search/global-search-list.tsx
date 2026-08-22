"use client";

import React, { useEffect, useMemo } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";

import { useGlobalSearch } from "./global-search-context";

import { GlobalSearchCard } from "./global-search-card";

import type { SearchItem } from "./global-search-data";

type Props = {
  items: SearchItem[];
};

export function GlobalSearchList({ items }: Props) {
  const { activeId, itemRefs, navigationSource, setItems } = useGlobalSearch();

  useEffect(() => {
    setItems(items);
  }, [items, setItems]);

  useEffect(() => {
    if (navigationSource.current !== "keyboard") {
      return;
    }

    if (!activeId) return;

    itemRefs.current[activeId]?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [activeId, itemRefs, navigationSource]);

  const groups = useMemo(() => {
    const groupMap = new Map<string, SearchItem[]>();

    for (const item of items) {
      const existing = groupMap.get(item.group) ?? [];

      existing.push(item);

      groupMap.set(item.group, existing);
    }

    return [
      {
        id: "search",
        title: "البحث",
        items: groupMap.get("search") ?? [],
      },
      {
        id: "recent",
        title: "الأخيرة",
        items: groupMap.get("recent") ?? [],
      },
      {
        id: "actions",
        title: "الإجراءات",
        items: groupMap.get("actions") ?? [],
      },
      {
        id: "pages",
        title: "الصفحات",
        items: groupMap.get("pages") ?? [],
      },
      {
        id: "accounts",
        title: "الحسابات",
        items: groupMap.get("accounts") ?? [],
      },
      {
        id: "templates",
        title: "القوالب",
        items: groupMap.get("templates") ?? [],
      },
    ].filter((group) => group.items.length > 0);
  }, [items]);

  return (
    <div className="flex flex-col py-1">
      <ScrollArea dir="rtl" className="h-80 p-3 scroll-py-4">
        <div className="space-y-2">
          {groups.map((group) => (
            <div key={group.id}>
              <h1 className="text-muted-foreground mr-2">{group.title}</h1>

              {group.items.map((item) => (
                <GlobalSearchCard key={`${group.id}-${item.id}`} item={item} />
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
