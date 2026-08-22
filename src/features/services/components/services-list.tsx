"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  EllipsisVertical,
  File,
  Grid2X2,
  PenBox,
  Search,
  ImageIcon,
  Trash,
  ImageOff,
} from "lucide-react";
import Image from "next/image";
import {
  deleteServiceAction,
  getServicesAction,
} from "../action/services.action";
import { isValidUrl } from "../util/valid-url";
import { useDialogStore } from "../store/dialog.store";
import { useShallow } from "zustand/react/shallow";
import { ServicesInsert } from "./services-dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useState } from "react";
import { NotFoundState } from "./state/not-found-state";
import { ServicesDeleteAlert } from "./services-delete-alert";

export const ServicesList = () => {
  const [search, setSearch] = useState<string>("");
  const { data, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: () => getServicesAction(),
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteServiceAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
  const services = data ?? [];

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(search.toLowerCase()),
  );
  const { isOpen, open } = useDialogStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
      open: state.open,
    })),
  );
  const emptyFilter =
    !isLoading &&
    services.length > 0 &&
    filteredServices.length == 0 &&
    search.length > 0;
  return (
    <section className="mt-4 flex flex-col gap-2 relative">
      <InputGroup className="h-10 p-1.5">
        <InputGroupInput
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="ابحث عن خدمة..."
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
      {emptyFilter && <NotFoundState />}
      {filteredServices.map((e) => (
        <Card
          key={e.id}
          className="p-3 rounded-md bg-background/50 backdrop-blur-md hover:bg-foreground/5 transition-colors"
        >
          <CardContent className="flex justify-between p-0 ">
            {/* <div className="size-40 blur-xl opacity-5 absolute bg-blue-500 bottom-0 right-0 scale-[5] " /> */}
            <section className="flex gap-2 items-center">
              <div>
                {e.icon && isValidUrl(e.icon) ? (
                  <Image
                    src={e.icon}
                    alt="Logo"
                    width={512}
                    height={512}
                    className="rounded-sm size-8"
                  />
                ) : (
                  <ImageOff
                    size={32}
                    className="bg-foreground/25 rounded-sm p-1"
                  />
                )}
              </div>
              <div>
                <h1 className="text-base leading-4">{e.name}</h1>
                <h2 className="text-xs text-foreground/50">{e.slug}</h2>
              </div>
            </section>
            <section className="flex gap-8">
              <div className="flex gap-2 items-center text-base text-foreground/50">
                <File className="size-5" />
                {e.templates.length} قالب
              </div>
              <div>
                <DropdownMenu dir="rtl">
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size={"icon"}
                      className="rounded-md"
                    >
                      <EllipsisVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-background/50 backdrop-blur-lg rounded-md  "
                  >
                    <DropdownMenuLabel className="text-sm py-0">
                      العمليات
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() =>
                        open({
                          mode: "edit",
                          service: {
                            id: e.id,
                            name: e.name,
                            slug: e.slug,
                            icon: e.icon || undefined,
                          },
                        })
                      }
                      className="text-sm cursor-pointer"
                    >
                      <PenBox />
                      تعديل
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-sm cursor-pointer">
                      <Grid2X2 />
                      القوالب المرتبطة
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <ServicesDeleteAlert action={() => mutation.mutate(e.id)}>
                      <DropdownMenuItem
                        variant="destructive"
                        onSelect={(e) => e.preventDefault()}
                        className="text-sm cursor-pointer"
                      >
                        <Trash />
                        حذف
                      </DropdownMenuItem>
                    </ServicesDeleteAlert>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </section>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};
