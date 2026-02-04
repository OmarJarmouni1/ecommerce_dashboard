"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Bell, Moon, Sun, Search, User } from "lucide-react";
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

export function Header() {
    const { setTheme, theme } = useTheme();
    const { user, logout } = useAuth();

    return (
        <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
            <div className="flex flex-1 items-center gap-4">
                <form className="hidden sm:block lg:w-96">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-blue-600 transition-colors" />
                        <Input
                            type="search"
                            placeholder="Search everything..."
                            className="w-full h-10 bg-muted/50 border-transparent focus:border-blue-600 rounded-none pl-10 transition-all duration-200"
                        />
                        {/* Pink Accent Line for focus */}
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-focus-within:w-full" />
                    </div>
                </form>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-950/30 rounded-none transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-none transition-colors"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>

                <div className="h-6 w-[1px] bg-border mx-2" />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 gap-2 flex items-center px-2 hover:bg-muted rounded-none">
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
            </div>
        </header>
    );
}
