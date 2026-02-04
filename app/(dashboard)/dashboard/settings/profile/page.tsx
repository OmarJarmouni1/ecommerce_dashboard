"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { Shield, Smartphone, Key } from "lucide-react";

const profileFormSchema = z.object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().optional(),
    title: z.string().max(100).optional(),
    bio: z.string().max(500).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    title: "Store Manager",
    bio: "I manage the daily operations of the store.",
};

export function ProfileForm() {
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: "onChange",
    });

    function onSubmit(data: ProfileFormValues) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 code">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Update your photo and personal details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            <div className="flex flex-col items-center gap-4">
                                <Avatar className="h-32 w-32 border-2 border-border">
                                    <AvatarImage src="/placeholder-avatar.jpg" alt="Avatar" />
                                    <AvatarFallback className="text-4xl">JD</AvatarFallback>
                                </Avatar>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">Change Photo</Button>
                                    <Button variant="ghost" size="sm" className="text-destructive">Remove</Button>
                                </div>
                            </div>

                            <div className="flex-1 grid gap-4 w-full">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>First Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Doe" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <Input placeholder="john@example.com" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                This is the email you use to login.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone Number</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="+1 (555) 123-4567" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Job Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Store Manager" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Bio</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Tell us a little bit about yourself"
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Brief description for your profile. URLs are hyperlinked.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 border-t px-6 py-4">
                        <Button variant="outline" type="button" onClick={() => form.reset()}>Cancel</Button>
                        <Button type="submit">Save Changes</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}

export function SecuritySettings() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Ensure your account is using a long, random password to stay secure.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="current">Current Password</Label>
                        <Input id="current" type="password" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="new">New Password</Label>
                        <Input id="new" type="password" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="confirm">Confirm Password</Label>
                        <Input id="confirm" type="password" />
                    </div>
                    {/* Password strength meter typically goes here */}
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Update Password</Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <CardTitle>Two-Factor Authentication</CardTitle>
                            <CardDescription>Add an extra layer of security to your account.</CardDescription>
                        </div>
                        <Switch />
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 rounded-md border p-4">
                        <Smartphone className="h-8 w-8 text-muted-foreground" />
                        <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">Authenticator App</p>
                            <p className="text-sm text-muted-foreground">Use an app like Google Authenticator or Authy.</p>
                        </div>
                        <Button variant="outline" size="sm">Setup</Button>
                    </div>
                    <div className="flex items-center gap-4 rounded-md border p-4">
                        <Key className="h-8 w-8 text-muted-foreground" />
                        <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">Backup Codes</p>
                            <p className="text-sm text-muted-foreground">Recovery codes in case you lose access to your device.</p>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default function ProfileSettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-2xl font-medium">Profile</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your personal information and security settings.
                </p>
            </div>
            <Separator />
            <Tabs defaultValue="personal" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="personal">Personal Information</TabsTrigger>
                    <TabsTrigger value="security">Password & Security</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>
                <TabsContent value="personal">
                    <ProfileForm />
                </TabsContent>
                <TabsContent value="security">
                    <SecuritySettings />
                </TabsContent>
                <TabsContent value="preferences">
                    <Card>
                        <CardHeader>
                            <CardTitle>Language & Region</CardTitle>
                            <CardDescription>Manage your language and regional settings.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Language</Label>
                                    <Input defaultValue="English" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Timezone</Label>
                                    <Input defaultValue="(UTC-08:00) Pacific Time" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
