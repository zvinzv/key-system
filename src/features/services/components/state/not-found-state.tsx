import React from "react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Icon, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
export const NotFoundState = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchX />
        </EmptyMedia>
        <EmptyTitle>لم يتم العثور على نتائج</EmptyTitle>
        <EmptyDescription>لم نجد أي خدمة تطابق بحثك</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant={"outline"}>مسح البحث</Button>
      </EmptyContent>
    </Empty>
  );
};
