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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

interface OrdersFormValues {
    order_prefix: string;
    starting_number: string;
    auto_fulfill: boolean;
    inventory_deduction: "on_order" | "on_fulfillment";
    low_stock_threshold: string;
    customer_confirmation: boolean;
    customer_status_updates: boolean;
    admin_notifications: boolean;
}

export default function OrdersSettingsPage() {
    const form = useForm<OrdersFormValues>({
        defaultValues: {
            order_prefix: "ORD",
            starting_number: "1000",
            auto_fulfill: false,
            inventory_deduction: "on_order",
            low_stock_threshold: "10",
            customer_confirmation: true,
            customer_status_updates: true,
            admin_notifications: true,
        },
    });

    function onSubmit(data: OrdersFormValues) {
        toast({
            title: "Orders settings updated",
            description: "Your order configuration has been saved successfully.",
        });
        console.log(data);
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Orders</h3>
                <p className="text-sm text-muted-foreground">
                    Configure order processing and fulfillment settings.
                </p>
            </div>

            <Separator />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Order Numbering */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Numbering</CardTitle>
                            <CardDescription>
                                Configure how order numbers are generated for your store.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="order_prefix"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Order Prefix</FormLabel>
                                        <FormControl>
                                            <Input placeholder="ORD" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Prefix added to all order numbers (e.g., ORD-1000)
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="starting_number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Starting Number</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="1000" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            The number from which order numbering begins
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Fulfillment Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Fulfillment Settings</CardTitle>
                            <CardDescription>
                                Manage how orders are fulfilled and inventory is tracked.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="auto_fulfill"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Auto-fulfill Orders
                                            </FormLabel>
                                            <FormDescription>
                                                Automatically mark orders as fulfilled when payment is received
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
                                name="inventory_deduction"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Inventory Deduction</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select when to deduct inventory" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="on_order">When Order is Placed</SelectItem>
                                                <SelectItem value="on_fulfillment">When Order is Fulfilled</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Choose when inventory should be deducted from stock
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="low_stock_threshold"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Low Stock Threshold</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="10" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Receive notifications when product stock falls below this number
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Order Notifications */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Notifications</CardTitle>
                            <CardDescription>
                                Configure email notifications for orders.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="customer_confirmation"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Customer Order Confirmation
                                            </FormLabel>
                                            <FormDescription>
                                                Send confirmation email to customers when order is placed
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
                                name="customer_status_updates"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Order Status Updates
                                            </FormLabel>
                                            <FormDescription>
                                                Notify customers when order status changes
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
                                name="admin_notifications"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Admin Notifications
                                            </FormLabel>
                                            <FormDescription>
                                                Receive email notifications for new orders
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
