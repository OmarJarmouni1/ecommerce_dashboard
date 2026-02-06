"use client";

import * as React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    BarChart,
    Settings,
} from "lucide-react";

const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/products", icon: Package, label: "Products" },
    { href: "/dashboard/orders", icon: ShoppingCart, label: "Orders" },
    { href: "/dashboard/customers", icon: Users, label: "Customers" },
    { href: "/dashboard/analytics", icon: BarChart, label: "Analytics" },
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export function MobileNav() {
    const pathname = usePathname();
    const [open, setOpen] = React.useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-11 w-11 min-h-[44px] min-w-[44px] lg:hidden rounded-none">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
                <div className="flex h-16 items-center px-6 border-b">
                    <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                        <div className="relative h-12 w-24">
                            <Image
                                src="/images/logo.png"
                                alt="RMKO Logo"
                                fill
                                className="object-contain dark:hidden"
                            />
                            <Image
                                src="/images/logo-dark.png"
                                alt="RMKO Logo"
                                fill
                                className="object-contain hidden dark:block"
                            />
                        </div>
                    </Link>
                </div>
                <nav className="flex flex-col py-6">
                    {navItems.map(({ href, icon: Icon, label }) => {
                        const isActive = href === "/dashboard"
                            ? pathname === href
                            : pathname === href || pathname.startsWith(`${href}/`);
                        return (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setOpen(false)}
                                className={cn(
                                    "relative flex items-center gap-3 px-6 py-4 text-sm font-bold tracking-tight transition-all",
                                    isActive
                                        ? "text-foreground bg-accent"
                                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                                )}
                            >
                                {isActive && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-pink-500" />
                                )}
                                <Icon className={cn(
                                    "h-5 w-5",
                                    isActive ? "text-blue-600" : "text-muted-foreground"
                                )} />
                                <span className="uppercase text-[11px] tracking-widest">{label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </SheetContent>
        </Sheet>
    );
}
