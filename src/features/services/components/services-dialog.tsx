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
import { ServicesInsertType } from "../types/services.type";
import { useDialogStore } from "../store/dialog.store";
import { useShallow } from "zustand/react/shallow";
export const ServicesInsert = () => {
  const { isOpen, open, dialog, close } = useDialogStore(
    useShallow((state) => ({
      open: state.open,
      isOpen: state.isOpen,
      dialog: state.dialog,
      close: state.close,
    })),
  );
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent
        showCloseButton={false}
        className="bg-background/80 backdrop-blur-xl p-6 min-w-md w-full"
      >
        <DialogHeader className="mb-4">
          <DialogTitle dir="rtl" className="text-2xl">
            {dialog.mode === "create" ? "إضافة خدمة جديدة" : "عدل خدمة"}
          </DialogTitle>
          <DialogDescription dir="rtl">
            الحقول التي تحوي (*) إجبارية
          </DialogDescription>
        </DialogHeader>
        {dialog.mode === "create" ? (
          <ServicesForm mode="create" />
        ) : (
          <ServicesForm mode="edit" service={dialog.service} />
        )}
      </DialogContent>
    </Dialog>
  );
};
