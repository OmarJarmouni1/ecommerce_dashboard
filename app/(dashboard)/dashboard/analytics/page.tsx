"use client";

import { SalesChart } from "@/components/charts/sales-chart";
import { DistributionChart } from "@/components/charts/distribution-chart";
import { TopProductsChart } from "@/components/charts/top-products-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AnalyticsPage() {
    // Mock data
    const salesData = [
        { name: "Jan", total: 2000 },
        { name: "Feb", total: 2500 },
        { name: "Mar", total: 3000 },
        { name: "Apr", total: 2800 },
        { name: "May", total: 3500 },
        { name: "Jun", total: 4000 },
    ];

    const distributionData = [
        { name: 'Electronics', value: 400 },
        { name: 'Clothing', value: 300 },
        { name: 'Furniture', value: 300 },
        { name: 'Books', value: 200 },
    ];

    const topProductsData = [
        { name: 'Wireless Headphones', sales: 120 },
        { name: 'Ergonomic Chair', sales: 98 },
        { name: 'Mechanical Keyboard', sales: 86 },
        { name: 'Smart Watch', sales: 72 },
        { name: 'Gaming Mouse', sales: 65 },
    ];

    return (
        <div className="space-y-10">
            {/* Greet Section */}
            <div className="flex flex-col">
                <h2 className="text-5xl lg:text-7xl font-extralight text-pink-500 tracking-tight leading-none">Hello,</h2>
                <h1 className="text-5xl lg:text-7xl font-black text-pink-600 tracking-tighter leading-tight mt-1">Analytics!</h1>
                <p className="text-muted-foreground font-bold uppercase tracking-[0.3em] text-[10px] mt-4 ml-1">Deep insights into your store performance</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <div className="lg:col-span-4 rounded-none border border-border bg-card p-6 shadow-sm overflow-hidden relative">
                    {/* Subtle geometric accent */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl opacity-50" />
                    <SalesChart data={salesData} />
                </div>

                <Card className="lg:col-span-3 rounded-none border-border shadow-sm relative overflow-hidden bg-card">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />
                    <CardHeader className="pl-6 pt-6 pb-2">
                        <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Category Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="px-2">
                        <DistributionChart data={distributionData} />
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6">
                <Card className="rounded-none border-border shadow-sm relative overflow-hidden bg-card">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-pink-500" />
                    <CardHeader className="pl-6 pt-6 pb-2">
                        <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Top Products</CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                        <TopProductsChart data={topProductsData} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
