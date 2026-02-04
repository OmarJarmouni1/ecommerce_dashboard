"use client";

import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

type Order = {
    id: string;
    customer: string;
    total: number;
    status: "pending" | "processing" | "success" | "failed";
    date: string;
}

const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "id",
        header: "Order ID",
    },
    {
        accessorKey: "customer",
        header: "Customer",
    },
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        accessorKey: "total",
        header: "Total",
        cell: ({ row }) => {
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(row.getValue("total"));
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <Badge variant={row.original.status === 'success' ? 'default' : 'secondary'} className="rounded-none uppercase text-[10px] tracking-widest font-bold">
                {row.original.status}
            </Badge>
        )
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
            <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.href = `/dashboard/orders/${row.original.id}`}
                className="rounded-none text-xs font-bold uppercase tracking-widest hover:text-blue-600"
            >
                View Details
            </Button>
        ),
    },
];

const data: Order[] = [
    { id: "ORD-001", customer: "John Doe", total: 120.50, status: "success", date: "2023-01-01" },
    { id: "ORD-002", customer: "Jane Smith", total: 85.00, status: "pending", date: "2023-01-02" },
    // ... more mock data
];

export default function OrdersPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Orders</h1>
            <DataTable columns={columns} data={data} searchKey="customer" />
        </div>
    );
}
