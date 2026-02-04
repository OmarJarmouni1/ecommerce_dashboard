"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { columns, Product } from "./columns";

const data: Product[] = [
    {
        id: "728ed52f",
        name: "Wireless Headphones",
        price: 150,
        stock: 25,
        status: "active",
        category: "Electronics"
    },
    {
        id: "489e1d42",
        name: "Ergonomic Chair",
        price: 350,
        stock: 12,
        status: "active",
        category: "Furniture"
    },
    {
        id: "e8291c32",
        name: "Mechanical Keyboard",
        price: 120,
        stock: 5,
        status: "draft",
        category: "Electronics"
    }
    // Add more mock data...
];

export default function ProductsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Products</h1>
                <Link href="/dashboard/products/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Product
                    </Button>
                </Link>
            </div>

            <DataTable columns={columns} data={data} searchKey="name" />
        </div>
    );
}
