"use client";

import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Order = {
    id: string;
    customer: string;
    email: string;
    total: number;
    status: "pending" | "processing" | "success" | "failed";
    date: string;
    items: number;
    paymentMethod: "visa" | "mastercard" | "paypal" | "apple-pay";
}

const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "id",
        header: () => <div className="text-[10px] uppercase tracking-widest font-bold">Order ID</div>,
        cell: ({ row }) => <span className="font-mono text-[11px] font-bold text-blue-600">#{row.original.id}</span>
    },
    {
        accessorKey: "customer",
        header: () => <div className="text-[10px] uppercase tracking-widest font-bold">Customer</div>,
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="font-bold text-sm text-foreground">{row.original.customer}</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70 font-bold">{row.original.email}</span>
            </div>
        )
    },
    {
        accessorKey: "date",
        header: () => <div className="text-[10px] uppercase tracking-widest font-bold">Date</div>,
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="text-foreground font-bold text-xs">{row.original.date}</span>
                <span className="text-[9px] text-muted-foreground uppercase font-bold">14:20 PM</span>
            </div>
        )
    },
    {
        accessorKey: "items",
        header: () => <div className="text-[10px] uppercase tracking-widest font-bold text-center">Items</div>,
        cell: ({ row }) => <div className="text-center font-mono text-xs font-bold text-muted-foreground">{row.original.items}</div>
    },
    {
        accessorKey: "paymentMethod",
        header: () => <div className="text-[10px] uppercase tracking-widest font-bold text-center">Payment</div>,
        cell: ({ row }) => (
            <div className="flex justify-center">
                <Badge variant="outline" className="rounded-none uppercase text-[9px] tracking-widest font-bold py-0.5 border-border bg-card">
                    {row.original.paymentMethod}
                </Badge>
            </div>
        )
    },
    {
        accessorKey: "total",
        header: () => <div className="text-[10px] uppercase tracking-widest font-bold text-right">Total</div>,
        cell: ({ row }) => {
            const amount = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(row.getValue("total"));
            return <div className="text-right font-black text-sm text-foreground">{amount}</div>
        }
    },
    {
        accessorKey: "status",
        header: () => <div className="text-[10px] uppercase tracking-widest font-bold text-center">Status</div>,
        cell: ({ row }) => (
            <div className="flex justify-center">
                <Badge variant={row.original.status === 'success' ? 'default' : 'secondary'}
                    className={cn(
                        "rounded-none uppercase text-[9px] tracking-widest font-bold px-2",
                        row.original.status === 'success' ? "bg-blue-600" :
                            row.original.status === 'processing' ? "bg-pink-500 text-white" :
                                "bg-muted text-muted-foreground"
                    )}>
                    {row.original.status}
                </Badge>
            </div>
        )
    },
    {
        id: "actions",
        header: () => <div className="text-[10px] uppercase tracking-widest font-bold text-right">Actions</div>,
        cell: ({ row }) => (
            <div className="flex justify-end">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.location.href = `/dashboard/orders/${row.original.id}`}
                    className="rounded-none text-[10px] font-bold uppercase tracking-widest hover:text-blue-600 h-8"
                >
                    Details
                </Button>
            </div>
        ),
    },
];

const data: Order[] = [
    { id: "ORD-7281", customer: "Olivia Martin", email: "olivia@email.com", total: 120.50, status: "success", date: "2024-02-01", items: 3, paymentMethod: "visa" },
    { id: "ORD-7282", customer: "Jackson Lee", email: "jackson@email.com", total: 85.00, status: "pending", date: "2024-02-02", items: 1, paymentMethod: "paypal" },
    { id: "ORD-7283", customer: "Isabella Nguyen", email: "isabella@email.com", total: 299.00, status: "processing", date: "2024-02-03", items: 5, paymentMethod: "mastercard" },
    { id: "ORD-7284", customer: "William Kim", email: "will@email.com", total: 99.00, status: "success", date: "2024-02-04", items: 2, paymentMethod: "apple-pay" },
];

export default function OrdersPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-black text-foreground tracking-tight uppercase">Orders</h1>
            <DataTable columns={columns} data={data} searchKey="customer" />
        </div>
    );
}
