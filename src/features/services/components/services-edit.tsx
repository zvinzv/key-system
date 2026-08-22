import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ServicesForm } from "./services-form";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ServicesInsertType, ServicesUpdateType } from "../types/services.type";
import { useDialogStore } from "../store/dialog.store";
import { useShallow } from "zustand/react/shallow";
export const ServicesEdit = () => {
  return (
    <Dialog>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="bg-background/80 backdrop-blur-xl p-6 min-w-md w-full"
      >
        <DialogHeader className="mb-4">
          <DialogTitle dir="rtl" className="text-2xl">
            عدل خدمة
          </DialogTitle>
          <DialogDescription dir="rtl">
            الحقول التي تحوي (*) إجبارية
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
