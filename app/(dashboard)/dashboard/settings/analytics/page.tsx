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
import { BarChart3, TrendingUp } from "lucide-react";

interface AnalyticsFormValues {
    google_analytics_enabled: boolean;
    google_analytics_id: string;
    facebook_pixel_enabled: boolean;
    facebook_pixel_id: string;
    custom_tracking_enabled: boolean;
    custom_tracking_script: string;
    ecommerce_tracking: boolean;
    transaction_tracking: boolean;
    product_impressions: boolean;
    checkout_funnel: boolean;
    default_date_range: string;
    report_email_frequency: string;
    report_email: string;
    export_format: string;
    data_retention_days: string;
    gdpr_compliance: boolean;
    anonymize_ip: boolean;
}

export default function AnalyticsSettingsPage() {
    const form = useForm<AnalyticsFormValues>({
        defaultValues: {
            google_analytics_enabled: false,
            google_analytics_id: "",
            facebook_pixel_enabled: false,
            facebook_pixel_id: "",
            custom_tracking_enabled: false,
            custom_tracking_script: "",
            ecommerce_tracking: true,
            transaction_tracking: true,
            product_impressions: true,
            checkout_funnel: true,
            default_date_range: "30",
            report_email_frequency: "weekly",
            report_email: "",
            export_format: "csv",
            data_retention_days: "365",
            gdpr_compliance: true,
            anonymize_ip: true,
        },
    });

    function onSubmit(data: AnalyticsFormValues) {
        toast({
            title: "Analytics settings updated",
            description: "Your analytics configuration has been saved successfully.",
        });
        console.log(data);
    }

    const googleAnalyticsEnabled = form.watch("google_analytics_enabled");
    const facebookPixelEnabled = form.watch("facebook_pixel_enabled");
    const customTrackingEnabled = form.watch("custom_tracking_enabled");

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Analytics</h3>
                <p className="text-sm text-muted-foreground">
                    Configure analytics tracking and reporting preferences.
                </p>
            </div>

            <Separator />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Google Analytics */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5" />
                                <CardTitle>Google Analytics 4</CardTitle>
                            </div>
                            <CardDescription>
                                Track your store performance with Google Analytics.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="google_analytics_enabled"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Enable Google Analytics
                                            </FormLabel>
                                            <FormDescription>
                                                Track visitors and conversions with GA4
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

                            {googleAnalyticsEnabled && (
                                <FormField
                                    control={form.control}
                                    name="google_analytics_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Measurement ID</FormLabel>
                                            <FormControl>
                                                <Input placeholder="G-XXXXXXXXXX" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Your Google Analytics 4 Measurement ID
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </CardContent>
                    </Card>

                    {/* Facebook Pixel */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                <CardTitle>Facebook Pixel</CardTitle>
                            </div>
                            <CardDescription>
                                Track conversions and optimize Facebook ads.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="facebook_pixel_enabled"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Enable Facebook Pixel
                                            </FormLabel>
                                            <FormDescription>
                                                Track Facebook ad conversions
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

                            {facebookPixelEnabled && (
                                <FormField
                                    control={form.control}
                                    name="facebook_pixel_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Pixel ID</FormLabel>
                                            <FormControl>
                                                <Input placeholder="123456789012345" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Your Facebook Pixel ID
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </CardContent>
                    </Card>

                    {/* Custom Tracking */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Custom Tracking Scripts</CardTitle>
                            <CardDescription>
                                Add custom analytics or tracking scripts.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="custom_tracking_enabled"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Enable Custom Tracking
                                            </FormLabel>
                                            <FormDescription>
                                                Add custom JavaScript tracking code
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

                            {customTrackingEnabled && (
                                <FormField
                                    control={form.control}
                                    name="custom_tracking_script"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tracking Script</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="<script>...</script>"
                                                    className="font-mono text-sm"
                                                    rows={6}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Paste your custom tracking script here
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </CardContent>
                    </Card>

                    {/* E-commerce Tracking */}
                    <Card>
                        <CardHeader>
                            <CardTitle>E-commerce Tracking</CardTitle>
                            <CardDescription>
                                Configure enhanced e-commerce tracking features.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="ecommerce_tracking"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Enhanced E-commerce
                                            </FormLabel>
                                            <FormDescription>
                                                Track product views, cart actions, and purchases
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
                                name="transaction_tracking"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Transaction Tracking
                                            </FormLabel>
                                            <FormDescription>
                                                Track completed transactions and revenue
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
                                name="product_impressions"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Product Impressions
                                            </FormLabel>
                                            <FormDescription>
                                                Track when products are viewed
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
                                name="checkout_funnel"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Checkout Funnel
                                            </FormLabel>
                                            <FormDescription>
                                                Track checkout process steps
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
                        </CardContent>
                    </Card>

                    {/* Report Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Report Settings</CardTitle>
                            <CardDescription>
                                Configure automated reports and data export.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="default_date_range"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Default Date Range</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select date range" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="7">Last 7 days</SelectItem>
                                                <SelectItem value="30">Last 30 days</SelectItem>
                                                <SelectItem value="90">Last 90 days</SelectItem>
                                                <SelectItem value="365">Last year</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Default time period for analytics reports
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="report_email_frequency"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Report Frequency</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select frequency" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="daily">Daily</SelectItem>
                                                <SelectItem value="weekly">Weekly</SelectItem>
                                                <SelectItem value="monthly">Monthly</SelectItem>
                                                <SelectItem value="never">Never</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            How often to receive analytics reports via email
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="report_email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Report Email Address</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="reports@example.com" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Email address to receive analytics reports
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="export_format"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Export Format</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select format" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="csv">CSV</SelectItem>
                                                <SelectItem value="excel">Excel</SelectItem>
                                                <SelectItem value="pdf">PDF</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Preferred format for data exports
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Data Privacy */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Data Privacy & Retention</CardTitle>
                            <CardDescription>
                                Configure data retention and privacy compliance.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="data_retention_days"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Data Retention Period (Days)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="365" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            How long to retain analytics data
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="gdpr_compliance"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                GDPR Compliance Mode
                                            </FormLabel>
                                            <FormDescription>
                                                Enable GDPR-compliant data collection
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
                                name="anonymize_ip"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Anonymize IP Addresses
                                            </FormLabel>
                                            <FormDescription>
                                                Anonymize visitor IP addresses for privacy
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
