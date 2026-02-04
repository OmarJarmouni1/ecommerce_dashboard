"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Users, Plus, Trash2, Mail, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: "admin" | "manager" | "staff";
    status: "active" | "pending" | "inactive";
}

export default function TeamSettingsPage() {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
        {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
            role: "admin",
            status: "active",
        },
        {
            id: "2",
            name: "Jane Smith",
            email: "jane@example.com",
            role: "manager",
            status: "active",
        },
        {
            id: "3",
            name: "Bob Johnson",
            email: "bob@example.com",
            role: "staff",
            status: "pending",
        },
    ]);

    const [newMemberEmail, setNewMemberEmail] = useState("");
    const [newMemberRole, setNewMemberRole] = useState<"admin" | "manager" | "staff">("staff");

    const handleInvite = () => {
        if (!newMemberEmail) {
            toast({
                title: "Error",
                description: "Please enter an email address",
                variant: "destructive",
            });
            return;
        }

        const newMember: TeamMember = {
            id: Date.now().toString(),
            name: "Pending",
            email: newMemberEmail,
            role: newMemberRole,
            status: "pending",
        };

        setTeamMembers([...teamMembers, newMember]);
        setNewMemberEmail("");
        setNewMemberRole("staff");

        toast({
            title: "Invitation sent",
            description: `An invitation has been sent to ${newMemberEmail}`,
        });
    };

    const handleRemove = (id: string) => {
        setTeamMembers(teamMembers.filter((member) => member.id !== id));
        toast({
            title: "Member removed",
            description: "Team member has been removed successfully",
        });
    };

    const handleRoleChange = (id: string, newRole: "admin" | "manager" | "staff") => {
        setTeamMembers(
            teamMembers.map((member) =>
                member.id === id ? { ...member, role: newRole } : member
            )
        );
        toast({
            title: "Role updated",
            description: "Team member role has been updated successfully",
        });
    };

    const getRoleBadgeVariant = (role: string) => {
        switch (role) {
            case "admin":
                return "default";
            case "manager":
                return "secondary";
            default:
                return "outline";
        }
    };

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case "active":
                return "default";
            case "pending":
                return "secondary";
            default:
                return "outline";
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Team & Users</h3>
                <p className="text-sm text-muted-foreground">
                    Manage team members, roles, and permissions.
                </p>
            </div>

            <Separator />

            {/* Invite New Member */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5" />
                        <CardTitle>Invite Team Member</CardTitle>
                    </div>
                    <CardDescription>
                        Send an invitation to add a new team member to your store.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <Input
                                type="email"
                                placeholder="email@example.com"
                                value={newMemberEmail}
                                onChange={(e) => setNewMemberEmail(e.target.value)}
                            />
                        </div>
                        <div className="w-40">
                            <Select
                                value={newMemberRole}
                                onValueChange={(value: "admin" | "manager" | "staff") =>
                                    setNewMemberRole(value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="manager">Manager</SelectItem>
                                    <SelectItem value="staff">Staff</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button onClick={handleInvite}>
                            <Plus className="mr-2 h-4 w-4" />
                            Invite
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Team Members List */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        <CardTitle>Team Members</CardTitle>
                    </div>
                    <CardDescription>
                        Manage existing team members and their permissions.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader className="bg-muted/50 border-y border-border">
                            <TableRow className="hover:bg-transparent border-none">
                                <TableHead className="h-10 text-[10px] uppercase tracking-widest font-bold text-muted-foreground px-4">Name</TableHead>
                                <TableHead className="h-10 text-[10px] uppercase tracking-widest font-bold text-muted-foreground px-4">Email</TableHead>
                                <TableHead className="h-10 text-[10px] uppercase tracking-widest font-bold text-muted-foreground px-4 text-center">Role</TableHead>
                                <TableHead className="h-10 text-[10px] uppercase tracking-widest font-bold text-muted-foreground px-4 text-center">Status</TableHead>
                                <TableHead className="h-10 text-[10px] uppercase tracking-widest font-bold text-muted-foreground px-4 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {teamMembers.map((member) => (
                                <TableRow key={member.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                                    <TableCell className="px-4 py-3">
                                        <span className="font-bold text-sm text-foreground">{member.name}</span>
                                    </TableCell>
                                    <TableCell className="px-4 py-3">
                                        <span className="text-muted-foreground font-medium text-xs">{member.email}</span>
                                    </TableCell>
                                    <TableCell className="px-4 py-3">
                                        <div className="flex justify-center">
                                            <Select
                                                value={member.role}
                                                onValueChange={(value: "admin" | "manager" | "staff") =>
                                                    handleRoleChange(member.id, value)
                                                }
                                                disabled={member.status === "pending"}
                                            >
                                                <SelectTrigger className="w-32 h-8 rounded-none border-border font-bold text-[10px] uppercase tracking-widest">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-none">
                                                    <SelectItem value="admin" className="text-xs uppercase font-bold tracking-tight">Admin</SelectItem>
                                                    <SelectItem value="manager" className="text-xs uppercase font-bold tracking-tight">Manager</SelectItem>
                                                    <SelectItem value="staff" className="text-xs uppercase font-bold tracking-tight">Staff</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-center">
                                        <div className="flex justify-center">
                                            <Badge variant={getStatusBadgeVariant(member.status)}
                                                className={cn(
                                                    "rounded-none uppercase text-[9px] tracking-widest font-bold",
                                                    member.status === 'active' ? "bg-blue-600" : "bg-muted text-muted-foreground"
                                                )}>
                                                {member.status}
                                            </Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-right">
                                        <div className="flex justify-end">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRemove(member.id)}
                                                className="h-8 w-8 p-0 rounded-none hover:bg-pink-500/10 hover:text-pink-500"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Role Permissions */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        <CardTitle>Role Permissions</CardTitle>
                    </div>
                    <CardDescription>
                        Overview of permissions for each role.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="rounded-lg border p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold">Admin</h4>
                                <Badge>Full Access</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Full access to all features including settings, team management, and billing.
                            </p>
                        </div>

                        <div className="rounded-lg border p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold">Manager</h4>
                                <Badge variant="secondary">Limited Access</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Can manage products, orders, and customers. Cannot access settings or billing.
                            </p>
                        </div>

                        <div className="rounded-lg border p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold">Staff</h4>
                                <Badge variant="outline">View Only</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Can view orders and customers. Cannot make changes or access sensitive data.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
