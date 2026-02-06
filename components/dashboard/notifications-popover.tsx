"use client";

import * as React from "react";
import {
    Bell,
    Package,
    ShoppingCart,
    AlertTriangle,
    UserPlus,
    Circle,
    Check
} from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const notifications = [
    {
        id: "1",
        title: "New Order #1234",
        description: "Customer: John Doe • Total: $150.00",
        time: "2 minutes ago",
        type: "order",
        unread: true,
    },
    {
        id: "2",
        title: "Low Stock Alert",
        description: "Wireless Headphones is below threshold (5 left)",
        time: "1 hour ago",
        type: "stock",
        unread: true,
    },
    {
        id: "3",
        title: "New Customer",
        description: "Sarah Smith just created an account",
        time: "3 hours ago",
        type: "user",
        unread: false,
    },
    {
        id: "4",
        title: "Payout Successful",
        description: "Your weekly payout of $1,240.50 was processed",
        time: "Yesterday",
        type: "payment",
        unread: false,
    }
];

export function NotificationsPopover() {
    const [unreadCount, setUnreadCount] = React.useState(notifications.filter(n => n.unread).length);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-950/30 rounded-none transition-colors">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-2 right-2 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                        </span>
                    )}
                    <span className="sr-only">Notifications</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[380px] p-0 rounded-none border border-border bg-popover shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
                    <div>
                        <h3 className="text-[10px] uppercase tracking-widest font-black text-foreground">Notifications</h3>
                        <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider">You have {unreadCount} unread messages</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-[9px] uppercase tracking-widest font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        onClick={() => setUnreadCount(0)}
                    >
                        Mark all as read
                    </Button>
                </div>

                <div className="max-h-[400px] overflow-y-auto">
                    {notifications.length > 0 ? (
                        <div className="divide-y divide-border">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={cn(
                                        "flex gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer group",
                                        notification.unread && "bg-blue-50/30 dark:bg-blue-950/10"
                                    )}
                                >
                                    <div className={cn(
                                        "flex h-8 w-8 shrink-0 items-center justify-center border",
                                        notification.type === 'order' && "border-blue-600 bg-blue-50 text-blue-600",
                                        notification.type === 'stock' && "border-pink-500 bg-pink-50 text-pink-500",
                                        notification.type === 'user' && "border-emerald-500 bg-emerald-50 text-emerald-500",
                                        notification.type === 'payment' && "border-amber-500 bg-amber-50 text-amber-500",
                                    )}>
                                        {notification.type === 'order' && <ShoppingCart className="h-4 w-4" />}
                                        {notification.type === 'stock' && <AlertTriangle className="h-4 w-4" />}
                                        {notification.type === 'user' && <UserPlus className="h-4 w-4" />}
                                        {notification.type === 'payment' && <Check className="h-4 w-4" />}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <p className="text-[11px] font-black uppercase tracking-tight text-foreground">
                                                {notification.title}
                                            </p>
                                            {notification.unread && (
                                                <Circle className="h-1.5 w-1.5 fill-blue-600 text-blue-600" />
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-snug">
                                            {notification.description}
                                        </p>
                                        <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">
                                            {notification.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center p-12 text-center opacity-40">
                            <Bell className="h-8 w-8 mb-2" />
                            <p className="text-[10px] uppercase tracking-widest font-black">No notifications</p>
                        </div>
                    )}
                </div>

                <div className="p-2 border-t border-border bg-muted/20">
                    <Button variant="ghost" className="w-full h-8 text-[10px] uppercase tracking-widest font-black text-muted-foreground hover:text-foreground">
                        View All Activity
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
