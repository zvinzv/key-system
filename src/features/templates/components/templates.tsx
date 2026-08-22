"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TemplatesList } from "./templates-list";

export const Templates = () => {
  return (
    <div className="max-w-4xl space-y-6">
      <header className="flex flex-col gap-8">
        <section className="flex items-baseline-last justify-between">
          <div>
            <h1 className="text-3xl font-semibold">القوالب</h1>
            <h2 className="text-base text-foreground/50 font-light">
              إدارة القوالب والحقول الخاصه بها
            </h2>
          </div>
          <div>
            <Button className="cursor-pointer">
              <Plus />
              انشئ قالب
            </Button>
          </div>
        </section>
      </header>
      <TemplatesList />
    </div>
  );
};
