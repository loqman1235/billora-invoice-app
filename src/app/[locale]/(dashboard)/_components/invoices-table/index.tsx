"use client";

import { DataTable } from "@/components/global/data-table";
import { useInvoiceColumns } from "../invoice-columns";
import { Invoice } from "@prisma/client";

type Props = {
  invoices: Invoice[];
};

export const InvoicesTable = ({ invoices }: Props) => {
  const invoicesColumns = useInvoiceColumns(invoices);
  return <DataTable columns={invoicesColumns} data={invoices} />;
};
