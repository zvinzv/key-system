import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpLeft, CornerDownLeft, LucideIcon } from "lucide-react";
import React from "react";
import { useGlobalSearch } from "./global-search-context";
import { SearchItem } from "./global-search-data";
export const GlobalSearchCard = ({ item }: { item: SearchItem }) => {
  const { activeId, navigationSource, setActiveId, handleSelect, itemRefs } =
    useGlobalSearch();
  const id = `${item.group}-${item.id}`;
  const isActive = activeId === id;
  return (
    <div
      ref={(el) => {
        itemRefs.current[id] = el;
      }}
      className={cn(
        "flex h-14 cursor-pointer items-center rounded-md px-2 transition-colors",
        isActive && "bg-foreground/5 text-accent-foreground",
      )}
      onMouseEnter={() => {
        navigationSource.current = "mouse";

        setActiveId(id);
      }}
      onClick={() => {
        setActiveId(id);
        handleSelect();
      }}
    >
      <Button
        size={"icon-lg"}
        className="size-10 ml-2 pointer-events-none"
        variant={"outline"}
      >
        <item.Icon className="size-5" />
      </Button>
      <div>
        <h1 className="text-lg">{item.title}</h1>
        <h1 className="text-xs text-muted-foreground">{item.description}</h1>
      </div>
      <div
        className={cn(
          "mr-auto text-accent transition-colors p-2",
          isActive && " text-foreground",
        )}
      >
        {item.group === "pages" && <ArrowUpLeft />}
        {item.group === "actions" && <CornerDownLeft />}
      </div>
    </div>
  );
};
