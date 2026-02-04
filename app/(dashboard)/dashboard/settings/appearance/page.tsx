"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { Moon, Sun, Monitor } from "lucide-react";
import { useEffect } from "react";

const appearanceFormSchema = z.object({
    theme: z.enum(["light", "dark", "system"]),
    font_size: z.string().optional(),
    density: z.string().optional(),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

export default function AppearanceSettingsPage() {
    // Access next-themes
    const { theme, setTheme } = useTheme();

    const form = useForm<AppearanceFormValues>({
        resolver: zodResolver(appearanceFormSchema),
        defaultValues: {
            theme: (theme as "light" | "dark" | "system") || "system",
            font_size: "medium",
            density: "comfortable",
        },
    });

    // Sync form with current theme when it loads
    useEffect(() => {
        if (theme) {
            form.setValue("theme", theme as "light" | "dark" | "system");
        }
    }, [theme, form]);

    function onSubmit(data: AppearanceFormValues) {
        // Update theme immediately
        setTheme(data.theme);

        toast({
            title: "Appearance updated",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 code">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        });
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-2xl font-medium">Appearance</h3>
                <p className="text-sm text-muted-foreground">
                    Customize the look and feel of your dashboard.
                </p>
            </div>
            <Separator />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Theme & Mode</CardTitle>
                            <CardDescription>Select your preferred color scheme.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <FormField
                                control={form.control}
                                name="theme"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>Interface Theme</FormLabel>
                                        <FormDescription>
                                            Select the theme for the dashboard interface.
                                        </FormDescription>
                                        <FormMessage />
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            value={field.value}
                                            className="grid max-w-md grid-cols-3 gap-8 pt-2"
                                        >
                                            <FormItem>
                                                <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                                                    <FormControl>
                                                        <RadioGroupItem value="light" className="sr-only" />
                                                    </FormControl>
                                                    <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent cursor-pointer">
                                                        <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                                                            <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                                                <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                                                                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                                            </div>
                                                            <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                                                <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                                                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                                            </div>
                                                            <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                                                <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                                                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="block w-full p-2 text-center font-normal">
                                                        Light
                                                    </div>
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem>
                                                <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                                                    <FormControl>
                                                        <RadioGroupItem value="dark" className="sr-only" />
                                                    </FormControl>
                                                    <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground cursor-pointer">
                                                        <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                                                            <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                                                <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                                                                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                                            </div>
                                                            <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                                                <div className="h-4 w-4 rounded-full bg-slate-400" />
                                                                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                                            </div>
                                                            <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                                                <div className="h-4 w-4 rounded-full bg-slate-400" />
                                                                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="block w-full p-2 text-center font-normal">
                                                        Dark
                                                    </div>
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem>
                                                <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                                                    <FormControl>
                                                        <RadioGroupItem value="system" className="sr-only" />
                                                    </FormControl>
                                                    <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground cursor-pointer">
                                                        <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                                                            <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                                                <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                                                                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                                            </div>
                                                            <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                                                <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                                                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                                            </div>
                                                            <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                                                <div className="h-4 w-4 rounded-full bg-slate-400" />
                                                                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="block w-full p-2 text-center font-normal">
                                                        System
                                                    </div>
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Display Options</CardTitle>
                            <CardDescription>Adjust font size and density.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="font_size"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Font Size</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="small">Small</SelectItem>
                                                    <SelectItem value="medium">Medium</SelectItem>
                                                    <SelectItem value="large">Large</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="density"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Density</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="comfortable">Comfortable</SelectItem>
                                                    <SelectItem value="compact">Compact</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="border-t px-6 py-4">
                            <Button type="submit">Save Changes</Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </div>
    );
}
