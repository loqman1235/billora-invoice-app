"use client";

import { createInvoiceAction } from "@/actions/invoices/create-invoice";
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
import { Textarea } from "@/components/ui/textarea";
import {
  CreateInvoiceSchema,
  createInvoiceSchema,
} from "@/lib/schemas/create-invoice";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const CreateInvoiceForm = () => {
  const t = useTranslations("DashboardPage.invoices.create");

  const form = useForm<CreateInvoiceSchema>({
    resolver: zodResolver(createInvoiceSchema),
    defaultValues: {
      billingName: "",
      billingEmail: "",
      amount: 0,
      description: "",
    },
  });

  const [state, formAction] = useActionState(createInvoiceAction, undefined);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = (data: CreateInvoiceSchema) => {
    startTransition(() => {
      formAction(data);
    });
  };

  useEffect(() => {
    if (state && state.success) {
      form.reset();
      toast.success(state.message);
      router.push("/dashboard");
    }
  }, [form, router, state]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="billingName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.billingName.label")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("form.billingName.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="billingEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.billingEmail.label")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("form.billingEmail.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.amount.label")}</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.description.label")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("form.description.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} className="w-full">
          {isPending ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            t("form.submit")
          )}
        </Button>
      </form>
    </Form>
  );
};
