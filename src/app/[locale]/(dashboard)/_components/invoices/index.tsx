import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { InvoicesTable } from "../invoices-table";

export const Invoices = async () => {
  const t = await getTranslations("DashboardPage.invoices");

  const invoices = await prisma.invoice.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-5">
      {/* HEADER */}
      <div className="flex w-full items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t("title")}</h2>
          {invoices.length > 0 && (
            <p className="text-sm text-muted-foreground">
              {t("subtitle", { invoiceCount: invoices.length })}
            </p>
          )}
        </div>
        <Button size="sm" asChild>
          <Link href="/dashboard/invoices/new">
            <PlusCircleIcon className="size-4" /> {t("createInvoiceBtn")}
          </Link>
        </Button>
      </div>

      <div>
        <InvoicesTable invoices={invoices} />
      </div>
    </div>
  );
};
