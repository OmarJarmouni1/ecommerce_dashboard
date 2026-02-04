"use client";

import { Plus, Search, Filter, Download, Upload, List, LayoutGrid, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { columns, Product } from "./columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data: Product[] = [
    {
        id: "728ed52f",
        name: "Wireless Headphones",
        price: 150,
        compareAtPrice: 199,
        stock: 25,
        status: "active",
        category: "Electronics",
        sku: "WH-2024-001",
        sales: 145,
        image: "/placeholder-product.jpg"
    },
    {
        id: "489e1d42",
        name: "Ergonomic Chair",
        price: 350,
        stock: 12,
        status: "active",
        category: "Furniture",
        sku: "EC-2024-002",
        sales: 67,
        image: "/placeholder-product.jpg"
    },
    {
        id: "e8291c32",
        name: "Mechanical Keyboard",
        price: 120,
        compareAtPrice: 150,
        stock: 5,
        status: "draft",
        category: "Electronics",
        sku: "MK-2024-003",
        sales: 203,
        image: "/placeholder-product.jpg"
    },
    {
        id: "a1b2c3d4",
        name: "Minimalist Desk Lamp",
        price: 45,
        compareAtPrice: 60,
        stock: 45,
        status: "active",
        category: "Lighting",
        sku: "DL-2024-004",
        sales: 89,
        image: "/placeholder-product.jpg"
    },
    {
        id: "f5g6h7i8",
        name: "Leather Journal",
        price: 28,
        stock: 0,
        status: "archived",
        category: "Stationery",
        sku: "LJ-2024-005",
        sales: 12,
        image: "/placeholder-product.jpg"
    },
    {
        id: "j9k0l1m2",
        name: "Portable Power Bank",
        price: 55,
        compareAtPrice: 75,
        stock: 8,
        status: "active",
        category: "Electronics",
        sku: "PB-2024-006",
        sales: 456,
        image: "/placeholder-product.jpg"
    }
];

export default function ProductsPage() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [viewMode, setViewMode] = useState<"list" | "grid">("list");
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="space-y-6 pb-20">
            {/* Header Section */}
            <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-foreground tracking-tight uppercase">Products</h1>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Manage your shop inventory</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" className="rounded-none border-border font-bold text-[10px] uppercase tracking-widest h-10">
                            <Upload className="mr-2 h-3.5 w-3.5" />
                            Import
                        </Button>
                        <Button variant="outline" className="rounded-none border-border font-bold text-[10px] uppercase tracking-widest h-10">
                            <Download className="mr-2 h-3.5 w-3.5" />
                            Export
                        </Button>
                        <Link href="/dashboard/products/new">
                            <Button className="rounded-none bg-blue-600 hover:bg-blue-700 font-bold text-[10px] uppercase tracking-widest h-10 px-6">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Product
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Toolbar Section */}
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="SEARCH BY NAME OR SKU..."
                            className="pl-10 h-10 rounded-none border-border bg-card font-bold text-[10px] uppercase tracking-widest focus-visible:ring-blue-600"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            className={cn(
                                "rounded-none border-border font-bold text-[10px] uppercase tracking-widest h-10 px-4",
                                isFilterOpen && "bg-muted border-blue-600 text-blue-600"
                            )}
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                        >
                            <Filter className="mr-2 h-3.5 w-3.5" />
                            Filters
                        </Button>
                        <div className="flex items-center border border-border bg-card p-0.5">
                            <Button
                                variant="ghost"
                                size="icon"
                                className={cn("h-8 w-8 rounded-none", viewMode === "list" ? "bg-muted text-blue-600" : "text-muted-foreground opacity-50")}
                                onClick={() => setViewMode("list")}
                            >
                                <List className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={cn("h-8 w-8 rounded-none", viewMode === "grid" ? "bg-muted text-blue-600" : "text-muted-foreground opacity-50")}
                                onClick={() => setViewMode("grid")}
                            >
                                <LayoutGrid className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Collapsible Filters */}
                {isFilterOpen && (
                    <Card className="rounded-none border-border bg-card shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
                        <CardHeader className="py-3 px-6 border-b border-border flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-[10px] uppercase tracking-widest font-black">Advanced Filters</CardTitle>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsFilterOpen(false)}>
                                <X className="h-3.5 w-3.5" />
                            </Button>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1 block">Status</label>
                                    <div className="flex flex-wrap gap-2">
                                        {["Active", "Draft", "Archived", "Out of Stock"].map((s) => (
                                            <Badge key={s} variant="outline" className="rounded-none cursor-pointer hover:border-blue-600 hover:text-blue-600 transition-colors py-1 px-3 text-[9px] uppercase tracking-widest font-bold">
                                                {s}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1 block">Sort By</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Badge variant="outline" className="rounded-none justify-center py-1 text-[9px] uppercase tracking-widest font-bold border-blue-600 text-blue-600 bg-blue-600/5">Newest</Badge>
                                        <Badge variant="outline" className="rounded-none justify-center py-1 text-[9px] uppercase tracking-widest font-bold opacity-50">Price: low-high</Badge>
                                        <Badge variant="outline" className="rounded-none justify-center py-1 text-[9px] uppercase tracking-widest font-bold opacity-50">Price: high-low</Badge>
                                        <Badge variant="outline" className="rounded-none justify-center py-1 text-[9px] uppercase tracking-widest font-bold opacity-50">Sales</Badge>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1 block">Price Range</label>
                                    <div className="flex items-center gap-2">
                                        <Input placeholder="MIN" className="h-8 rounded-none border-border bg-muted/50 text-[10px] font-bold" />
                                        <div className="h-px w-2 bg-border" />
                                        <Input placeholder="MAX" className="h-8 rounded-none border-border bg-muted/50 text-[10px] font-bold" />
                                    </div>
                                </div>
                                <div className="flex items-end gap-2 mt-auto">
                                    <Button className="flex-1 rounded-none bg-blue-600 hover:bg-blue-700 h-9 font-bold text-[10px] uppercase tracking-widest">Apply Filters</Button>
                                    <Button variant="ghost" className="flex-1 rounded-none h-9 font-bold text-[10px] uppercase tracking-widest text-pink-500 hover:text-pink-600">Clear All</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            <div className="bg-card border border-border">
                <DataTable columns={columns} data={data} searchKey="name" />
            </div>

            {/* Bulk Actions Bar (Sticky) */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 duration-500 hidden group-data-[selected=true]:flex">
                <div className="bg-zinc-900 text-white rounded-none border border-white/10 p-3 flex items-center gap-6 shadow-2xl">
                    <span className="text-[10px] uppercase tracking-widest font-black ml-4">3 ITEMS SELECTED</span>
                    <div className="h-4 w-px bg-white/10" />
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" className="h-8 rounded-none text-[10px] uppercase tracking-widest font-black text-white hover:bg-white/10 px-3">
                            Delete
                        </Button>
                        <Button variant="ghost" className="h-8 rounded-none text-[10px] uppercase tracking-widest font-black text-white hover:bg-white/10 px-3">
                            Status
                        </Button>
                        <Button variant="ghost" className="h-8 rounded-none text-[10px] uppercase tracking-widest font-black text-white hover:bg-white/10 px-3">
                            Export
                        </Button>
                    </div>
                    <div className="h-4 w-px bg-white/10" />
                    <Button variant="ghost" className="h-8 rounded-none text-[10px] uppercase tracking-widest font-black text-pink-500 hover:bg-pink-500/10 mr-2">
                        Deselect All
                    </Button>
                </div>
            </div>
        </div>
    );
}
