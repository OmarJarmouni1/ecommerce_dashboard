"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

const productSchema = z.object({
    name: z.string().min(2, "Name is required"),
    description: z.string().optional(),
    sku: z.string().min(1, "SKU is required"),
    price: z.coerce.number().min(0, "Price must be positive"),
    stock: z.coerce.number().min(0, "Stock must be positive"),
    category: z.string().min(1, "Category is required"),
    status: z.enum(["active", "draft", "archived"]),
});

type ProductFormValues = z.infer<typeof productSchema>;

export function ProductForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // We use 'any' for the resolver to bypass the strict type mismatch between Zod's inferred types
    // and React Hook Form's strict typing which can sometimes conflict with z.coerce.number()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<ProductFormValues>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(productSchema) as any,
        defaultValues: {
            name: "",
            description: "",
            sku: "",
            category: "",
            status: "active",
            stock: 0,
            price: 0,
        }
    });

    const onSubmit = async (data: ProductFormValues) => {
        setLoading(true);
        // Simulate API call
        console.log(data);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        router.push('/dashboard/products');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-2xl font-bold">Create Product</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 md:grid-cols-2">
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" {...register('name')} />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" {...register('description')} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Inventory</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="sku">SKU</Label>
                                    <Input id="sku" {...register('sku')} />
                                    {errors.sku && <p className="text-red-500 text-sm">{errors.sku.message}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="stock">Stock</Label>
                                    <Input id="stock" type="number" {...register('stock')} />
                                    {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pricing & Organization</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="price">Price</Label>
                                <Input id="price" type="number" step="0.01" {...register('price')} />
                                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="category">Category</Label>
                                <Select onValueChange={(val) => setValue('category', val)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="electronics">Electronics</SelectItem>
                                        <SelectItem value="clothing">Clothing</SelectItem>
                                        <SelectItem value="furniture">Furniture</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="status">Status</Label>
                                <Select onValueChange={(val) => setValue('status', val as "active" | "draft" | "archived")} defaultValue="active">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="archived">Archived</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Saving..." : "Save Product"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
