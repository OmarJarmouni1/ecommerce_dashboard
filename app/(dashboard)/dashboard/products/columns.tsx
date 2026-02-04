"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"

export type Product = {
    id: string
    name: string
    price: number
    compareAtPrice?: number
    stock: number
    status: "active" | "draft" | "archived"
    image?: string
    category: string
    sku: string
    sales: number
}

export const columns: ColumnDef<Product>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="rounded-none border-muted-foreground/50 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="rounded-none border-muted-foreground/50 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "image",
        header: () => <div className="text-[10px] uppercase tracking-widest font-bold text-center">Image</div>,
        cell: ({ row }) => {
            return (
                <div className="flex justify-center">
                    <div className="relative h-12 w-12 overflow-hidden rounded-none border border-border bg-muted">
                        {row.original.image ? (
                            <Image
                                src={row.original.image}
                                alt={row.original.name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs opacity-30">
                                IMG
                            </div>
                        )}
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="text-[10px] uppercase tracking-widest font-bold px-0 hover:bg-transparent"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Product
                <ArrowUpDown className="ml-2 h-3 w-3" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="font-bold text-sm text-foreground">{row.original.name}</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70 font-bold">{row.original.sku}</span>
            </div>
        )
    },
    {
        accessorKey: "category",
        header: () => <div className="text-[10px] uppercase tracking-widest font-bold text-center">Category</div>,
        cell: ({ row }) => (
            <div className="flex justify-center">
                <Badge variant="outline" className="rounded-none text-[9px] uppercase tracking-widest font-bold border-blue-600/20 bg-blue-600/5 text-blue-600">
                    {row.original.category}
                </Badge>
            </div>
        )
    },
    {
        accessorKey: "stock",
        header: () => <div className="text-[10px] uppercase tracking-widest font-bold text-center">Stock</div>,
        cell: ({ row }) => {
            const stock = row.original.stock
            let status = { label: "In Stock", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" }
            if (stock === 0) status = { label: "Out of Stock", color: "text-pink-500 bg-pink-500/10 border-pink-500/20" }
            else if (stock < 10) status = { label: "Low Stock", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" }

            return (
                <div className="flex flex-col items-center gap-1">
                    <span className="font-mono text-xs font-bold">{stock}</span>
                    <Badge className={cn("rounded-none text-[8px] uppercase tracking-widest font-bold px-1.5 py-0", status.color)}>
                        {status.label}
                    </Badge>
                </div>
            )
        }
    },
    {
        accessorKey: "price",
        header: ({ column }) => (
            <div className="text-right">
                <Button
                    variant="ghost"
                    className="text-[10px] uppercase tracking-widest font-bold px-0 hover:bg-transparent"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <ArrowUpDown className="mr-2 h-3 w-3" />
                    Price
                </Button>
            </div>
        ),
        cell: ({ row }) => {
            const price = row.original.price
            const compareAt = row.original.compareAtPrice
            const discount = compareAt ? Math.round(((compareAt - price) / compareAt) * 100) : 0

            return (
                <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                        {compareAt && (
                            <span className="text-xs text-muted-foreground line-through decoration-pink-500/50">
                                ${compareAt.toFixed(2)}
                            </span>
                        )}
                        <span className="font-black text-sm text-foreground">${price.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                        <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">
                            -{discount}% OFF
                        </span>
                    )}
                </div>
            )
        },
    },
    {
        accessorKey: "status",
        header: () => <div className="text-[10px] uppercase tracking-widest font-bold text-center">Status</div>,
        cell: ({ row }) => {
            const status = row.original.status
            return (
                <div className="flex justify-center">
                    <Badge variant={status === "active" ? "default" : "secondary"}
                        className={cn(
                            "rounded-none text-[9px] uppercase tracking-widest font-bold",
                            status === "active" ? "bg-blue-600" : "bg-muted text-muted-foreground"
                        )}>
                        {status}
                    </Badge>
                </div>
            )
        }
    },
    {
        accessorKey: "sales",
        header: () => <div className="text-[10px] uppercase tracking-widest font-bold text-right">Sales</div>,
        cell: ({ row }) => (
            <div className="text-right font-mono text-xs font-bold text-muted-foreground">
                {row.original.sales}
            </div>
        )
    },
    {
        id: "actions",
        header: () => <div className="text-[10px] uppercase tracking-widest font-bold text-right">Actions</div>,
        cell: ({ row }) => {
            const payment = row.original

            return (
                <div className="flex justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-none">
                            <DropdownMenuLabel className="text-[10px] uppercase tracking-widest font-bold">Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => window.location.href = `/dashboard/products/${payment.id}`}
                                className="rounded-none font-bold text-xs cursor-pointer"
                            >
                                View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(payment.id)}
                                className="rounded-none text-xs"
                            >
                                Copy Product ID
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]
