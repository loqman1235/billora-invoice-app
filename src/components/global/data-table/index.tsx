"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { SearchIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

interface DataTableProps<TData extends { amount: number }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const statuses = [
  { value: "open", labelKey: "table.filter.open" },
  { value: "paid", labelKey: "table.filter.paid" },
  { value: "void", labelKey: "table.filter.void" },
  { value: "uncollectible", labelKey: "table.filter.uncollectible" },
  { value: "canceled", labelKey: "table.filter.canceled" },
  { value: "pending", labelKey: "table.filter.pending" },
] as const;

export const DataTable = <TData extends { amount: number }, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) => {
  const t = useTranslations("DashboardPage.invoices");
  const locale = useLocale();

  // const columns = useColumns();
  const [columnFilters, setColumnsFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const hasFooter = columns.some((column) => column.footer);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnsFilters,
  });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="relative w-full">
          <Input
            placeholder={t("table.search")}
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className={` ${locale === "ar" ? "pr-10 text-right" : "pl-10"}`}
          />
          <SearchIcon
            className={`absolute ${locale === "ar" ? "right-4" : "left-4"} top-1/2 size-4 -translate-y-1/2 text-muted-foreground`}
          />
        </div>

        <Select
          value={selectedStatus ?? undefined}
          onValueChange={(value) => {
            setSelectedStatus(value === "all" ? null : value);
            table
              .getColumn("status")
              ?.setFilterValue(value === "all" ? undefined : value);
          }}
        >
          <SelectTrigger
            className={cn(locale === "ar" && "flex-row-reverse", "w-[180px]")}
          >
            <SelectValue placeholder={t("table.filter.title")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              className={locale === "ar" ? "flex-row-reverse" : ""}
              value="all"
            >
              {t("table.filter.all")}
            </SelectItem>{" "}
            {statuses.map(({ value, labelKey }) => (
              <SelectItem
                className={locale === "ar" ? "flex-row-reverse" : ""}
                key={value}
                value={value}
              >
                {t(labelKey)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      locale === "ar" ? "text-right" : "text-left",
                      "h-10",
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : ""}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {t("noInvoices")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {hasFooter && (
            <TableFooter>
              {table.getFooterGroups().map((footerGroup) => (
                <TableRow key={footerGroup.id}>
                  {footerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className={cn(
                          locale === "ar" ? "text-right" : "text-left",
                          "text-primary",
                        )}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.footer,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableFooter>
          )}
        </Table>
        <div className="mt-4 flex items-center justify-between p-4">
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {t("table.pagination.previous")}
          </Button>
          <span>
            {t("table.pagination.index", {
              page: table.getState().pagination.pageIndex + 1,
              pages: table.getPageCount(),
            })}
          </span>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {t("table.pagination.next")}
          </Button>
        </div>
      </div>
    </div>
  );
};
