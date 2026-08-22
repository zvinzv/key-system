import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getTemplatesAction } from "../action/templates.action";
import { Button } from "@/components/ui/button";
import { ar } from "date-fns/locale";
setDefaultOptions({ locale: ar });
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Asterisk,
  Calendar,
  ChevronLeft,
  Clock,
  EditIcon,
  EllipsisVertical,
  Eye,
  EyeOff,
  List,
  Rss,
  Trash,
  User2,
} from "lucide-react";
import { format, setDefaultOptions } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Vortex } from "@/components/ui/vortex";
import Link from "next/link";
export const TemplatesList = () => {
  const { data } = useQuery({
    queryFn: async () => await getTemplatesAction(),
    queryKey: ["templates"],
  });
  console.log(data);
  return (
    <div>
      {data && (
        <>
          {data.map((e) => (
            <Card className="bg-primary/5 backdrop-blur-md" key={e.id}>
              <CardHeader className="">
                {/* <section>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <EllipsisVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </section> */}
                <section className="flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-4 items-center">
                    <Avatar className="size-12">
                      <AvatarImage src={e.service.icon || "/no-image.jpg"} />
                      <AvatarFallback></AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-2xl">{e.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {e.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4">
                    <Card key={"Users Card"} className="p-2 pl-6 bg-primary/5">
                      <CardContent className="p-0 flex  gap-2.5 items-center ">
                        <User2 className="bg-primary/30 text-primary size-8 p-1 rounded-md" />

                        <div className="flex flex-row items-baseline-last gap-1">
                          <span className="text-3xl">
                            {e.credentials.length}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            حساب
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card key={"Inputs Card"} className="p-2 pl-6 bg-primary/5">
                      <CardContent className="p-0 flex  gap-2.5 items-center ">
                        <List className="bg-primary/30 text-primary size-8 p-1.5 rounded-md" />

                        <div className="flex flex-row items-baseline-last gap-1">
                          <span className="text-3xl">{e.inputs.length}</span>
                          <span className="text-xs text-muted-foreground">
                            حقل/حقول
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <div className="flex justify-between gap-3 text-muted-foreground">
                  <div className="flex gap-2 items-center">
                    <div className="rounded-full h-6 p-1 pl-2 gap-2 flex flex-row items-center">
                      <Calendar className="size-4" />
                      <span>
                        {" "}
                        {e.updatedAt.toLocaleDateString("ar-us", {
                          year: "numeric",
                          month: "long",
                          day: "2-digit",
                        })}
                      </span>
                    </div>
                    <span>|</span>
                    <div className="rounded-full h-6 p-1 pl-2 gap-2 flex flex-row items-center">
                      <Clock className="size-4" />
                      <span> {format(e.updatedAt, "hh:mm aaaa")}</span>
                    </div>
                  </div>
                  <Link
                    href={"/services/" + e.serviceId}
                    className="rounded-full h-6 p-1 gap-2 flex  items-center text-primary hover:underline"
                  >
                    <span>{e.service.name}</span>
                    <Rss className="size-4" />
                  </Link>
                </div>

                <div id="Fields">
                  <h1 className="relative overflow-hidden z-10  pr-2">
                    <span className="absolute top-0 right-0 w-0.5 h-full bg-primary " />
                    الحقول المطلوبة
                  </h1>
                  <Card className="p-1 mt-4 bg-primary/[0.025]">
                    <CardContent className="p-0 space-y-2">
                      {e.inputs.map((input, index) => (
                        <React.Fragment key={input.id}>
                          <div className="hover:bg-primary/5 transition-colors p-2 rounded-lg flex flex-row justify-between items-center">
                            <section className="flex flex-row items-center gap-4">
                              <div className="bg-primary/10 text-primary size-8 rounded-md text-lg flex items-center justify-center">
                                <span>{(input.sortOrder ?? 0) + 1}</span>
                              </div>
                              <div className="flex flex-col items-start">
                                <h1 className="font-semibold text-base leading-4">
                                  {input.name}
                                </h1>
                                <p className="font-mono text-muted-foreground  py-0.5 rounded-sm text-xs">
                                  {input.type}
                                </p>
                              </div>
                            </section>
                            <section className="flex flex-row items-center gap-4">
                              <div>
                                {input.required ? (
                                  <p className="px-2 py-0.5 bg-emerald-400/30 text-emerald-400 rounded-sm">
                                    مطلوب
                                  </p>
                                ) : (
                                  <p className="px-2 py-0.5 bg-gray-400/30 text-gray-300 rounded-sm">
                                    غير مطلوب
                                  </p>
                                )}
                              </div>
                              {input.isSecret && (
                                <div>
                                  <Asterisk className="bg-amber-500/40 size-5 text-amber-500 rounded-sm" />
                                </div>
                              )}
                              {/* <div>
                                {input.isSecret ? (
                                  <EyeOff className="bg-purple-500/20 size-6 p-1 text-purple-400 rounded-sm" />
                                ) : (
                                  <Eye className="bg-purple-500/20 size-6 p-1 text-purple-400 rounded-sm" />
                                )}
                              </div> */}
                            </section>
                          </div>
                          {e.inputs.length - (index + 1) != 0 && (
                            <div className="px-2">
                              <Separator />
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <div id="Accounts">
                  <h1 className="relative overflow-hidden z-10  pr-2">
                    {/* <Vortex
                      baseSpeed={0.01}
                      rangeSpeed={0.05}
                      backgroundColor="transparent"
                      baseHue={170}
                      containerClassName="opacity-20 -z-10"
                    /> */}
                    <span className="absolute top-0 right-0 w-0.5 h-full bg-primary " />
                    الحسابات المرتبطة ({e.credentials.length})
                  </h1>
                  {e.credentials.map((credential, index) => (
                    <Link
                      key={credential.id}
                      href={"/accounts/" + credential.id}
                    >
                      <Card className="p-1 mt-4 bg-primary/[0.025] hover:bg-primary/5 transition-colors">
                        <CardContent className="p-0">
                          <div className="p-2 rounded-md flex flex-row justify-between items-center">
                            <section className="flex flex-row items-center gap-4">
                              <div className="bg-primary/10 text-primary size-10 rounded-md text-lg flex items-center justify-center">
                                <User2 />
                              </div>
                              <div className="flex flex-col items-start">
                                <h1 className="font-semibold text-base leading-5">
                                  {credential.name}
                                </h1>
                                <p className=" text-muted-foreground  py-0.5 rounded-sm text-xs font-light">
                                  {credential.description}
                                </p>
                              </div>
                            </section>
                            <section className="flex flex-row items-center gap-4">
                              {credential.createdAt && (
                                <div className="flex gap-2 items-center text-muted-foreground">
                                  <Calendar className="size-7 " />
                                  <div>
                                    <h1 className="text-[10px]">
                                      تاريخ الانشاء
                                    </h1>
                                    <p className="text-sm">
                                      {format(
                                        credential.createdAt,
                                        "yyyy MMMM dd",
                                      )}
                                    </p>
                                  </div>
                                </div>
                              )}
                              <div>
                                <ChevronLeft className="text-muted-foreground" />
                              </div>
                            </section>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="bg-primary/[0.025]  flex gap-2 items-center">
                <Button disabled variant={"outline"}>
                  <EditIcon />
                  تعديل القالب
                </Button>
                <Button disabled variant={"destructive"}>
                  <Trash />
                  حذف القالب
                </Button>
              </CardFooter>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};
