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
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Plug, Mail, MessageSquare, Zap } from "lucide-react";

interface IntegrationsFormValues {
    mailchimp_enabled: boolean;
    mailchimp_api_key: string;
    mailchimp_list_id: string;
    slack_enabled: boolean;
    slack_webhook_url: string;
    slack_channel: string;
    zapier_enabled: boolean;
    zapier_webhook_url: string;
    sendgrid_enabled: boolean;
    sendgrid_api_key: string;
    sendgrid_from_email: string;
    twilio_enabled: boolean;
    twilio_account_sid: string;
    twilio_auth_token: string;
    twilio_phone_number: string;
}

export default function IntegrationsSettingsPage() {
    const form = useForm<IntegrationsFormValues>({
        defaultValues: {
            mailchimp_enabled: false,
            mailchimp_api_key: "",
            mailchimp_list_id: "",
            slack_enabled: false,
            slack_webhook_url: "",
            slack_channel: "#general",
            zapier_enabled: false,
            zapier_webhook_url: "",
            sendgrid_enabled: false,
            sendgrid_api_key: "",
            sendgrid_from_email: "",
            twilio_enabled: false,
            twilio_account_sid: "",
            twilio_auth_token: "",
            twilio_phone_number: "",
        },
    });

    function onSubmit(data: IntegrationsFormValues) {
        toast({
            title: "Integrations updated",
            description: "Your integration settings have been saved successfully.",
        });
        console.log(data);
    }

    const mailchimpEnabled = form.watch("mailchimp_enabled");
    const slackEnabled = form.watch("slack_enabled");
    const zapierEnabled = form.watch("zapier_enabled");
    const sendgridEnabled = form.watch("sendgrid_enabled");
    const twilioEnabled = form.watch("twilio_enabled");

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Integrations</h3>
                <p className="text-sm text-muted-foreground">
                    Connect your store with third-party services and apps.
                </p>
            </div>

            <Separator />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Mailchimp Integration */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Mail className="h-5 w-5" />
                                <CardTitle>Mailchimp</CardTitle>
                            </div>
                            <CardDescription>
                                Sync customers to your Mailchimp email lists.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="mailchimp_enabled"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Enable Mailchimp
                                            </FormLabel>
                                            <FormDescription>
                                                Automatically sync customers to Mailchimp
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

                            {mailchimpEnabled && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="mailchimp_api_key"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>API Key</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="Enter Mailchimp API key" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Your Mailchimp API key
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="mailchimp_list_id"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>List ID</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter Mailchimp list ID" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    The Mailchimp list to sync customers to
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Slack Integration */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <MessageSquare className="h-5 w-5" />
                                <CardTitle>Slack</CardTitle>
                            </div>
                            <CardDescription>
                                Send order notifications to your Slack workspace.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="slack_enabled"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Enable Slack
                                            </FormLabel>
                                            <FormDescription>
                                                Send notifications to Slack channels
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

                            {slackEnabled && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="slack_webhook_url"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Webhook URL</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="https://hooks.slack.com/services/..." {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Your Slack incoming webhook URL
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="slack_channel"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Channel</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="#general" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    The Slack channel to post notifications
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Zapier Integration */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Zap className="h-5 w-5" />
                                <CardTitle>Zapier</CardTitle>
                            </div>
                            <CardDescription>
                                Connect to 5000+ apps via Zapier automation.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="zapier_enabled"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Enable Zapier
                                            </FormLabel>
                                            <FormDescription>
                                                Send events to Zapier webhooks
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

                            {zapierEnabled && (
                                <FormField
                                    control={form.control}
                                    name="zapier_webhook_url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Webhook URL</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://hooks.zapier.com/hooks/catch/..." {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Your Zapier webhook URL for receiving events
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </CardContent>
                    </Card>

                    {/* SendGrid Integration */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Mail className="h-5 w-5" />
                                <CardTitle>SendGrid</CardTitle>
                            </div>
                            <CardDescription>
                                Send transactional emails via SendGrid.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="sendgrid_enabled"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Enable SendGrid
                                            </FormLabel>
                                            <FormDescription>
                                                Use SendGrid for email delivery
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

                            {sendgridEnabled && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="sendgrid_api_key"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>API Key</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="SG...." {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Your SendGrid API key
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="sendgrid_from_email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>From Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="noreply@example.com" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Default sender email address
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Twilio Integration */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <MessageSquare className="h-5 w-5" />
                                <CardTitle>Twilio</CardTitle>
                            </div>
                            <CardDescription>
                                Send SMS notifications via Twilio.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="twilio_enabled"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Enable Twilio
                                            </FormLabel>
                                            <FormDescription>
                                                Send SMS notifications to customers
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

                            {twilioEnabled && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="twilio_account_sid"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Account SID</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="AC..." {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Your Twilio Account SID
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="twilio_auth_token"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Auth Token</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="Enter auth token" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Your Twilio authentication token
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="twilio_phone_number"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone Number</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="+1234567890" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Your Twilio phone number
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
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
