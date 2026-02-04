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
import { Truck } from "lucide-react";

interface ShippingFormValues {
    free_shipping_enabled: boolean;
    free_shipping_threshold: string;
    standard_shipping_rate: string;
    express_shipping_rate: string;
    overnight_shipping_rate: string;
    carrier_integration: boolean;
    carrier_provider: string;
    carrier_api_key: string;
    real_time_rates: boolean;
    weight_unit: "kg" | "lb";
    dimension_unit: "cm" | "in";
    default_package_weight: string;
    default_package_length: string;
    default_package_width: string;
    default_package_height: string;
}

export default function ShippingSettingsPage() {
    const form = useForm<ShippingFormValues>({
        defaultValues: {
            free_shipping_enabled: false,
            free_shipping_threshold: "100",
            standard_shipping_rate: "5.99",
            express_shipping_rate: "12.99",
            overnight_shipping_rate: "24.99",
            carrier_integration: false,
            carrier_provider: "ups",
            carrier_api_key: "",
            real_time_rates: false,
            weight_unit: "kg",
            dimension_unit: "cm",
            default_package_weight: "1",
            default_package_length: "30",
            default_package_width: "20",
            default_package_height: "10",
        },
    });

    function onSubmit(data: ShippingFormValues) {
        toast({
            title: "Shipping settings updated",
            description: "Your shipping configuration has been saved successfully.",
        });
        console.log(data);
    }

    const freeShippingEnabled = form.watch("free_shipping_enabled");
    const carrierIntegration = form.watch("carrier_integration");

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Shipping</h3>
                <p className="text-sm text-muted-foreground">
                    Configure shipping zones, rates, and carrier integrations.
                </p>
            </div>

            <Separator />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Free Shipping */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Free Shipping</CardTitle>
                            <CardDescription>
                                Offer free shipping based on order value.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="free_shipping_enabled"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Enable Free Shipping
                                            </FormLabel>
                                            <FormDescription>
                                                Offer free shipping when order meets threshold
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

                            {freeShippingEnabled && (
                                <FormField
                                    control={form.control}
                                    name="free_shipping_threshold"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Minimum Order Value</FormLabel>
                                            <FormControl>
                                                <Input type="number" step="0.01" placeholder="100" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Orders above this amount qualify for free shipping
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </CardContent>
                    </Card>

                    {/* Shipping Methods */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Shipping Methods & Rates</CardTitle>
                            <CardDescription>
                                Configure shipping methods and their flat rates.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="standard_shipping_rate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Standard Shipping Rate</FormLabel>
                                        <FormControl>
                                            <Input type="number" step="0.01" placeholder="5.99" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Flat rate for standard shipping (5-7 business days)
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="express_shipping_rate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Express Shipping Rate</FormLabel>
                                        <FormControl>
                                            <Input type="number" step="0.01" placeholder="12.99" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Flat rate for express shipping (2-3 business days)
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="overnight_shipping_rate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Overnight Shipping Rate</FormLabel>
                                        <FormControl>
                                            <Input type="number" step="0.01" placeholder="24.99" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Flat rate for overnight shipping (next business day)
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Carrier Integration */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Truck className="h-5 w-5" />
                                <CardTitle>Carrier Integration</CardTitle>
                            </div>
                            <CardDescription>
                                Connect with shipping carriers for real-time rates and label printing.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="carrier_integration"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Enable Carrier Integration
                                            </FormLabel>
                                            <FormDescription>
                                                Connect with shipping carriers like UPS, FedEx, USPS
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

                            {carrierIntegration && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="carrier_provider"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Carrier Provider</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select carrier" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="ups">UPS</SelectItem>
                                                        <SelectItem value="fedex">FedEx</SelectItem>
                                                        <SelectItem value="usps">USPS</SelectItem>
                                                        <SelectItem value="dhl">DHL</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>
                                                    Choose your preferred shipping carrier
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="carrier_api_key"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>API Key</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="Enter carrier API key" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Your carrier API key for integration
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="real_time_rates"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-base">
                                                        Real-Time Rate Calculation
                                                    </FormLabel>
                                                    <FormDescription>
                                                        Calculate shipping rates in real-time from carrier
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

                    {/* Package Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Package Settings</CardTitle>
                            <CardDescription>
                                Configure default package dimensions and units.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="weight_unit"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Weight Unit</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select unit" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="kg">Kilograms (kg)</SelectItem>
                                                    <SelectItem value="lb">Pounds (lb)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="dimension_unit"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Dimension Unit</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select unit" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="cm">Centimeters (cm)</SelectItem>
                                                    <SelectItem value="in">Inches (in)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="default_package_weight"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Default Package Weight</FormLabel>
                                        <FormControl>
                                            <Input type="number" step="0.01" placeholder="1" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Default weight for packages (in selected unit)
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-3 gap-4">
                                <FormField
                                    control={form.control}
                                    name="default_package_length"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Length</FormLabel>
                                            <FormControl>
                                                <Input type="number" step="0.01" placeholder="30" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="default_package_width"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Width</FormLabel>
                                            <FormControl>
                                                <Input type="number" step="0.01" placeholder="20" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="default_package_height"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Height</FormLabel>
                                            <FormControl>
                                                <Input type="number" step="0.01" placeholder="10" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Default package dimensions (in selected unit)
                            </p>
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
