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
            phone: "+1 (202) 555-0143",
            address: "123 Main St, New York, NY 10001",
            joinDate: "2023-01-15",
            totalOrders: 15,
            totalSpent: 1240.50,
            averageOrderValue: 82.70,
            lastOrderDate: "2024-01-15",
            status: "active",
            recentOrders: [
                { id: "ORD-7281", date: "2024-02-01", total: 120.50, status: "success" },
                { id: "ORD-142", date: "2024-01-15", total: 124.50, status: "delivered" },
                { id: "ORD-128", date: "2023-12-20", total: 65.00, status: "delivered" },
            ]
        },
        "CUST-2": {
            id: "CUST-2",
            name: "Bob Smith",
            email: "bob@example.com",
            phone: "+44 20 7946 0958",
            address: "456 Oak Ave, London, UK",
            joinDate: "2023-01-20",
            totalOrders: 8,
            totalSpent: 850.00,
            averageOrderValue: 106.25,
            lastOrderDate: "2024-01-20",
            status: "active",
            recentOrders: [
                { id: "ORD-7282", date: "2024-02-02", total: 85.00, status: "pending" },
                { id: "ORD-139", date: "2024-01-10", total: 98.50, status: "delivered" },
            ]
        },
        "CUST-3": {
            id: "CUST-3",
            name: "Charlie Brown",
            email: "charlie@email.com",
            phone: "+33 1 42 68 53 00",
            address: "789 Pine Rd, Paris, France",
            joinDate: "2023-05-10",
            totalOrders: 2,
            totalSpent: 45.00,
            averageOrderValue: 22.50,
            lastOrderDate: "2024-01-22",
            status: "inactive",
            recentOrders: [
                { id: "ORD-7283", date: "2024-02-03", total: 299.00, status: "processing" },
            ]
        },
        "CUST-4": {
            id: "CUST-4",
            name: "Diana Prince",
            email: "diana@email.com",
            phone: "+49 30 22730027",
            address: "321 Maple Dr, Berlin, Germany",
            joinDate: "2022-11-05",
            totalOrders: 42,
            totalSpent: 3450.00,
            averageOrderValue: 82.14,
            lastOrderDate: "2024-01-25",
            status: "active",
            recentOrders: [
                { id: "ORD-7284", date: "2024-02-04", total: 99.00, status: "success" },
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
        <div className="space-y-6 pb-24 md:pb-8">
            {/* Header - stack on mobile */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-none h-10 w-10 min-h-[44px] min-w-[44px] self-start">
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    <Avatar className="h-12 w-12 sm:h-14 sm:w-14 md:h-12 md:w-12 rounded-none border border-border shrink-0">
                        <AvatarFallback className="rounded-none bg-blue-600/5 text-blue-600 font-black">{customer.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                        <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight uppercase truncate">{customer.name}</h1>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mt-1">ID: {customer.id}</p>
                    </div>
                    <Badge variant="default" className="rounded-none uppercase text-[10px] tracking-widest font-bold bg-blue-600 shrink-0">
                        {customer.status}
                    </Badge>
                </div>
            </div>

            {/* Contact Info - 1 col mobile, 2 desktop */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                <Card className="rounded-none border-border bg-card relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />
                    <CardHeader className="pl-6 pt-6 pb-2">
                        <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-6 space-y-4">
                        <div className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-blue-600" />
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Email</p>
                                <p className="text-sm font-black text-foreground leading-none mt-1">{customer.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-pink-500" />
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Phone</p>
                                <p className="text-sm font-black text-foreground leading-none mt-1">{customer.phone}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="h-4 w-4 text-blue-600" />
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Address</p>
                                <p className="text-sm font-black text-foreground leading-none mt-1">{customer.address}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-none border-border bg-card relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-pink-500" />
                    <CardHeader className="pl-6 pt-6 pb-2">
                        <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Account Details</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-6 space-y-4">
                        <div className="flex items-center gap-3">
                            <Calendar className="h-4 w-4 text-pink-500" />
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Member Since</p>
                                <p className="text-sm font-black text-foreground leading-none mt-1">{new Date(customer.joinDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <ShoppingCart className="h-4 w-4 text-blue-600" />
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Last Order</p>
                                <p className="text-sm font-black text-foreground leading-none mt-1">{new Date(customer.lastOrderDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Stats - 1 col mobile, 2 tablet, 4 desktop */}
            <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="rounded-none border-border bg-card relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 opacity-20" />
                    <CardHeader className="pl-6">
                        <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Total Orders</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-6 pb-6">
                        <div className="flex items-center gap-2">
                            <ShoppingCart className="h-4 w-4 text-blue-600" />
                            <span className="text-2xl font-black text-foreground tracking-tighter">{customer.totalOrders}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-none border-border bg-card relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-pink-500 opacity-20" />
                    <CardHeader className="pl-6">
                        <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Total Spent</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-6 pb-6">
                        <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-pink-500" />
                            <span className="text-2xl font-black text-foreground tracking-tighter">${customer.totalSpent.toFixed(2)}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-none border-border bg-card relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 opacity-20" />
                    <CardHeader className="pl-6">
                        <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Avg Order Value</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-6 pb-6">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-blue-600" />
                            <span className="text-2xl font-black text-foreground tracking-tighter">${customer.averageOrderValue.toFixed(2)}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-none border-border bg-card relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-pink-500 opacity-20" />
                    <CardHeader className="pl-6">
                        <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Loyalty Points</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-6 pb-6">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-pink-500" />
                            <span className="text-2xl font-black text-foreground tracking-tighter">1,240</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Orders */}
            <Card className="rounded-none border-border bg-card">
                <CardHeader className="border-b border-border/10">
                    <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Order History</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 pb-6">
                    <div className="space-y-4">
                        {customer.recentOrders.map((order: any) => (
                            <div
                                key={order.id}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 md:p-4 border border-border rounded-none hover:bg-muted/50 transition-colors group cursor-pointer min-h-[44px]"
                                onClick={() => router.push(`/dashboard/orders/${order.id}`)}
                            >
                                <div className="flex flex-col min-w-0">
                                    <p className="text-sm font-black text-foreground uppercase tracking-tight">#{order.id}</p>
                                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{new Date(order.date).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center gap-4 sm:gap-6">
                                    <p className="text-sm font-black text-foreground tracking-tight">${order.total.toFixed(2)}</p>
                                    <Badge variant="default" className="rounded-none uppercase text-[9px] tracking-widest font-bold bg-blue-600 min-w-20 justify-center">
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
