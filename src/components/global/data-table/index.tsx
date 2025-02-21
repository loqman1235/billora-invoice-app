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
import { useState } from "react";

interface DataTableProps<TData extends { amount: number }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const statuses = [
  "open",
  "paid",
  "void",
  "uncollectible",
  "canceled",
  "pending",
] as const;

export const DataTable = <TData extends { amount: number }, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) => {
  const [columnFilters, setColumnsFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
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

  // Calculate total amount
  const totalAmount = data.reduce((sum, row) => sum + row.amount, 0);
  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalAmount);

  console.log(table.getState().columnFilters);
  console.log(table.getColumn("status")?.getCanFilter());
  console.log(table.getColumn("billingEmail")?.getCanFilter());

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="relative w-full">
          <Input
            placeholder="Search..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-10"
          />
          <SearchIcon className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
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
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>{" "}
            {/* Use "all" instead of an empty string */}
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell
                colSpan={columns.length - 1}
                className="text-left font-bold"
              >
                Total Amount
              </TableCell>
              <TableCell className="font-bold">{formattedTotal}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <div className="mt-4 flex items-center justify-between p-4">
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <span>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
