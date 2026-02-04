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
import { CreditCard, DollarSign } from "lucide-react";

interface PaymentsFormValues {
    stripe_enabled: boolean;
    stripe_publishable_key: string;
    stripe_secret_key: string;
    stripe_test_mode: boolean;
    paypal_enabled: boolean;
    paypal_client_id: string;
    paypal_secret: string;
    cod_enabled: boolean;
    bank_transfer_enabled: boolean;
    default_currency: string;
    multi_currency: boolean;
    payment_capture: "authorize" | "authorize_capture";
    tax_enabled: boolean;
    tax_rate: string;
}

export default function PaymentsSettingsPage() {
    const form = useForm<PaymentsFormValues>({
        defaultValues: {
            stripe_enabled: false,
            stripe_publishable_key: "",
            stripe_secret_key: "",
            stripe_test_mode: true,
            paypal_enabled: false,
            paypal_client_id: "",
            paypal_secret: "",
            cod_enabled: true,
            bank_transfer_enabled: false,
            default_currency: "USD",
            multi_currency: false,
            payment_capture: "authorize_capture",
            tax_enabled: false,
            tax_rate: "0",
        },
    });

    function onSubmit(data: PaymentsFormValues) {
        toast({
            title: "Payment settings updated",
            description: "Your payment configuration has been saved successfully.",
        });
        console.log(data);
    }

    const stripeEnabled = form.watch("stripe_enabled");
    const paypalEnabled = form.watch("paypal_enabled");

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Payments</h3>
                <p className="text-sm text-muted-foreground">
                    Configure payment gateways and processing options.
                </p>
            </div>

            <Separator />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Stripe Payment Gateway */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5" />
                                <CardTitle>Stripe Payment Gateway</CardTitle>
                            </div>
                            <CardDescription>
                                Accept credit card payments through Stripe.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="stripe_enabled"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Enable Stripe
                                            </FormLabel>
                                            <FormDescription>
                                                Accept payments via Stripe
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

                            {stripeEnabled && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="stripe_publishable_key"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Publishable Key</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="pk_live_..." {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Your Stripe publishable API key
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="stripe_secret_key"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Secret Key</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="sk_live_..." {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Your Stripe secret API key
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="stripe_test_mode"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-base">
                                                        Test Mode
                                                    </FormLabel>
                                                    <FormDescription>
                                                        Use Stripe in test mode for development
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
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* PayPal Payment Gateway */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <DollarSign className="h-5 w-5" />
                                <CardTitle>PayPal Payment Gateway</CardTitle>
                            </div>
                            <CardDescription>
                                Accept payments through PayPal.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="paypal_enabled"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Enable PayPal
                                            </FormLabel>
                                            <FormDescription>
                                                Accept payments via PayPal
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

                            {paypalEnabled && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="paypal_client_id"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Client ID</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Your PayPal Client ID" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Your PayPal application client ID
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="paypal_secret"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Secret</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="Your PayPal Secret" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Your PayPal application secret
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Manual Payment Methods */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Manual Payment Methods</CardTitle>
                            <CardDescription>
                                Enable offline payment methods.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="cod_enabled"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Cash on Delivery
                                            </FormLabel>
                                            <FormDescription>
                                                Allow customers to pay when receiving the order
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
                                name="bank_transfer_enabled"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Bank Transfer
                                            </FormLabel>
                                            <FormDescription>
                                                Allow customers to pay via direct bank transfer
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

                    {/* Currency Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Currency Settings</CardTitle>
                            <CardDescription>
                                Configure currency and pricing options.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="default_currency"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Default Currency</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select currency" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="USD">USD - US Dollar</SelectItem>
                                                <SelectItem value="EUR">EUR - Euro</SelectItem>
                                                <SelectItem value="GBP">GBP - British Pound</SelectItem>
                                                <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                                                <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                                                <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            The default currency for your store
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="multi_currency"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Multi-Currency Support
                                            </FormLabel>
                                            <FormDescription>
                                                Allow customers to view prices in different currencies
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

                    {/* Transaction Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Transaction Settings</CardTitle>
                            <CardDescription>
                                Configure payment processing and tax settings.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="payment_capture"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Payment Capture Mode</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select capture mode" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="authorize">Authorize Only</SelectItem>
                                                <SelectItem value="authorize_capture">Authorize & Capture</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Choose when to capture payment from customers
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="tax_enabled"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Enable Tax Calculation
                                            </FormLabel>
                                            <FormDescription>
                                                Automatically calculate and add tax to orders
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

                            {form.watch("tax_enabled") && (
                                <FormField
                                    control={form.control}
                                    name="tax_rate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tax Rate (%)</FormLabel>
                                            <FormControl>
                                                <Input type="number" step="0.01" placeholder="0" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Default tax rate percentage
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
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
