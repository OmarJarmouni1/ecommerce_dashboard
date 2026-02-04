"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface NotificationsFormValues {
    email_order_received: boolean;
    email_order_status: boolean;
    email_low_stock: boolean;
    email_new_customer: boolean;
    security_alerts: boolean;
    marketing_emails: boolean;
    email_digest: "realtime" | "daily" | "weekly";
}

export default function NotificationsSettingsPage() {
    const form = useForm<NotificationsFormValues>({
        defaultValues: {
            email_order_received: true,
            email_order_status: true,
            email_low_stock: false,
            email_new_customer: true,
            security_alerts: true,
            marketing_emails: false,
            email_digest: "realtime",
        },
    });

    function onSubmit(data: NotificationsFormValues) {
        toast({
            title: "Notifications settings updated",
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
                <h3 className="text-2xl font-medium">Notifications</h3>
                <p className="text-sm text-muted-foreground">
                    Configure how you receive alerts and updates.
                </p>
            </div>
            <Separator />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Email Notifications</CardTitle>
                            <CardDescription>Select which emails you would like to receive.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="space-y-4">
                                <h4 className="text-sm font-medium text-muted-foreground">Orders</h4>
                                <FormField
                                    control={form.control}
                                    name="email_order_received"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">New Order Received</FormLabel>
                                                <FormDescription>
                                                    Get notified when a customer places a new order.
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
                                    name="email_order_status"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">Order Status Changed</FormLabel>
                                                <FormDescription>
                                                    When an order is shipped, delivered, or cancelled.
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
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-sm font-medium text-muted-foreground">Inventory</h4>
                                <FormField
                                    control={form.control}
                                    name="email_low_stock"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">Low Stock Alert</FormLabel>
                                                <FormDescription>
                                                    Get notified when product quantity is below threshold.
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
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-sm font-medium text-muted-foreground">General</h4>
                                <FormField
                                    control={form.control}
                                    name="marketing_emails"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>
                                                    Marketing Emails
                                                </FormLabel>
                                                <FormDescription>
                                                    Receive emails about new products, features, and detailed updates.
                                                </FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-sm font-medium text-muted-foreground">Frequency</h4>
                                <FormField
                                    control={form.control}
                                    name="email_digest"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel>Email Frequency</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="realtime" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            Real-time (as they happen)
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="daily" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            Daily digest (once per day)
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="weekly" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            Weekly digest (once per week)
                                                        </FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="border-t px-6 py-4">
                            <Button type="submit">Save Preferences</Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </div>
    );
}
