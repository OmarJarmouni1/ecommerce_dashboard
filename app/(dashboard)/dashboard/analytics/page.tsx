"use client";

import { SalesChart } from "@/components/charts/sales-chart";
import { DistributionChart } from "@/components/charts/distribution-chart";
import { TopProductsChart } from "@/components/charts/top-products-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Analytics</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <SalesChart data={salesData} />

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Category Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DistributionChart data={distributionData} />
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Top Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <TopProductsChart data={topProductsData} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
