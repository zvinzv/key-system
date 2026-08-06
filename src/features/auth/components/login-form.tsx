"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import LoginFormSchema from "../schema/login.schema";
import { LoginFormType } from "../types/login.type";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
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
import { CircleX } from "lucide-react";

import { loginAction } from "../action/login.action";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function LoginForm() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();
  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(data: LoginFormType) {
    try {
      console.time("Strart login");
      await loginAction(data);
      console.timeEnd("Strart login");
      setIsRedirecting(true);
      router.replace("/");
      // form.reset();
    } catch (error) {
      if (error == "Invalid credentials") {
        form.setError("root", { message: "[ERROR] Invalid credentials" });
      }
    }
  }
  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Please enter your credentials to log in.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset disabled={form.formState.isSubmitting || isRedirecting}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Username"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[form.formState.errors.email]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="Password"
                      aria-invalid={fieldState.invalid}
                      type="password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {form.formState.errors.root && (
                <Alert
                  variant={"destructive"}
                  className="border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-400"
                >
                  <CircleX />
                  <AlertTitle>Error Happen!</AlertTitle>
                  <AlertDescription>
                    <FieldError errors={[form.formState.errors.root]} />
                  </AlertDescription>
                </Alert>
              )}
            </FieldGroup>
          </fieldset>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            form="form-rhf-demo"
          >
            Login
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
