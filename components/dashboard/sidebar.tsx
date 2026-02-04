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
    Store // Icon for brand
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

export function Sidebar() {
    const pathname = usePathname();
    const { logout } = useAuth();

    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-sidebar text-sidebar-foreground md:flex">
            <div className="flex h-16 items-center border-b px-6">
                <Store className="mr-2 h-6 w-6 text-primary" />
                <span className="text-lg font-bold">EcomDash</span>
            </div>
            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="grid gap-1 px-4">
                    {navItems.map(({ href, icon: Icon, label }) => {
                        const isActive = pathname === href || pathname.startsWith(`${href}/`);
                        return (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className={cn(
                                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                                        isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "transparent"
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    {label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}
