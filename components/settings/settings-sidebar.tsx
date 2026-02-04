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
        <aside className={cn("hidden w-[250px] flex-col border-r bg-background lg:flex", className)} {...props}>
            <div className="p-4 border-b">
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search settings..." className="pl-8 h-9" />
                </div>
            </div>
            <div className="flex-1 overflow-auto py-2">
                <nav className="grid gap-1 px-4 text-sm font-medium">
                    {sidebarItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                    pathname === item.href
                                        ? "bg-muted text-primary"
                                        : "text-muted-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {item.title}
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </aside>
    );
}
