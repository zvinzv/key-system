"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { RefObject, MutableRefObject } from "react";
import { SearchItem } from "./global-search-data";
import { useRouter } from "next/navigation";

// type GlobalSearchContextType = {
//   inputRef: RefObject<HTMLInputElement | null>;
//   itemRefs: RefObject<(HTMLDivElement | null)[]>;

//   activeIndex: number;
//   setActiveIndex: React.Dispatch<React.SetStateAction<number>>;

//   inputValue: string;
//   setInputValue: React.Dispatch<React.SetStateAction<string>>;

//   searchResults: Item[];
//   setSearchResults: React.Dispatch<React.SetStateAction<Item[]>>;
//   open: boolean;
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;

//   onKeyDown: React.KeyboardEventHandler<HTMLDivElement>;

//   navigationItems: Item[];
//   navigationSource: React.RefObject<"keyboard" | "mouse">;
//   handleSelect: () => void;
// };

type GlobalSearchContextType = {
  open: boolean;
  inputValue: string;

  activeId: string | null;

  inputRef: React.RefObject<HTMLInputElement | null>;
  itemRefs: React.RefObject<Record<string, HTMLDivElement | null>>;

  navigationSource: React.RefObject<"keyboard" | "mouse">;

  recentIds: string[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>;

  setItems: (items: SearchItem[]) => void;

  moveNext: () => void;
  movePrevious: () => void;
  handleSelect: () => void;

  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;

  addToRecent: (id: string) => void;
};

const GlobalSearchContext = createContext<GlobalSearchContextType | null>(null);

export function GlobalSearchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [items, setItemsState] = useState<SearchItem[]>([]);
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const navigationSource = useRef<"keyboard" | "mouse">("mouse");

  const setItems = (items: SearchItem[]) => {
    setItemsState(items);
  };

  const moveNext = () => {
    if (!items.length) return;

    const currentIndex = items.findIndex(
      (item) => `${item.group}-${item.id}` === activeId,
    );

    const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;

    setActiveId(`${items[nextIndex].group}-${items[nextIndex].id}`);
  };

  const movePrevious = () => {
    if (!items.length) return;

    const currentIndex = items.findIndex(
      (item) => `${item.group}-${item.id}` === activeId,
    );

    const previousIndex =
      currentIndex > 0 ? currentIndex - 1 : items.length - 1;

    setActiveId(`${items[previousIndex].group}-${items[previousIndex].id}`);
  };
  const addToRecent = (id: string) => {
    setRecentIds((prev) => {
      const next = [id, ...prev.filter((item) => item !== id)].slice(0, 3);

      localStorage.setItem("global-search-recent", JSON.stringify(next));

      return next;
    });
  };
  const handleSelect = () => {
    const selected = items.find(
      (item) => `${item.group}-${item.id}` === activeId,
    );

    if (!selected) return;
    addToRecent(selected.id);
    setOpen(false);
    inputRef.current?.blur();
    if (selected.href) {
      router.push(selected.href);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      navigationSource.current = "keyboard";
      moveNext();
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      navigationSource.current = "keyboard";
      movePrevious();
    }

    if (e.key === "Escape") {
      navigationSource.current = "keyboard";
      setOpen(false);
    }

    if (e.key === "Enter") {
      e.preventDefault();
      navigationSource.current = "keyboard";
      handleSelect();
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("global-search-recent");

    if (!stored) return;

    try {
      setRecentIds(JSON.parse(stored));
    } catch {
      localStorage.removeItem("global-search-recent");
    }
  }, []);
  return (
    <GlobalSearchContext.Provider
      value={{
        open,
        inputValue,
        activeId,

        inputRef,
        itemRefs,
        navigationSource,

        recentIds,

        setOpen,
        setInputValue,
        setActiveId,

        setItems,

        moveNext,
        movePrevious,
        handleSelect,

        onKeyDown,

        addToRecent,
      }}
    >
      {children}
    </GlobalSearchContext.Provider>
  );
}

export function useGlobalSearch() {
  const context = useContext(GlobalSearchContext);

  if (!context) {
    throw new Error("useGlobalSearch must be used inside GlobalSearchProvider");
  }

  return context;
}
