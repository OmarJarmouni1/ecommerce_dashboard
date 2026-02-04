"use client";

import { useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Settings2, Database, FileDown, FileUp, Code, AlertTriangle } from "lucide-react";

interface AdvancedFormValues {
    maintenance_mode: boolean;
    debug_mode: boolean;
    cache_enabled: boolean;
    cache_ttl: string;
    rate_limiting: boolean;
    rate_limit_requests: string;
    rate_limit_window: string;
    custom_css: string;
    custom_js: string;
    seo_meta_title: string;
    seo_meta_description: string;
    robots_txt: string;
}

export default function AdvancedSettingsPage() {
    const form = useForm<AdvancedFormValues>({
        defaultValues: {
            maintenance_mode: false,
            debug_mode: false,
            cache_enabled: true,
            cache_ttl: "3600",
            rate_limiting: true,
            rate_limit_requests: "100",
            rate_limit_window: "60",
            custom_css: "",
            custom_js: "",
            seo_meta_title: "My E-commerce Store",
            seo_meta_description: "Shop the best products at great prices",
            robots_txt: "User-agent: *\nAllow: /",
        },
    });

    function onSubmit(data: AdvancedFormValues) {
        toast({
            title: "Advanced settings updated",
            description: "Your system configuration has been saved successfully.",
        });
        console.log(data);
    }

    const handleBackup = () => {
        toast({
            title: "Backup initiated",
            description: "Your store data is being backed up. You'll receive an email when complete.",
        });
    };

    const handleRestore = () => {
        toast({
            title: "Restore initiated",
            description: "Your store data is being restored from the selected backup.",
        });
    };

    const handleExport = () => {
        toast({
            title: "Export started",
            description: "Your data is being exported. Download will start shortly.",
        });
    };

    const handleImport = () => {
        toast({
            title: "Import started",
            description: "Your data is being imported. This may take a few minutes.",
        });
    };

    const handleClearCache = () => {
        toast({
            title: "Cache cleared",
            description: "All cached data has been cleared successfully.",
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Advanced</h3>
                <p className="text-sm text-muted-foreground">
                    Advanced configuration options and developer settings.
                </p>
            </div>

            <Separator />

            {/* Backup & Restore */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Database className="h-5 w-5" />
                        <CardTitle>Backup & Restore</CardTitle>
                    </div>
                    <CardDescription>
                        Create backups and restore your store data.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-4">
                        <Button onClick={handleBackup} variant="outline">
                            <Database className="mr-2 h-4 w-4" />
                            Create Backup
                        </Button>
                        <Button onClick={handleRestore} variant="outline">
                            <FileUp className="mr-2 h-4 w-4" />
                            Restore from Backup
                        </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Last backup: February 3, 2024 at 10:30 AM
                    </p>
                </CardContent>
            </Card>

            {/* Import & Export */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <FileDown className="h-5 w-5" />
                        <CardTitle>Import & Export</CardTitle>
                    </div>
                    <CardDescription>
                        Import or export your store data in various formats.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-4">
                        <Button onClick={handleExport} variant="outline">
                            <FileDown className="mr-2 h-4 w-4" />
                            Export Data
                        </Button>
                        <Button onClick={handleImport} variant="outline">
                            <FileUp className="mr-2 h-4 w-4" />
                            Import Data
                        </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Supported formats: CSV, JSON, XML
                    </p>
                </CardContent>
            </Card>

            {/* System Settings Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* System Configuration */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Settings2 className="h-5 w-5" />
                                <CardTitle>System Configuration</CardTitle>
                            </div>
                            <CardDescription>
                                Configure system-level settings and performance options.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="maintenance_mode"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 border-orange-200 dark:border-orange-900">
                                        <div className="space-y-0.5">
                                            <div className="flex items-center gap-2">
                                                <AlertTriangle className="h-4 w-4 text-orange-500" />
                                                <FormLabel className="text-base">
                                                    Maintenance Mode
                                                </FormLabel>
                                            </div>
                                            <FormDescription>
                                                Temporarily disable store access for maintenance
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="debug_mode"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Debug Mode
                                            </FormLabel>
                                            <FormDescription>
                                                Enable detailed error logging (development only)
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="cache_enabled"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Enable Caching
                                            </FormLabel>
                                            <FormDescription>
                                                Cache data to improve performance
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {form.watch("cache_enabled") && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="cache_ttl"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Cache TTL (seconds)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="3600" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    How long to cache data before refreshing
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="button" variant="outline" onClick={handleClearCache}>
                                        Clear Cache
                                    </Button>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Rate Limiting */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Rate Limiting</CardTitle>
                            <CardDescription>
                                Protect your API from abuse with rate limiting.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="rate_limiting"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Enable Rate Limiting
                                            </FormLabel>
                                            <FormDescription>
                                                Limit API requests per time window
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {form.watch("rate_limiting") && (
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="rate_limit_requests"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Max Requests</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="100" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Maximum requests allowed
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="rate_limit_window"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Time Window (seconds)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="60" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Time window for rate limit
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Custom Code */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Code className="h-5 w-5" />
                                <CardTitle>Custom Code</CardTitle>
                            </div>
                            <CardDescription>
                                Add custom CSS and JavaScript to your store.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="custom_css"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Custom CSS</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder=".custom-class { color: red; }"
                                                className="font-mono text-sm"
                                                rows={6}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Add custom styles to your storefront
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="custom_js"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Custom JavaScript</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="console.log('Custom script');"
                                                className="font-mono text-sm"
                                                rows={6}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Add custom JavaScript to your storefront
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* SEO Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>SEO Configuration</CardTitle>
                            <CardDescription>
                                Configure SEO meta tags and robots.txt.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="seo_meta_title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Default Meta Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="My E-commerce Store" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Default title tag for your store
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="seo_meta_description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Default Meta Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Shop the best products..."
                                                rows={3}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Default meta description for your store
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="robots_txt"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Robots.txt</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="User-agent: *&#10;Allow: /"
                                                className="font-mono text-sm"
                                                rows={6}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Configure search engine crawling rules
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button type="submit">Save Changes</Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </div>
    );
}
