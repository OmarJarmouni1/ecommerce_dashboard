"use client";

import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChevronLeft, Mail, Phone, MapPin, DollarSign, ShoppingCart, Calendar, TrendingUp } from 'lucide-react';

// Mock customer data
const getCustomerById = (id: string) => {
    const customers: Record<string, any> = {
        "CUST-1": {
            id: "CUST-1",
            name: "Alice Johnson",
            email: "alice@example.com",
            phone: "+1 (555) 123-4567",
            address: "123 Main St, New York, NY 10001",
            joinDate: "2023-01-15",
            totalOrders: 15,
            totalSpent: 1200.50,
            averageOrderValue: 80.03,
            lastOrderDate: "2024-01-28",
            status: "active",
            recentOrders: [
                { id: "ORD-156", date: "2024-01-28", total: 89.99, status: "delivered" },
                { id: "ORD-142", date: "2024-01-15", total: 124.50, status: "delivered" },
                { id: "ORD-128", date: "2023-12-20", total: 65.00, status: "delivered" },
            ]
        },
        "CUST-2": {
            id: "CUST-2",
            name: "Bob Smith",
            email: "bob@example.com",
            phone: "+1 (555) 987-6543",
            address: "456 Oak Ave, Los Angeles, CA 90001",
            joinDate: "2023-01-20",
            totalOrders: 8,
            totalSpent: 850.00,
            averageOrderValue: 106.25,
            lastOrderDate: "2024-01-25",
            status: "active",
            recentOrders: [
                { id: "ORD-151", date: "2024-01-25", total: 145.00, status: "delivered" },
                { id: "ORD-139", date: "2024-01-10", total: 98.50, status: "delivered" },
            ]
        }
    };
    return customers[id] || null;
};

export default function CustomerDetailPage() {
    const params = useParams();
    const router = useRouter();
    const customer = getCustomerById(params.customerId as string);

    if (!customer) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
                <Mail className="h-16 w-16 text-muted-foreground" />
                <h2 className="text-2xl font-black text-foreground">Customer Not Found</h2>
                <Button onClick={() => router.push('/dashboard/customers')} className="rounded-none">
                    Back to Customers
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-none">
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Avatar className="h-12 w-12 rounded-none border border-border">
                    <AvatarFallback className="rounded-none bg-blue-600 text-white font-black">{customer.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <h1 className="text-3xl font-black text-foreground tracking-tight">{customer.name}</h1>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mt-1">Customer ID: {customer.id}</p>
                </div>
                <Badge variant="default" className="rounded-none uppercase text-[10px] tracking-widest font-bold bg-blue-600">
                    {customer.status}
                </Badge>
            </div>

            {/* Contact Info */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="rounded-none border-border bg-card">
                    <CardHeader>
                        <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-blue-600" />
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Email</p>
                                <p className="text-sm font-bold text-foreground">{customer.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-pink-500" />
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Phone</p>
                                <p className="text-sm font-bold text-foreground">{customer.phone}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="h-4 w-4 text-blue-600" />
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Address</p>
                                <p className="text-sm font-bold text-foreground">{customer.address}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-none border-border bg-card">
                    <CardHeader>
                        <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Account Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Calendar className="h-4 w-4 text-pink-500" />
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Member Since</p>
                                <p className="text-sm font-bold text-foreground">{new Date(customer.joinDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <ShoppingCart className="h-4 w-4 text-blue-600" />
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Last Order</p>
                                <p className="text-sm font-bold text-foreground">{new Date(customer.lastOrderDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Stats */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="rounded-none border-border bg-card relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />
                    <CardHeader className="pl-6">
                        <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Total Orders</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-6">
                        <div className="flex items-center gap-2">
                            <ShoppingCart className="h-4 w-4 text-blue-600" />
                            <span className="text-2xl font-black text-foreground">{customer.totalOrders}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-none border-border bg-card relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-pink-500" />
                    <CardHeader className="pl-6">
                        <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Total Spent</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-6">
                        <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-pink-500" />
                            <span className="text-2xl font-black text-foreground">${customer.totalSpent.toFixed(2)}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-none border-border bg-card relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />
                    <CardHeader className="pl-6">
                        <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Avg Order Value</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-6">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-blue-600" />
                            <span className="text-2xl font-black text-foreground">${customer.averageOrderValue.toFixed(2)}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-none border-border bg-card relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-pink-500" />
                    <CardHeader className="pl-6">
                        <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Lifetime Value</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-6">
                        <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-pink-500" />
                            <span className="text-2xl font-black text-foreground">${customer.totalSpent.toFixed(2)}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Orders */}
            <Card className="rounded-none border-border bg-card">
                <CardHeader>
                    <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {customer.recentOrders.map((order: any) => (
                            <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-sm hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div>
                                        <p className="text-sm font-black text-foreground">{order.id}</p>
                                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{new Date(order.date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-sm font-black text-foreground">${order.total.toFixed(2)}</p>
                                    <Badge variant="default" className="rounded-none uppercase text-[10px] tracking-widest font-bold bg-blue-600">
                                        {order.status}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
