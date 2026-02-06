"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    User,
    Building,
    Bell,
    Palette,
    Plug,
    Users,
    Shield,
    Package,
    CreditCard,
    Truck,
    BarChart,
    Settings,
    Search
} from "lucide-react";
import { Input } from "@/components/ui/input";

const sidebarItems = [
    {
        title: "Profile",
        href: "/dashboard/settings/profile",
        icon: User,
    },
    {
        title: "Business",
        href: "/dashboard/settings/business",
        icon: Building,
    },
    {
        title: "Notifications",
        href: "/dashboard/settings/notifications",
        icon: Bell,
    },
    {
        title: "Appearance",
        href: "/dashboard/settings/appearance",
        icon: Palette,
    },
    {
        title: "Integrations",
        href: "/dashboard/settings/integrations",
        icon: Plug,
    },
    {
        title: "Team & Users",
        href: "/dashboard/settings/team",
        icon: Users,
    },
    {
        title: "Security",
        href: "/dashboard/settings/security",
        icon: Shield,
    },
    {
        title: "Orders",
        href: "/dashboard/settings/orders",
        icon: Package,
    },
    {
        title: "Payments",
        href: "/dashboard/settings/payments",
        icon: CreditCard,
    },
    {
        title: "Shipping",
        href: "/dashboard/settings/shipping",
        icon: Truck,
    },
    {
        title: "Analytics",
        href: "/dashboard/settings/analytics",
        icon: BarChart,
    },
    {
        title: "Advanced",
        href: "/dashboard/settings/advanced",
        icon: Settings,
    },
];

interface SettingsSidebarProps extends React.HTMLAttributes<HTMLElement> {
    items?: {
        href: string;
        title: string;
        icon: any;
    }[];
}

export function SettingsSidebar({ className, ...props }: SettingsSidebarProps) {
    const pathname = usePathname();

    return (
        <aside className={cn("w-full lg:w-[250px] flex flex-col border-b lg:border-b-0 lg:border-r bg-background", className)} {...props}>
            <div className="p-4 border-b hidden lg:block">
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search settings..." className="pl-8 h-9" />
                </div>
            </div>
            <div className="flex-1 overflow-x-auto lg:overflow-y-auto py-2 scrollbar-hide">
                <nav className="flex lg:grid gap-1 px-4 text-sm font-medium">
                    {sidebarItems.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-none lg:rounded-lg px-3 py-2 transition-all hover:text-primary whitespace-nowrap border-b-2 lg:border-b-0",
                                    isActive
                                        ? "bg-muted lg:bg-muted text-primary border-pink-500 lg:border-transparent"
                                        : "text-muted-foreground border-transparent"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                <span className="uppercase text-[10px] lg:text-sm font-bold tracking-widest lg:tracking-normal">{item.title}</span>
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </aside>
    );
}
