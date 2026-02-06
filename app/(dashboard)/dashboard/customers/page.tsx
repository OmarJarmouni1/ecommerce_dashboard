"use client";

import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Customer = {
    id: string;
    name: string;
    email: string;
    spent: number;
    orders: number;
    lastOrder: string;
    location: string;
    phone: string;
    status: "active" | "inactive";
}

const columns: ColumnDef<Customer>[] = [
    {
        accessorKey: "name",
        header: () => <div className="text-[10px] uppercase tracking-widest font-bold">Customer</div>,
        cell: ({ row }) => (
            <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border border-border">
                    <AvatarFallback className="bg-blue-600/5 text-blue-600 font-bold text-xs">{row.original.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="font-bold text-sm text-foreground">{row.original.name}</span>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70 font-bold">{row.original.email}</span>
                </div>
            </div>
        )
    },
    {
        accessorKey: "location",
        header: () => <div className="text-[10px] uppercase tracking-widest font-bold">Location</div>,
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="text-xs font-bold text-foreground">{row.original.location}</span>
                <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">{row.original.phone}</span>
            </div>
        )
    },
    {
        accessorKey: "orders",
        header: () => <div className="text-[10px] uppercase tracking-widest font-bold text-center">Orders</div>,
        cell: ({ row }) => <div className="text-center font-mono text-xs font-bold text-muted-foreground">{row.original.orders}</div>
    },
    {
        accessorKey: "spent",
        header: () => <div className="text-[10px] uppercase tracking-widest font-bold text-right">Total Spent</div>,
        cell: ({ row }) => {
            const amount = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(row.getValue("spent"));
            return <div className="text-right font-black text-sm text-foreground">{amount}</div>
        }
    },
    {
        accessorKey: "status",
        header: () => <div className="text-[10px] uppercase tracking-widest font-bold text-center">Status</div>,
        cell: ({ row }) => (
            <div className="flex justify-center">
                <Badge variant="outline" className={cn(
                    "rounded-none uppercase text-[9px] tracking-widest font-bold px-2 py-0.5",
                    row.original.status === 'active' ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-500" : "border-border bg-muted text-muted-foreground"
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
                    onClick={() => window.location.href = `/dashboard/customers/${row.original.id}`}
                    className="rounded-none text-[10px] font-bold uppercase tracking-widest hover:text-blue-600 h-8"
                >
                    View
                </Button>
            </div>
        ),
    },
];

const data: Customer[] = [
    { id: "CUST-1", name: "Alice Johnson", email: "alice@example.com", spent: 1240.50, orders: 15, lastOrder: "2024-01-15", location: "New York, USA", phone: "+1 202 555-0143", status: "active" },
    { id: "CUST-2", name: "Bob Smith", email: "bob@example.com", spent: 850.00, orders: 8, lastOrder: "2024-01-20", location: "London, UK", phone: "+44 20 7946 0958", status: "active" },
    { id: "CUST-3", name: "Charlie Brown", email: "charlie@email.com", spent: 45.00, orders: 2, lastOrder: "2024-01-22", location: "Paris, France", phone: "+33 1 42 68 53 00", status: "inactive" },
    { id: "CUST-4", name: "Diana Prince", email: "diana@email.com", spent: 3450.00, orders: 42, lastOrder: "2024-01-25", location: "Berlin, Germany", phone: "+49 30 22730027", status: "active" },
];

function CustomerMobileCard({ customer }: { customer: Customer }) {
    const amount = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(customer.spent);
    return (
        <Link href={`/dashboard/customers/${customer.id}`}>
            <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-none active:bg-muted/50 transition-colors">
                <Avatar className="h-14 w-14 shrink-0 border border-border">
                    <AvatarFallback className="bg-blue-600/5 text-blue-600 font-bold text-sm">{customer.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-foreground truncate">{customer.name}</p>
                    <p className="text-xs text-muted-foreground font-bold truncate">{customer.email}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-[10px] font-bold text-muted-foreground">
                        <span>{customer.orders} orders</span>
                        <span>{amount} spent</span>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">{customer.lastOrder}</p>
                    <Badge variant="outline" className={cn(
                        "rounded-none uppercase text-[8px] tracking-widest font-bold px-1.5 mt-2 w-fit",
                        customer.status === "active" ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-500" : "border-border bg-muted text-muted-foreground"
                    )}>
                        {customer.status}
                    </Badge>
                </div>
            </div>
        </Link>
    );
}

export default function CustomersPage() {
    return (
        <div className="space-y-6 pb-24 md:pb-8">
            <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight uppercase">Customers</h1>
            <DataTable
                columns={columns}
                data={data}
                searchKey="name"
                renderMobileCard={(customer) => <CustomerMobileCard customer={customer} />}
            />
        </div>
    );
}
