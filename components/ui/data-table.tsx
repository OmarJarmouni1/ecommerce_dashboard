"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    SortingState,
    getSortedRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useMediaQuery } from "@/lib/hooks/useMediaQuery"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    searchKey?: string
    renderMobileCard?: (row: TData, helpers?: { selected: boolean; onToggle: () => void }) => React.ReactNode
}

export function DataTable<TData, TValue>({
    columns,
    data,
    searchKey,
    renderMobileCard,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = useState({})
    const isMobile = useMediaQuery("(max-width: 767px)")

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            rowSelection,
        },
    })

    const rows = table.getRowModel().rows
    const showCards = isMobile && renderMobileCard && rows?.length !== undefined

    if (showCards) {
        return (
            <div className="group" data-selected={table.getIsSomeRowsSelected() || table.getIsAllRowsSelected()}>
                <div className="space-y-2 md:hidden">
                    {rows.length
                        ? rows.map((row) => (
                            <div key={row.id}>
                                {renderMobileCard(row.original, {
                                    selected: row.getIsSelected(),
                                    onToggle: () => row.toggleSelected(),
                                })}
                            </div>
                        ))
                        : (
                            <div className="flex flex-col items-center justify-center py-12 gap-2 opacity-50 border border-border rounded-none bg-card">
                                <span className="text-2xl">📦</span>
                                <span className="text-[10px] uppercase tracking-widest font-black">No results found</span>
                            </div>
                        )}
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-4 border-t border-border bg-card md:hidden">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground order-2 sm:order-1">
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
                    </span>
                    <div className="flex items-center gap-2 order-1 sm:order-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="rounded-none h-11 min-h-[44px] px-4 text-[10px] uppercase tracking-widest font-black border-border"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="rounded-none h-11 min-h-[44px] px-4 text-[10px] uppercase tracking-widest font-black border-border"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="group" data-selected={table.getIsSomeRowsSelected() || table.getIsAllRowsSelected()}>
            <div className="rounded-none border-0 overflow-x-auto">
                <Table>
                    <TableHeader className="bg-muted/50 border-y border-border">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="hover:bg-transparent border-none">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="h-10 text-[10px] uppercase tracking-widest font-bold text-muted-foreground py-0 px-4">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="border-b border-border hover:bg-muted/30 transition-colors group/row"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="py-3 px-4">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-40 text-center">
                                    <div className="flex flex-col items-center justify-center gap-2 opacity-50">
                                        <span className="text-2xl">📦</span>
                                        <span className="text-[10px] uppercase tracking-widest font-black">No results found</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-4 border-t border-border bg-card">
                <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                    Showing {table.getRowModel().rows.length} of {data.length} entries
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="rounded-none h-9 sm:h-8 text-[10px] uppercase tracking-widest font-black border-border px-4"
                    >
                        <ChevronLeft className="h-3 w-3 mr-1" />
                        <span className="hidden sm:inline">Previous</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="rounded-none h-9 sm:h-8 text-[10px] uppercase tracking-widest font-black border-border px-4"
                    >
                        <span className="hidden sm:inline">Next</span>
                        <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
