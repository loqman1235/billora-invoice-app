"use client";

import { signUpAction } from "@/actions/auth";
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
import { SignUpSchema, createSignUpSchema } from "@/lib/schemas/sign-up";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { GoogleButton } from "../google-button";
import { useTranslations } from "next-intl";

export const SignUpForm = () => {
  const t = useTranslations("Auth");
  const signUpSchema = createSignUpSchema(t);

  const router = useRouter();
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [state, formAction, isPending] = useActionState(
    signUpAction,
    undefined,
  );

  const onSubmit = (data: SignUpSchema) => {
    startTransition(() => {
      formAction(data);
    });
  };

  useEffect(() => {
    if (state?.success && state?.data) {
      form.reset();
      toast.success(
        "Verification email sent successfully! Check your inbox and follow the instructions to verify your email.",
      );
    }
  }, [form, router, state?.data, state?.success]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("SignUpPage.form.name.label")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("SignUpPage.form.name.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("SignUpPage.form.email.label")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("SignUpPage.form.email.placeholder")}
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
              <FormLabel>{t("SignUpPage.form.password.label")}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("SignUpPage.form.password.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {state?.error && <FormMessage>{state.error}</FormMessage>}

        <Button disabled={isPending} type="submit" className="w-full">
          {isPending ? (
            <>
              <LoaderCircle className="size-4 animate-spin" />
            </>
          ) : (
            t("SignUpPage.form.submit")
          )}
        </Button>
        <div className="flex items-center justify-center space-x-4">
          <div className="h-px grow bg-border" />
          <span className="text-bord text-sm font-medium">
            {t("SignUpPage.form.or")}
          </span>
          <div className="h-px grow bg-border" />
        </div>
        <GoogleButton />
        <p className="text-center text-sm text-muted-foreground">
          {t("SignUpPage.form.alreadyHaveAccount")}
          <Link
            href="/sign-in"
            className="text-primary underline-offset-4 hover:underline"
          >
            {" "}
            {t("SignUpPage.form.signIn")}
          </Link>
        </p>
      </form>
    </Form>
  );
};
