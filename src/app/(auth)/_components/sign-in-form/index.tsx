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
import { SignInSchema, signInSchema } from "@/lib/schemas/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";
import { GoogleButton } from "../google-button";

export const SignInForm = () => {
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email " {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter password "
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
              <LoaderCircle className="mr-2 animate-spin" /> Sign In
            </>
          ) : (
            "Sign In"
          )}
        </Button>
        <div className="flex items-center justify-center space-x-4">
          <div className="h-px grow bg-border" />
          <span className="text-bord text-sm font-medium">or</span>
          <div className="h-px grow bg-border" />
        </div>
        <GoogleButton />
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-primary underline-offset-4 hover:underline"
          >
            {" "}
            Sign Up
          </Link>
        </p>
      </form>
    </Form>
  );
};
