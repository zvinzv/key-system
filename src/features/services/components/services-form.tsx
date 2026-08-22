import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ServicesInsertType, ServicesUpdateType } from "../types/services.type";
import { ServicesSchema } from "../schema/services.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "slugify";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Info, Link2, RotateCcwClock, Save, Sparkles } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addServiceAction, editServiceAction } from "../action/services.action";
import { useDialogStore } from "../store/dialog.store";
import { useShallow } from "zustand/react/shallow";
type ServiceFormProps =
  | {
      mode: "create";
    }
  | {
      mode: "edit";
      service: ServicesUpdateType;
    };
export const ServicesForm = (props: ServiceFormProps) => {
  const isEdit = props.mode === "edit";
  const { close } = useDialogStore(
    useShallow((state) => ({
      close: state.close,
    })),
  );
  const queryClient = useQueryClient();

  const form = useForm<ServicesInsertType>({
    resolver: zodResolver(ServicesSchema),
    defaultValues: isEdit
      ? {
          name: props.service.name ?? "",
          icon: props.service.icon ?? "",
          slug: props.service.slug ?? "",
        }
      : {
          name: "",
          icon: "",
          slug: "",
        },
  });
  const createServiceMutaion = useMutation({
    mutationFn: async (data: ServicesInsertType) => {
      await addServiceAction({ ...data });
    },
    onSuccess: () => {
      toast.success("Report send successfuly", {
        style: {
          height: "2.5rem",
        },
      });
      queryClient.invalidateQueries({ queryKey: ["services"] });
      close();
    },
    onError: (error) => {
      toast.error(error.message, {
        style: {
          height: "2.5rem",
        },
      });
    },
  });
  const updateServiceMutaion = useMutation({
    mutationFn: async ({
      data,
      id,
    }: {
      data: ServicesInsertType;
      id: string;
    }) => {
      await editServiceAction(id, data);
    },
    onSuccess: () => {
      toast.success("Report send successfuly", {
        style: {
          height: "2.5rem",
        },
      });
      queryClient.invalidateQueries({ queryKey: ["services"] });
      close();
    },
    onError: (error) => {
      toast.error(error.message, {
        style: {
          height: "2.5rem",
        },
      });
    },
  });
  function onSubmit(data: ServicesInsertType) {
    try {
      if (isEdit) {
        updateServiceMutaion.mutate({
          id: props.service.id,
          data,
        });
      } else {
        createServiceMutaion.mutate(data);
      }
    } catch (error: unknown | Error) {
      if (error instanceof Error) {
        form.setError("root", { message: error.message });
        return;
      }

      form.setError("root", {
        message: "Unexpected error",
      });
    }
  }
  return (
    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
      <fieldset
        disabled={
          createServiceMutaion.isPending || updateServiceMutaion.isPending
        }
      >
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-name">
                  اسم الخدمة<span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    if (
                      !form.getFieldState("slug").isTouched ||
                      !form.getFieldState("slug").isDirty
                    ) {
                      form.setValue(
                        "slug",
                        slugify(e.target.value, {
                          lower: true,
                          strict: true,
                        }),
                        { shouldDirty: true },
                      );
                    }
                  }}
                  id="form-rhf-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="اكتب اسم الخدمة..."
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="slug"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-slug">
                  معرّف الرابط (Slug)
                  <span className="text-destructive">*</span>
                  <Tooltip>
                    <TooltipTrigger
                      type="button"
                      className="mr-auto text-foreground/50 "
                    >
                      <Info className="size-4" />
                    </TooltipTrigger>
                    <TooltipContent align="end" alignOffset={-2} className="">
                      <p> رابط مختصر للوصول السريع إلى هذا العنصر</p>
                    </TooltipContent>
                  </Tooltip>
                </FieldLabel>
                <div className="flex gap-1 items-center">
                  <Input
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value.replace(/[^a-z0-9-]/g, ""))
                    }
                    id="form-rhf-slug"
                    placeholder="حروف انكليزية صغيره فقط..."
                    aria-invalid={fieldState.invalid}
                  />
                  <Button
                    type="button"
                    variant={"outline"}
                    size={"icon"}
                    onClick={() => {
                      form.resetField("slug");
                      form.setValue(
                        "slug",
                        slugify(form.getValues("name"), {
                          lower: true,
                          strict: true,
                        }),
                      );
                    }}
                    className="cursor-pointer"
                  >
                    <Sparkles />
                  </Button>
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="icon"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-icon">ايقونة / صورة</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    dir="ltr"
                    id="form-rhf-icon"
                    placeholder="https://..."
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  <InputGroupAddon align={"inline-end"}>
                    <Link2 />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <br />
        <Field orientation="horizontal">
          <Button
            disabled={!form.formState.isDirty}
            isLoading={
              createServiceMutaion.isPending || updateServiceMutaion.isPending
            }
            type="submit"
            form="form-rhf-demo"
          >
            <Save />
            {isEdit ? "حفظ التعديلات" : "حفظ الخدمة"}
          </Button>
          <Button
            disabled={!form.formState.isDirty}
            type="button"
            variant="outline"
            onClick={() => form.reset()}
          >
            <RotateCcwClock />
            اعادة تهيئه
          </Button>
        </Field>
      </fieldset>
    </form>
  );
};

// "use client";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Controller, useForm } from "react-hook-form";
// import LoginFormSchema from "../schema/login.schema";
// import { LoginFormType } from "../types/login.type";
// import {
//   Field,
//   FieldContent,
//   FieldDescription,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
//   FieldTitle,
// } from "@/components/ui/field";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Bug, Check, CircleX, Lock, ShieldClose } from "lucide-react";

// import { loginAction } from "../action/login.action";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import {
//   InputGroup,
//   InputGroupAddon,
//   InputGroupInput,
// } from "@/components/ui/input-group";
// import { useMutation } from "@tanstack/react-query";
// import { sendReport } from "../action/report.action";
// import { ReportType } from "../types/report.type";
// import { toast } from "sonner";
// import SignInButton from "./sign-in-button";
// export default function LoginForm() {
//   const [isRedirecting, setIsRedirecting] = useState(false);
//   const router = useRouter();
//   const form = useForm<LoginFormType>({
//     resolver: zodResolver(LoginFormSchema),
//     defaultValues: {
//       email: "samer",
//       password: "",
//       rememberMe: false,
//     },
//   });
//   const mutation = useMutation({
//     mutationFn: async (data: ReportType) => {
//       await sendReport(data);
//     },
//     onSuccess: () => {
//       toast.success("Report send successfuly", {
//         style: {
//           height: "2.5rem",
//         },
//       });
//     },
//     onError: (error) => {
//       toast.error(error.message, {
//         style: {
//           height: "2.5rem",
//         },
//       });
//     },
//   });
//   async function onSubmit(data: LoginFormType) {
//     try {
//       mutation.reset();
//       await loginAction(data);
//       setIsRedirecting(true);
//       router.replace("/");
//     } catch (error: unknown | Error) {
//       if (error instanceof Error) {
//         form.setError("root", { message: error.message });
//         return;
//       }

//       form.setError("root", {
//         message: "Unexpected error",
//       });
//     }
//   }
//   const loadingState = form.formState.isSubmitting || isRedirecting;
//   return (
//     <Card className="w-full  sm:max-w-md h-full sca">
//       <CardHeader>
//         <CardTitle className="">تسجيل الدخول</CardTitle>
//         <CardDescription className="">
//           ادخل بيانات التخويل للدخول
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form id="form" onSubmit={form.handleSubmit(onSubmit)}>
//           <fieldset disabled={loadingState}>
//             <FieldGroup>
//               {form.formState.errors.root && (
//                 <Alert
//                   variant={"destructive"}
//                   className="border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-400 "
//                 >
//                   <ShieldClose />
//                   <AlertTitle className="flex items-center gap-1">
//                     المصادقة فشلت
//                   </AlertTitle>
//                   <AlertDescription className="flex items-center gap-2">
//                     <FieldError errors={[form.formState.errors.root]} />
//                     {form.formState.errors.root.message !==
//                       "عدد كثير من الطلبات" && (
//                       <Button
//                         disabled={mutation.isPending || mutation.isSuccess}
//                         isLoading={mutation.isPending}
//                         size={"sm"}
//                         type="button"
//                         className="mr-auto"
//                         variant={"destructive"}
//                         onClick={() =>
//                           mutation.mutate({
//                             title: "فشلت المصادقة",
//                             description: JSON.stringify(
//                               form.formState.errors.root?.message,
//                             ),
//                             chatId: "-1004431069601",
//                           })
//                         }
//                       >
//                         {mutation.isSuccess ? <Check /> : <Bug />}
//                         {mutation.isSuccess ? "تم ارسال التقرير" : "أرسل تقرير"}
//                       </Button>
//                     )}
//                   </AlertDescription>
//                 </Alert>
//               )}

//               <Controller
//                 name="password"
//                 control={form.control}
//                 render={({ field, fieldState }) => (
//                   <Field data-invalid={fieldState.invalid}>
//                     <Input
//                       {...field}
//                       id={"form-password"}
//                       placeholder="كلمة المرور..."
//                       aria-invalid={fieldState.invalid}
//                       type="password"
//                     />
//                     {fieldState.invalid && (
//                       <FieldError errors={[fieldState.error]} />
//                     )}
//                   </Field>
//                 )}
//               />

//               <Controller
//                 name="rememberMe"
//                 control={form.control}
//                 render={({ field, fieldState }) => (
//                   <Field
//                     orientation="horizontal"
//                     data-invalid={fieldState.invalid}
//                   >
//                     <Checkbox
//                       id={`form-checkbox`}
//                       aria-invalid={fieldState.invalid}
//                       checked={field.value}
//                       onCheckedChange={field.onChange}
//                       className="cursor-pointer"
//                     />
//                     <FieldLabel
//                       htmlFor="form-checkbox"
//                       className="cursor-pointer max-w-fit"
//                     >
//                       تذكرني
//                     </FieldLabel>
//                   </Field>
//                 )}
//               />
//             </FieldGroup>
//             <Accordion type="single" className="mt-6" collapsible>
//               <AccordionItem value="item-1">
//                 <AccordionTrigger
//                   iconPosition={"end"}
//                   className="text-muted-foreground py-0"
//                 >
//                   <span className="pl-2">معلومات متقدمة</span>
//                 </AccordionTrigger>
//                 <AccordionContent className="h-fit p-1 pt-4">
//                   <Controller
//                     name="email"
//                     control={form.control}
//                     render={({ field, fieldState }) => (
//                       <Field data-invalid={fieldState.invalid}>
//                         <FieldLabel>اسم المستخدم</FieldLabel>
//                         <InputGroup dir="ltr">
//                           <InputGroupInput
//                             {...field}
//                             disabled={true}
//                             id="form-username"
//                             aria-invalid={fieldState.invalid}
//                             placeholder="اسم المستخدم"
//                             autoComplete="off"
//                           />
//                           <InputGroupAddon className="p-2 pr-1">
//                             <Lock />
//                           </InputGroupAddon>
//                         </InputGroup>

//                         {fieldState.invalid && (
//                           <FieldError errors={[form.formState.errors.email]} />
//                         )}
//                       </Field>
//                     )}
//                   />
//                 </AccordionContent>
//               </AccordionItem>
//             </Accordion>
//           </fieldset>
//         </form>
//       </CardContent>
//       <CardFooter>
//         <Button
//           disabled={loadingState}
//           isLoading={loadingState}
//           className="mr-auto"
//           variant={"default"}
//           type="submit"
//           form="form"
//         >
//           تسجيل
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }
