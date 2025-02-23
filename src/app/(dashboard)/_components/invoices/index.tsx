import { DataTable } from "@/components/global/data-table";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { invoiceColumns } from "../invoice-columns";
import { prisma } from "@/lib/prisma";

export const Invoices = async () => {
  const invoices = await prisma.invoice.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-5">
      {/* HEADER */}
      <div className="flex w-full items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Invoices</h2>
          {invoices.length > 0 && (
            <p className="text-sm text-muted-foreground">
              Manage and track your {invoices.length} invoices
            </p>
          )}
        </div>
        <Button size="sm" asChild>
          <Link href="/dashboard/invoices/new">
            <PlusCircleIcon className="size-4" /> Create Invoice
          </Link>
        </Button>
      </div>

      <div>
        <DataTable columns={invoiceColumns} data={invoices} />
      </div>
    </div>
  );
};
