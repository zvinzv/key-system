"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  EllipsisVertical,
  File,
  Grid2X2,
  PenBox,
  Plus,
  Search,
  Trash,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import db from "@/db";
import { services } from "@/db/schema";
import { ServicesList } from "./services-list";
import { ServicesInsert } from "./services-dialog";
import { useDialogStore } from "../store/dialog.store";
import { useShallow } from "zustand/react/shallow";

export const Services = () => {
  const { open } = useDialogStore(
    useShallow((state) => ({
      open: state.open,
    })),
  );
  return (
    <div className="max-w-4xl">
      <ServicesInsert />

      <header className="flex flex-col gap-8">
        <section className="flex items-baseline-last justify-between">
          <div>
            <h1 className="text-3xl font-semibold">الخدمات</h1>
            <h2 className="text-base text-foreground/50 font-light">
              إدارة الخدمات والقوالب المرتبطة بها
            </h2>
          </div>
          <div>
            <Button
              onClick={() => open({ mode: "create" })}
              className=" cursor-pointer"
            >
              <Plus />
              اضف خدمة
            </Button>
          </div>
        </section>
      </header>
      <ServicesList />
    </div>
  );
};
