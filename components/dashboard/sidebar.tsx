"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    BarChart,
    Settings,
    LogOut,
    ShoppingBag
} from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { Button } from "@/components/ui/button";

const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/products", icon: Package, label: "Products" },
    { href: "/dashboard/orders", icon: ShoppingCart, label: "Orders" },
    { href: "/dashboard/customers", icon: Users, label: "Customers" },
    { href: "/dashboard/analytics", icon: BarChart, label: "Analytics" },
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

import Image from "next/image";

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-sidebar text-foreground md:flex">
            <div className="flex h-16 items-center px-6">
                <Link href="/dashboard" className="flex items-center gap-2">

                    <div className="relative h-30 w-50 right-11">
                        <Image
                            src="/images/logo.png"
                            alt="RMKO Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>
            </div>

            <nav className="flex-1 py-6 space-y-1">
                {navItems.map(({ href, icon: Icon, label }) => {
                    const isActive = pathname === href || pathname.startsWith(`${href}/`);
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "relative flex items-center gap-3 px-6 py-3 text-sm font-bold tracking-tight transition-all group",
                                isActive
                                    ? "text-foreground bg-sidebar-accent"
                                    : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
                            )}
                        >
                            {/* Active Accent Bar */}
                            {isActive && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-pink-500" />
                            )}

                            <Icon className={cn(
                                "h-5 w-5 transition-colors",
                                isActive ? "text-blue-600" : "text-muted-foreground group-hover:text-blue-600"
                            )} />
                            <span className="uppercase text-[11px] tracking-widest">{label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
