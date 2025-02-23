"use client";

import { signInAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createSignInSchema, SignInSchema } from "@/lib/schemas/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";
import { GoogleButton } from "../google-button";
import { useTranslations } from "next-intl";

export const SignInForm = () => {
  const t = useTranslations("Auth");
  const signInSchema = createSignInSchema(t);

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [state, formAction, isPending] = useActionState(
    signInAction,
    undefined,
  );

  const onSubmit = async (data: SignInSchema) => {
    startTransition(() => {
      formAction(data);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("SignInPage.form.email.label")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("SignInPage.form.email.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("SignInPage.form.password.label")}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("SignInPage.form.password.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {state?.globalError && <FormMessage>{state.globalError}</FormMessage>}

        <Button disabled={isPending} type="submit" className="w-full">
          {isPending ? (
            <>
              <LoaderCircle className="mr-2 animate-spin" />
            </>
          ) : (
            t("SignInPage.form.submit")
          )}
        </Button>
        <div className="flex items-center justify-center space-x-4">
          <div className="h-px grow bg-border" />
          <span className="text-bord text-sm font-medium">
            {t("SignInPage.form.or")}
          </span>
          <div className="h-px grow bg-border" />
        </div>
        <GoogleButton />
        <p className="text-center text-sm text-muted-foreground">
          {t("SignInPage.form.dontHaveAccount")}{" "}
          <Link
            href="/sign-up"
            className="text-primary underline-offset-4 hover:underline"
          >
            {" "}
            {t("SignInPage.form.signUp")}
          </Link>
        </p>
      </form>
    </Form>
  );
};
