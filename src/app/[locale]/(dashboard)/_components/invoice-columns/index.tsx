"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Invoice } from "@prisma/client";
import { useTranslations } from "next-intl";

export const useInvoiceColumns = (data: Invoice[]): ColumnDef<Invoice>[] => {
  const t = useTranslations("DashboardPage.invoices.table");

  // const locale = useLocale();

  const totalAmount = data.reduce((sum, invoice) => sum + invoice.amount, 0);
  return [
    {
      accessorKey: "billingName",
      header: t("columns.customer"),
      footer: () => t("footer.total"),
    },
    {
      accessorKey: "billingEmail",
      header: t("columns.email"),
    },
    {
      accessorKey: "createdAt",
      header: t("columns.date"),
      cell: ({ getValue }) => {
        const date = new Date(getValue() as string);
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      },
    },
    {
      accessorKey: "status",
      header: t("columns.status"),
      cell: ({ getValue }) => {
        const status = getValue() as string;

        let statusClass = "";
        let statusText = status;

        switch (status) {
          case "open":
            statusClass = "status-open";
            break;
          case "paid":
            statusClass = "status-paid";
            break;
          case "void":
            statusClass = "status-void";
            break;
          case "uncollectible":
            statusClass = "status-uncollectible";
            break;
          case "canceled":
            statusClass = "status-canceled";
            break;
          case "pending":
            statusClass = "status-pending";
            break;
          case "failed":
            statusClass = "status-failed";
            break;
          default:
            statusClass = "status-unknown";
            statusText = "Unknown";
        }

        return (
          <span
            className={`inline-flex rounded-full px-2 text-xs font-semibold capitalize leading-5 ${statusClass}`}
          >
            {statusText}
          </span>
        );
      },
    },
    {
      accessorKey: "amount",
      header: t("columns.amount"),
      cell: ({ getValue }) => {
        const amount = getValue() as number;
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
      },
      footer: () => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(totalAmount);
      },
    },
  ];
};
