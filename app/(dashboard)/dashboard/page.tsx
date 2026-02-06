"use client";

import { useQuery } from '@tanstack/react-query';
import { DollarSign, Users, CreditCard, Activity } from 'lucide-react';
import { KPICard } from '@/components/dashboard/kpi-card';
import { SalesChart } from '@/components/charts/sales-chart';
import { RecentOrders } from '@/components/dashboard/recent-orders';

// Mock data fetcher with dynamic updates
const fetchDashboardData = async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Generate static months with random data
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

    const salesData = months.map(month => ({
        name: month,
        total: Math.floor(Math.random() * 5000) + 2000 + (Math.random() * 1000)
    }));

    return {
        kpi: [
            {
                title: "Total Revenue",
                value: `$${(45000 + Math.random() * 1000).toFixed(2)}`,
                change: "+20.1%",
                trend: "up" as const,
                icon: DollarSign,
                description: "from last month"
            },
            {
                title: "Subscriptions",
                value: `+${2350 + Math.floor(Math.random() * 50)}`,
                change: "+180.1%",
                trend: "up" as const,
                icon: Users,
                description: "from last month"
            },
            {
                title: "Sales",
                value: `+${12234 + Math.floor(Math.random() * 100)}`,
                change: "+19%",
                trend: "up" as const,
                icon: CreditCard,
                description: "from last month"
            },
            {
                title: "Active Now",
                value: `+${573 + Math.floor(Math.random() * 20)}`,
                change: "+201",
                trend: "up" as const,
                icon: Activity,
                description: "since last hour"
            }
        ],
        salesData,
        recentOrders: [
            {
                id: "1",
                customer: { name: "Olivia Martin", email: "olivia.martin@email.com" },
                amount: 1999.00,
                status: "success" as const
            },
            {
                id: "2",
                customer: { name: "Jackson Lee", email: "jackson.lee@email.com" },
                amount: 39.00,
                status: "success" as const
            },
            {
                id: "3",
                customer: { name: "Isabella Nguyen", email: "isabella.nguyen@email.com" },
                amount: 299.00,
                status: "processing" as const
            },
            {
                id: "4",
                customer: { name: "William Kim", email: "will@email.com" },
                amount: 99.00,
                status: "success" as const
            },
            {
                id: "5",
                customer: { name: "Sofia Davis", email: "sofia.davis@email.com" },
                amount: 39.00,
                status: "failed" as const
            }
        ]
    };
};

export default function DashboardPage() {
    const { data, isLoading } = useQuery({
        queryKey: ['dashboard-analytics'],
        queryFn: fetchDashboardData,
        refetchInterval: 3000, // Update every 3 seconds
    });

    if (isLoading) {
        return (
            <div className="flex h-[calc(100vh-10rem)] w-full items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                    <p className="text-muted-foreground">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 md:space-y-10">
            {/* Greet Section - responsive typography */}
            <div className="flex flex-col">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extralight text-blue-500 tracking-tight leading-none">Hello,</h2>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-blue-600 tracking-tighter leading-tight mt-1">admin!</h1>
                <p className="text-muted-foreground font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] mt-3 md:mt-4 ml-1">Dashboard Overview</p>
            </div>

            {/* KPI - 1 col mobile, 2 tablet, 4 desktop */}
            <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {data?.kpi.map((kpi, i) => (
                    <KPICard key={i} {...kpi} />
                ))}
            </div>

            {/* Chart + Recent orders - stack on mobile */}
            <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-7">
                <div className="lg:col-span-4 rounded-none border border-border bg-card p-4 md:p-6 shadow-sm overflow-hidden relative min-w-0">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl opacity-50" />
                    <SalesChart data={data?.salesData || []} />
                </div>
                <div className="lg:col-span-3 min-w-0">
                    <RecentOrders orders={data?.recentOrders || []} />
                </div>
            </div>
        </div>
    );
}
