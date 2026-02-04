"use client";

import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Customer = {
    id: string;
    name: string;
    email: string;
    spent: number;
    orders: number;
    lastOrder: string;
}

const columns: ColumnDef<Customer>[] = [
    {
        accessorKey: "name",
        header: "Customer",
        cell: ({ row }) => (
            <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                    <AvatarFallback>{row.original.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                    <div className="font-medium">{row.original.name}</div>
                    <div className="text-sm text-muted-foreground">{row.original.email}</div>
                </div>
            </div>
        )
    },
    {
        accessorKey: "orders",
        header: "Orders",
    },
    {
        accessorKey: "spent",
        header: "Total Spent",
        cell: ({ row }) => {
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(row.getValue("spent"));
        }
    },
    {
        accessorKey: "lastOrder",
        header: "Last Order",
    },
];

const data: Customer[] = [
    { id: "CUST-1", name: "Alice Johnson", email: "alice@example.com", spent: 1200.50, orders: 15, lastOrder: "2023-01-15" },
    { id: "CUST-2", name: "Bob Smith", email: "bob@example.com", spent: 850.00, orders: 8, lastOrder: "2023-01-20" },
];

export default function CustomersPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Customers</h1>
            <DataTable columns={columns} data={data} searchKey="name" />
        </div>
    );
}
