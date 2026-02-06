"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen w-full bg-muted/40 overflow-x-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 min-w-0 lg:pl-64">
                <div className="sticky top-0 z-30 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <Header />
                </div>
                <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1536px] w-full mx-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
