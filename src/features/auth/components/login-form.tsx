"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import LoginFormSchema from "../schema/login.schema";
import { LoginFormType } from "../types/login.type";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bug, Check, CircleX, Lock, ShieldClose, User2 } from "lucide-react";

import { loginAction } from "../action/login.action";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useMutation } from "@tanstack/react-query";
import { sendReport } from "../action/report.action";
import { ReportType } from "../types/report.type";
import { toast } from "sonner";
import SignInButton from "./sign-in-button";
import { sleep } from "@/util/sleep";
export default function LoginForm() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();
  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "samer",
      password: "",
      rememberMe: false,
    },
  });
  const mutation = useMutation({
    mutationFn: async (data: ReportType) => {
      await sendReport(data);
    },
    onSuccess: () => {
      toast.success("Report send successfuly", {
        style: {
          height: "2.5rem",
        },
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        style: {
          height: "2.5rem",
        },
      });
    },
  });
  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormType) => {
      const loginData = await loginAction(data);

      if (!loginData?.success) {
        throw new Error(loginData?.massage);
      }
    },
    onSuccess: () => {
      router.replace("/");
    },
    onError: (error) => {
      form.setError("root", { message: error.message });
    },
  });
  async function onSubmit(data: LoginFormType) {
    mutation.reset();
    loginMutation.mutate(data);
  }
  const loadingState = loginMutation.isPending;
  return (
    <Card className="w-full  sm:max-w-md h-full sca">
      <CardHeader>
        <CardTitle className="">تسجيل الدخول</CardTitle>
        <CardDescription className="">
          ادخل بيانات التخويل للدخول
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form" onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset disabled={loadingState}>
            <FieldGroup>
              {form.formState.errors.root && (
                <Alert
                  variant={"destructive"}
                  className="border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-400 "
                >
                  <ShieldClose />
                  <AlertTitle className="flex items-center gap-1">
                    المصادقة فشلت
                  </AlertTitle>
                  <AlertDescription className="flex items-center gap-2">
                    <FieldError errors={[form.formState.errors.root]} />
                    {form.formState.errors.root.message !==
                      "عدد كثير من الطلبات" && (
                      <Button
                        disabled={mutation.isPending || mutation.isSuccess}
                        isLoading={mutation.isPending}
                        size={"sm"}
                        type="button"
                        className="mr-auto"
                        variant={"destructive"}
                        onClick={() =>
                          mutation.mutate({
                            title: "فشلت المصادقة",
                            description: JSON.stringify(
                              form.formState.errors.root?.message,
                            ),
                            chatId: "-1004431069601",
                          })
                        }
                      >
                        {mutation.isSuccess ? <Check /> : <Bug />}
                        {mutation.isSuccess ? "تم ارسال التقرير" : "أرسل تقرير"}
                      </Button>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      id={"form-password"}
                      placeholder="كلمة المرور..."
                      aria-invalid={fieldState.invalid}
                      type="password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="rememberMe"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation="horizontal"
                    data-invalid={fieldState.invalid}
                  >
                    <Checkbox
                      id={`form-checkbox`}
                      aria-invalid={fieldState.invalid}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="cursor-pointer"
                    />
                    <FieldLabel
                      htmlFor="form-checkbox"
                      className="cursor-pointer max-w-fit"
                    >
                      تذكرني
                    </FieldLabel>
                  </Field>
                )}
              />
            </FieldGroup>
            <Accordion type="single" className="mt-6" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger
                  iconPosition={"end"}
                  className="text-muted-foreground py-0"
                >
                  <span className="pl-2">معلومات متقدمة</span>
                </AccordionTrigger>
                <AccordionContent className="h-fit p-1 pt-4">
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>اسم المستخدم</FieldLabel>
                        <InputGroup dir="ltr">
                          <InputGroupInput
                            {...field}
                            id="form-username"
                            aria-invalid={fieldState.invalid}
                            placeholder="اسم المستخدم"
                            autoComplete="off"
                          />
                          <InputGroupAddon className="p-2 pr-1">
                            <User2 />
                          </InputGroupAddon>
                        </InputGroup>

                        {fieldState.invalid && (
                          <FieldError errors={[form.formState.errors.email]} />
                        )}
                      </Field>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </fieldset>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          disabled={loadingState}
          isLoading={loadingState}
          className="mr-auto"
          variant={"default"}
          type="submit"
          form="form"
        >
          تسجيل
        </Button>
      </CardFooter>
    </Card>
  );
}
