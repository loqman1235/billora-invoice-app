"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Invoice } from "@prisma/client";

export const invoiceColumns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "billingName",
    header: "Customer",
  },
  {
    accessorKey: "billingEmail",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
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
    header: "Status",
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
          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${statusClass}`}
        >
          {statusText}
        </span>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
