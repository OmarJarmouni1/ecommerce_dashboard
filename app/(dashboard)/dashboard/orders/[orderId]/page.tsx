"use client";

import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChevronLeft, Package, DollarSign, MapPin, Calendar, User, CreditCard } from 'lucide-react';

// Mock order data
const getOrderById = (id: string) => {
    const orders: Record<string, any> = {
        "ORD-7281": {
            id: "ORD-7281",
            customer: {
                name: "Olivia Martin",
                email: "olivia@email.com",
                phone: "+1 (555) 012-3456"
            },
            date: "2024-02-01",
            status: "success",
            total: 120.50,
            subtotal: 110.00,
            tax: 8.50,
            shipping: 2.00,
            shippingAddress: {
                street: "88 Market St",
                city: "New York",
                state: "NY",
                zip: "10001",
                country: "USA"
            },
            paymentMethod: "Credit Card (Visa ****4242)",
            items: [
                { id: "1", name: "Wireless Headphones", quantity: 1, price: 75.00, image: "/placeholder.jpg" },
                { id: "2", name: "Phone Case", quantity: 2, price: 17.50, image: "/placeholder.jpg" }
            ],
            timeline: [
                { status: "Order Placed", date: "2024-02-01 10:30 AM", completed: true },
                { status: "Payment Confirmed", date: "2024-02-01 10:35 AM", completed: true },
                { status: "Processing", date: "2024-02-01 2:15 PM", completed: true },
                { status: "Shipped", date: "2024-02-02 9:00 AM", completed: true },
                { status: "Delivered", date: "2024-02-04 3:45 PM", completed: true }
            ]
        },
        "ORD-7282": {
            id: "ORD-7282",
            customer: {
                name: "Jackson Lee",
                email: "jackson@email.com",
                phone: "+1 (555) 987-6543"
            },
            date: "2024-02-02",
            status: "pending",
            total: 85.00,
            subtotal: 78.00,
            tax: 6.00,
            shipping: 1.00,
            shippingAddress: {
                street: "456 Oak Ave",
                city: "Los Angeles",
                state: "CA",
                zip: "90001",
                country: "USA"
            },
            paymentMethod: "PayPal",
            items: [
                { id: "3", name: "Mechanical Keyboard", quantity: 1, price: 78.00, image: "/placeholder.jpg" }
            ],
            timeline: [
                { status: "Order Placed", date: "2024-02-02 11:20 AM", completed: true },
                { status: "Payment Confirmed", date: "2024-02-02 11:25 AM", completed: true },
                { status: "Processing", date: "", completed: false },
                { status: "Shipped", date: "", completed: false },
                { status: "Delivered", date: "", completed: false }
            ]
        },
        "ORD-7283": {
            id: "ORD-7283",
            customer: {
                name: "Isabella Nguyen",
                email: "isabella@email.com",
                phone: "+1 (555) 456-7890"
            },
            date: "2024-02-03",
            status: "processing",
            total: 299.00,
            subtotal: 280.00,
            tax: 14.00,
            shipping: 5.00,
            shippingAddress: {
                street: "789 Pine Rd",
                city: "Seattle",
                state: "WA",
                zip: "98101",
                country: "USA"
            },
            paymentMethod: "Mastercard (****8888)",
            items: [
                { id: "4", name: "Smart Watch", quantity: 1, price: 280.00, image: "/placeholder.jpg" }
            ],
            timeline: [
                { status: "Order Placed", date: "2024-02-03 09:00 AM", completed: true },
                { status: "Payment Confirmed", date: "2024-02-03 09:15 AM", completed: true },
                { status: "Processing", date: "2024-02-03 11:00 AM", completed: true },
                { status: "Shipped", date: "", completed: false },
                { status: "Delivered", date: "", completed: false }
            ]
        },
        "ORD-7284": {
            id: "ORD-7284",
            customer: {
                name: "William Kim",
                email: "will@email.com",
                phone: "+1 (555) 222-3333"
            },
            date: "2024-02-04",
            status: "success",
            total: 99.00,
            subtotal: 90.00,
            tax: 5.00,
            shipping: 4.00,
            shippingAddress: {
                street: "321 Maple Dr",
                city: "Miami",
                state: "FL",
                zip: "33101",
                country: "USA"
            },
            paymentMethod: "Apple Pay",
            items: [
                { id: "5", name: "Gaming Mouse", quantity: 1, price: 90.00, image: "/placeholder.jpg" }
            ],
            timeline: [
                { status: "Order Placed", date: "2024-02-04 02:00 PM", completed: true },
                { status: "Payment Confirmed", date: "2024-02-04 02:10 PM", completed: true },
                { status: "Processing", date: "2024-02-04 04:00 PM", completed: true },
                { status: "Shipped", date: "2024-02-05 09:00 AM", completed: true },
                { status: "Delivered", date: "2024-02-05 02:00 PM", completed: true }
            ]
        }
    };
    return orders[id] || null;
};

export default function OrderDetailPage() {
    const params = useParams();
    const router = useRouter();
    const order = getOrderById(params.orderId as string);

    if (!order) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
                <Package className="h-16 w-16 text-muted-foreground" />
                <h2 className="text-2xl font-black text-foreground">Order Not Found</h2>
                <Button onClick={() => router.push('/dashboard/orders')} className="rounded-none">
                    Back to Orders
                </Button>
            </div>
        );
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered': return 'bg-blue-600';
            case 'processing': return 'bg-pink-500';
            case 'pending': return 'bg-muted-foreground';
            default: return 'bg-muted-foreground';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-none">
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex-1">
                    <h1 className="text-3xl font-black text-foreground tracking-tight">Order {order.id}</h1>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mt-1">
                        Placed on {new Date(order.date).toLocaleDateString()}
                    </p>
                </div>
                <Badge variant="default" className={`rounded-none uppercase text-[10px] tracking-widest font-bold ${getStatusColor(order.status)}`}>
                    {order.status}
                </Badge>
            </div>

            {/* Main Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Column - Order Items & Timeline */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Order Items */}
                    <Card className="rounded-none border-border bg-card">
                        <CardHeader>
                            <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Order Items</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {order.items.map((item: any) => (
                                    <div key={item.id} className="flex items-center gap-4 p-4 border border-border rounded-sm">
                                        <div className="h-16 w-16 bg-muted rounded-sm flex items-center justify-center border border-border">
                                            <Package className="h-8 w-8 text-muted-foreground/30" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-black text-foreground">{item.name}</p>
                                            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="text-sm font-black text-foreground">${item.price.toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="mt-6 pt-6 border-t border-border space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground font-bold">Subtotal</span>
                                    <span className="font-black text-foreground">${order.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground font-bold">Tax</span>
                                    <span className="font-black text-foreground">${order.tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground font-bold">Shipping</span>
                                    <span className="font-black text-foreground">${order.shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg pt-2 border-t border-border">
                                    <span className="font-black text-foreground uppercase text-[10px] tracking-widest">Total</span>
                                    <span className="font-black text-foreground">${order.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Order Timeline */}
                    <Card className="rounded-none border-border bg-card">
                        <CardHeader>
                            <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Order Timeline</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {order.timeline.map((event: any, index: number) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${event.completed ? 'bg-blue-600' : 'bg-muted'}`}>
                                                {event.completed && <div className="h-3 w-3 bg-white rounded-full" />}
                                            </div>
                                            {index < order.timeline.length - 1 && (
                                                <div className={`w-0.5 flex-1 my-1 ${event.completed ? 'bg-blue-600' : 'bg-border'}`} style={{ minHeight: '20px' }} />
                                            )}
                                        </div>
                                        <div className="flex-1 pb-4">
                                            <p className={`text-sm font-black ${event.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                                                {event.status}
                                            </p>
                                            {event.date && (
                                                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mt-1">
                                                    {event.date}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Customer & Shipping Info */}
                <div className="space-y-6">
                    {/* Customer Info */}
                    <Card className="rounded-none border-border bg-card">
                        <CardHeader>
                            <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Customer</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 rounded-none border border-border">
                                    <AvatarFallback className="rounded-none bg-blue-600 text-white font-black">
                                        {order.customer.name[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-black text-foreground">{order.customer.name}</p>
                                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{order.customer.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 pt-2">
                                <User className="h-4 w-4 text-blue-600" />
                                <p className="text-xs text-muted-foreground">{order.customer.phone}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Shipping Address */}
                    <Card className="rounded-none border-border bg-card">
                        <CardHeader>
                            <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Shipping Address</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-3">
                                <MapPin className="h-4 w-4 text-pink-500 mt-1" />
                                <div className="text-sm text-foreground">
                                    <p className="font-bold">{order.shippingAddress.street}</p>
                                    <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                                    <p>{order.shippingAddress.country}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Info */}
                    <Card className="rounded-none border-border bg-card">
                        <CardHeader>
                            <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Payment Method</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-3">
                                <CreditCard className="h-4 w-4 text-blue-600" />
                                <p className="text-sm font-bold text-foreground">{order.paymentMethod}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
