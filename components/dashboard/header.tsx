"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Bell, Moon, Sun, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { NotificationsPopover } from "@/components/dashboard/notifications-popover";
import { MobileNav } from "@/components/dashboard/mobile-nav";

export function Header() {
    const { setTheme, theme } = useTheme();
    const { user, logout } = useAuth();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="flex h-14 sm:h-16 items-center gap-2 sm:gap-4 border-b bg-background px-3 sm:px-4 md:px-6">
            <MobileNav />
            <div className="flex flex-1 items-center gap-2 sm:gap-4 min-w-0">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="sm:hidden h-11 w-11 min-h-[44px] min-w-[44px] rounded-none text-muted-foreground">
                            <Search className="h-5 w-5" />
                            <span className="sr-only">Open search</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="top" className="rounded-none pt-12">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search everything..."
                                className="w-full h-12 text-base bg-muted/50 rounded-none pl-10"
                                autoFocus
                            />
                        </div>
                    </SheetContent>
                </Sheet>
                <form className="hidden sm:block w-full max-w-[200px] md:max-w-[260px] lg:max-w-[300px]">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-blue-600 transition-colors shrink-0" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full h-9 sm:h-10 bg-muted/50 border-transparent focus:border-blue-600 rounded-none pl-9 sm:pl-10 text-sm transition-all duration-200"
                        />
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-focus-within:w-full" />
                    </div>
                </form>
            </div>
            <div className="flex items-center gap-2">
                <NotificationsPopover />
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 min-h-[44px] min-w-[44px] sm:h-9 sm:w-9 sm:min-h-0 sm:min-w-0 text-muted-foreground hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-none transition-colors"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>

                <div className="h-6 w-px bg-border mx-2" />

                {mounted ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 min-h-[44px] gap-2 flex items-center px-2 hover:bg-muted rounded-none">
                                <span className="text-xs font-black uppercase tracking-widest text-foreground/70 hidden sm:block">
                                    {user?.firstName}
                                </span>
                                <div className="relative h-8 w-8 rounded-none overflow-hidden border border-border">
                                    <Avatar className="h-full w-full rounded-none">
                                        <AvatarImage src={user?.avatarUrl} alt={user?.firstName} />
                                        <AvatarFallback className="rounded-none bg-blue-600 text-white text-xs">
                                            {user?.firstName?.[0]}{user?.lastName?.[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-none border border-border shadow-xl p-2 w-56 bg-popover">
                            <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold px-2 py-1.5">My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator className="my-1 bg-border" />
                            <DropdownMenuItem asChild className="rounded-none focus:bg-blue-50 focus:text-blue-700 font-bold uppercase text-[10px] tracking-widest cursor-pointer mt-1">
                                <Link href="/dashboard/settings/profile">Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="rounded-none focus:bg-pink-50 focus:text-pink-600 font-bold uppercase text-[10px] tracking-widest cursor-pointer mt-1">
                                <Link href="/dashboard/settings">Settings</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="my-1 bg-border" />
                            <DropdownMenuItem
                                onClick={() => logout()}
                                className="rounded-none focus:bg-muted focus:text-foreground font-bold uppercase text-[10px] tracking-widest cursor-pointer mt-1"
                            >
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <div className="h-10 w-10 flex items-center justify-center">
                        <div className="h-8 w-8 animate-pulse bg-muted rounded-none" />
                    </div>
                )}
            </div>
        </header>
    );
}
