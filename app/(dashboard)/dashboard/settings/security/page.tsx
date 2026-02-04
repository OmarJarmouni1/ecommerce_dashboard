"use client";

import { useState } from "react";
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
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Shield, Key, Webhook, Copy, Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface SecurityFormValues {
    two_factor_required: boolean;
    session_timeout: string;
    ip_whitelist_enabled: boolean;
    ip_whitelist: string;
    cors_enabled: boolean;
    allowed_origins: string;
}

interface ApiKey {
    id: string;
    name: string;
    key: string;
    created: string;
    lastUsed: string;
}

interface WebhookEndpoint {
    id: string;
    url: string;
    events: string[];
    status: "active" | "inactive";
}

export default function SecuritySettingsPage() {
    const [apiKeys, setApiKeys] = useState<ApiKey[]>([
        {
            id: "1",
            name: "Production API",
            key: "sk_live_xxxxxxxxxxxxxxxxxxxx",
            created: "2024-01-15",
            lastUsed: "2024-02-03",
        },
    ]);

    const [webhooks, setWebhooks] = useState<WebhookEndpoint[]>([
        {
            id: "1",
            url: "https://example.com/webhook",
            events: ["order.created", "order.updated"],
            status: "active",
        },
    ]);

    const [showKeys, setShowKeys] = useState<{ [key: string]: boolean }>({});
    const [newWebhookUrl, setNewWebhookUrl] = useState("");

    const form = useForm<SecurityFormValues>({
        defaultValues: {
            two_factor_required: false,
            session_timeout: "30",
            ip_whitelist_enabled: false,
            ip_whitelist: "",
            cors_enabled: true,
            allowed_origins: "https://example.com",
        },
    });

    function onSubmit(data: SecurityFormValues) {
        toast({
            title: "Security settings updated",
            description: "Your security configuration has been saved successfully.",
        });
        console.log(data);
    }

    const generateApiKey = () => {
        const newKey: ApiKey = {
            id: Date.now().toString(),
            name: `API Key ${apiKeys.length + 1}`,
            key: `sk_live_${Math.random().toString(36).substring(2, 24)}`,
            created: new Date().toISOString().split("T")[0],
            lastUsed: "Never",
        };
        setApiKeys([...apiKeys, newKey]);
        toast({
            title: "API Key generated",
            description: "A new API key has been created. Make sure to copy it now.",
        });
    };

    const deleteApiKey = (id: string) => {
        setApiKeys(apiKeys.filter((key) => key.id !== id));
        toast({
            title: "API Key deleted",
            description: "The API key has been permanently deleted.",
        });
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied to clipboard",
            description: "API key has been copied to your clipboard.",
        });
    };

    const toggleKeyVisibility = (id: string) => {
        setShowKeys({ ...showKeys, [id]: !showKeys[id] });
    };

    const addWebhook = () => {
        if (!newWebhookUrl) {
            toast({
                title: "Error",
                description: "Please enter a webhook URL",
                variant: "destructive",
            });
            return;
        }

        const newWebhook: WebhookEndpoint = {
            id: Date.now().toString(),
            url: newWebhookUrl,
            events: ["order.created"],
            status: "active",
        };

        setWebhooks([...webhooks, newWebhook]);
        setNewWebhookUrl("");
        toast({
            title: "Webhook added",
            description: "New webhook endpoint has been configured.",
        });
    };

    const deleteWebhook = (id: string) => {
        setWebhooks(webhooks.filter((webhook) => webhook.id !== id));
        toast({
            title: "Webhook deleted",
            description: "The webhook endpoint has been removed.",
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Security</h3>
                <p className="text-sm text-muted-foreground">
                    Advanced security settings and access controls.
                </p>
            </div>

            <Separator />

            {/* API Keys */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Key className="h-5 w-5" />
                            <CardTitle>API Keys</CardTitle>
                        </div>
                        <Button onClick={generateApiKey} size="sm">
                            <Plus className="mr-2 h-4 w-4" />
                            Generate Key
                        </Button>
                    </div>
                    <CardDescription>
                        Manage API keys for programmatic access to your store.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Key</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead>Last Used</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {apiKeys.map((apiKey) => (
                                <TableRow key={apiKey.id}>
                                    <TableCell className="font-medium">{apiKey.name}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <code className="text-sm">
                                                {showKeys[apiKey.id]
                                                    ? apiKey.key
                                                    : apiKey.key.substring(0, 12) + "••••••••••••"}
                                            </code>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => toggleKeyVisibility(apiKey.id)}
                                            >
                                                {showKeys[apiKey.id] ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => copyToClipboard(apiKey.key)}
                                            >
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell>{apiKey.created}</TableCell>
                                    <TableCell>{apiKey.lastUsed}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => deleteApiKey(apiKey.id)}
                                        >
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Webhooks */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Webhook className="h-5 w-5" />
                        <CardTitle>Webhooks</CardTitle>
                    </div>
                    <CardDescription>
                        Configure webhook endpoints to receive real-time event notifications.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-4">
                        <Input
                            placeholder="https://example.com/webhook"
                            value={newWebhookUrl}
                            onChange={(e) => setNewWebhookUrl(e.target.value)}
                        />
                        <Button onClick={addWebhook}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Webhook
                        </Button>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>URL</TableHead>
                                <TableHead>Events</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {webhooks.map((webhook) => (
                                <TableRow key={webhook.id}>
                                    <TableCell className="font-mono text-sm">{webhook.url}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-1">
                                            {webhook.events.map((event) => (
                                                <Badge key={event} variant="outline">
                                                    {event}
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                webhook.status === "active" ? "default" : "secondary"
                                            }
                                        >
                                            {webhook.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => deleteWebhook(webhook.id)}
                                        >
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Security Settings Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Shield className="h-5 w-5" />
                                <CardTitle>Access Control</CardTitle>
                            </div>
                            <CardDescription>
                                Configure authentication and access control settings.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="two_factor_required"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Require Two-Factor Authentication
                                            </FormLabel>
                                            <FormDescription>
                                                Require all team members to enable 2FA
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
                                name="session_timeout"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Session Timeout (minutes)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="30" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Automatically log out users after this period of inactivity
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="ip_whitelist_enabled"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                IP Whitelisting
                                            </FormLabel>
                                            <FormDescription>
                                                Restrict access to specific IP addresses
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

                            {form.watch("ip_whitelist_enabled") && (
                                <FormField
                                    control={form.control}
                                    name="ip_whitelist"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Allowed IP Addresses</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="192.168.1.1&#10;10.0.0.1"
                                                    rows={4}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Enter one IP address per line
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>CORS Settings</CardTitle>
                            <CardDescription>
                                Configure Cross-Origin Resource Sharing for API access.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="cors_enabled"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Enable CORS
                                            </FormLabel>
                                            <FormDescription>
                                                Allow cross-origin API requests
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

                            {form.watch("cors_enabled") && (
                                <FormField
                                    control={form.control}
                                    name="allowed_origins"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Allowed Origins</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="https://example.com&#10;https://app.example.com"
                                                    rows={4}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Enter one origin URL per line
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
