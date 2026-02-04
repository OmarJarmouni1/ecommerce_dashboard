"use client";

import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, Package, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import Image from 'next/image';

// Mock product data
const getProductById = (id: string) => {
    const products: Record<string, any> = {
        "728ed52f": {
            id: "728ed52f",
            name: "Wireless Headphones",
            description: "Premium noise-cancelling wireless headphones with 30-hour battery life. Features advanced active noise cancellation, premium sound quality, and comfortable over-ear design perfect for long listening sessions.",
            price: 150,
            stock: 25,
            status: "active",
            category: "Electronics",
            sku: "WH-2024-001",
            image: "/placeholder-product.jpg",
            sold: 145,
            revenue: 21750,
            rating: 4.8,
            reviews: 89
        },
        "489e1d42": {
            id: "489e1d42",
            name: "Ergonomic Chair",
            description: "Professional ergonomic office chair with lumbar support and adjustable armrests. Designed for maximum comfort during long work sessions with breathable mesh back and premium cushioning.",
            price: 350,
            stock: 12,
            status: "active",
            category: "Furniture",
            sku: "EC-2024-002",
            image: "/placeholder-product.jpg",
            sold: 67,
            revenue: 23450,
            rating: 4.6,
            reviews: 42
        },
        "e8291c32": {
            id: "e8291c32",
            name: "Mechanical Keyboard",
            description: "RGB mechanical gaming keyboard with custom switches and programmable keys. Features per-key RGB lighting, durable construction, and responsive tactile feedback for gaming and typing.",
            price: 120,
            stock: 5,
            status: "draft",
            category: "Electronics",
            sku: "MK-2024-003",
            image: "/placeholder-product.jpg",
            sold: 203,
            revenue: 24360,
            rating: 4.9,
            reviews: 156
        },
        "a1b2c3d4": {
            id: "a1b2c3d4",
            name: "Minimalist Desk Lamp",
            description: "Sleek and minimalist LED desk lamp with adjustable brightness and color temperature. Perfect for home offices and reading nooks with its eye-friendly lighting and space-saving design.",
            price: 45,
            stock: 45,
            status: "active",
            category: "Lighting",
            sku: "DL-2024-004",
            image: "/placeholder-product.jpg",
            sold: 89,
            revenue: 4005,
            rating: 4.5,
            reviews: 28
        },
        "f5g6h7i8": {
            id: "f5g6h7i8",
            name: "Leather Journal",
            description: "Handcrafted genuine leather journal with cream-colored acid-free paper. Features a wrap-around tie closure and durable binding, ideal for sketches, notes, and personal reflections.",
            price: 28,
            stock: 0,
            status: "archived",
            category: "Stationery",
            sku: "LJ-2024-005",
            image: "/placeholder-product.jpg",
            sold: 12,
            revenue: 336,
            rating: 4.7,
            reviews: 15
        },
        "j9k0l1m2": {
            id: "j9k0l1m2",
            name: "Portable Power Bank",
            description: "High-capacity 20,000mAh portable power bank with fast charging support. Features dual USB-A and USB-C ports, allowing you to charge multiple devices simultaneously while on the go.",
            price: 55,
            stock: 8,
            status: "active",
            category: "Electronics",
            sku: "PB-2024-006",
            image: "/placeholder-product.jpg",
            sold: 456,
            revenue: 25080,
            rating: 4.8,
            reviews: 312
        }
    };
    return products[id] || null;
};

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const product = getProductById(params.productId as string);

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
                <AlertCircle className="h-16 w-16 text-muted-foreground" />
                <h2 className="text-2xl font-black text-foreground">Product Not Found</h2>
                <Button onClick={() => router.push('/dashboard/products')} className="rounded-none">
                    Back to Products
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
                <div className="flex-1">
                    <h1 className="text-3xl font-black text-foreground tracking-tight">{product.name}</h1>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mt-1">SKU: {product.sku}</p>
                </div>
                <Badge variant={product.status === 'active' ? 'default' : 'secondary'} className="rounded-none uppercase text-[10px] tracking-widest font-bold">
                    {product.status}
                </Badge>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Product Image */}
                <Card className="rounded-none border-border bg-card lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Product Image</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative aspect-square border border-border rounded-sm overflow-hidden bg-muted">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Package className="h-24 w-24 text-muted-foreground/30" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Product Details */}
                <Card className="rounded-none border-border bg-card lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Product Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4">
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">Description</p>
                                <p className="text-sm text-foreground leading-relaxed">{product.description}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">Category</p>
                                    <p className="text-sm font-bold text-foreground">{product.category}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">Rating</p>
                                    <p className="text-sm font-bold text-foreground">{product.rating} ⭐ ({product.reviews} reviews)</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="rounded-none border-border bg-card relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />
                    <CardHeader className="pl-6">
                        <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Price</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-6">
                        <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-blue-600" />
                            <span className="text-2xl font-black text-foreground">${product.price.toFixed(2)}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-none border-border bg-card relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-pink-500" />
                    <CardHeader className="pl-6">
                        <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Stock</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-6">
                        <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-pink-500" />
                            <span className="text-2xl font-black text-foreground">{product.stock}</span>
                        </div>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50 font-bold mt-1">Units Available</p>
                    </CardContent>
                </Card>

                <Card className="rounded-none border-border bg-card relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />
                    <CardHeader className="pl-6">
                        <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Total Sold</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-6">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-blue-600" />
                            <span className="text-2xl font-black text-foreground">{product.sold}</span>
                        </div>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50 font-bold mt-1">Units</p>
                    </CardContent>
                </Card>

                <Card className="rounded-none border-border bg-card relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-pink-500" />
                    <CardHeader className="pl-6">
                        <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Revenue</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-6">
                        <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-pink-500" />
                            <span className="text-2xl font-black text-foreground">${product.revenue.toLocaleString()}</span>
                        </div>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50 font-bold mt-1">Total</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
