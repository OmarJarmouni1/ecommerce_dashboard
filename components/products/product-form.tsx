"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
    ChevronLeft,
    Save,
    Info,
    DollarSign,
    Package,
    Layers,
    Image as ImageIcon,
    Truck,
    Tag,
    Search as SeoIcon,
    Settings,
    Loader2,
    X,
    Plus,
    Trash2,
    GripVertical,
    Upload,
    CheckCircle2,
    Globe,
    Scale,
    ShieldCheck,
    FolderKanban,
    Building2,
    Boxes,
    Search,
    Monitor,
    Smartphone,
    Calendar,
    Zap,
    Gift,
    Database,
    ExternalLink
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// --- Schema Definitions ---
const productSchema = z.object({
    // Basic Info
    name: z.string().min(2, "Name is required (min 2 chars)"),
    description: z.string().min(10, "Description should be at least 10 characters"),
    sku: z.string().min(1, "SKU is required"),
    category: z.string().min(1, "Category is required"),
    brand: z.string().optional(),
    tags: z.array(z.string()).default([]),

    // Pricing
    price: z.coerce.number().min(0, "Price cannot be negative"),
    compareAtPrice: z.coerce.number().optional().nullable(),
    costPerItem: z.coerce.number().optional().nullable(),
    taxable: z.boolean().default(true),

    // Inventory
    trackQuantity: z.boolean().default(true),
    quantity: z.coerce.number().default(0),
    lowStockThreshold: z.coerce.number().default(5),
    continueSelling: z.boolean().default(false),
    barcode: z.string().optional(),

    // Variants
    hasVariants: z.boolean().default(false),
    options: z.array(z.object({
        name: z.string(),
        values: z.array(z.string())
    })).default([]),
    variants: z.array(z.object({
        name: z.string(),
        sku: z.string(),
        price: z.coerce.number(),
        quantity: z.coerce.number(),
    })).default([]),

    // Media
    media: z.array(z.object({
        url: z.string(),
        isPrimary: z.boolean().default(false),
    })).default([]),

    // Shipping
    isPhysical: z.boolean().default(true),
    weight: z.coerce.number().default(0),
    weightUnit: z.enum(["kg", "lb", "g", "oz"]).default("kg"),
    countryOfOrigin: z.string().optional(),
    hsCode: z.string().optional(),

    // Organization
    productType: z.string().optional(),
    collections: z.array(z.string()).default([]),

    // SEO
    seoTitle: z.string().max(70).optional(),
    seoDescription: z.string().max(160).optional(),
    seoSlug: z.string().optional(),

    // Status & Advanced
    status: z.enum(["active", "draft", "archived"]).default("draft"),
    visibility: z.enum(["public", "private", "hidden"]).default("public"),
    publishAt: z.string().optional(),
    pointsEarned: z.coerce.number().default(0),
});

interface ProductFormValues {
    name: string;
    description: string;
    sku: string;
    category: string;
    brand?: string;
    tags: string[];
    price: number;
    compareAtPrice?: number | null;
    costPerItem?: number | null;
    taxable: boolean;
    trackQuantity: boolean;
    quantity: number;
    lowStockThreshold: number;
    continueSelling: boolean;
    barcode?: string;
    hasVariants: boolean;
    options: {
        name: string;
        values: string[];
    }[];
    variants: {
        name: string;
        sku: string;
        price: number;
        quantity: number;
    }[];
    media: {
        url: string;
        isPrimary: boolean;
    }[];
    isPhysical: boolean;
    weight: number;
    weightUnit: "kg" | "lb" | "g" | "oz";
    countryOfOrigin?: string;
    hsCode?: string;
    productType?: string;
    collections: string[];
    seoTitle?: string;
    seoDescription?: string;
    seoSlug?: string;
    status: "active" | "draft" | "archived";
    visibility: "public" | "private" | "hidden";
    publishAt?: string;
    pointsEarned: number;
}

export function ProductForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [activeSection, setActiveSection] = useState("basic");
    const [tagInput, setTagInput] = useState("");

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema) as any,
        mode: "onChange",
        defaultValues: {
            name: "",
            description: "",
            sku: "",
            category: "",
            brand: "",
            tags: [],
            price: 0,
            compareAtPrice: null,
            costPerItem: null,
            taxable: true,
            trackQuantity: true,
            quantity: 0,
            lowStockThreshold: 5,
            continueSelling: false,
            barcode: "",
            hasVariants: false,
            options: [],
            variants: [],
            media: [],
            isPhysical: true,
            weight: 0,
            weightUnit: "kg",
            countryOfOrigin: "",
            hsCode: "",
            productType: "",
            collections: [],
            seoTitle: "",
            seoDescription: "",
            seoSlug: "",
            status: "draft",
            visibility: "public",
            publishAt: "",
            pointsEarned: 0,
        },
    });

    // --- Field Arrays ---
    const { fields: optionFields, append: appendOption, remove: removeOption } = useFieldArray({
        control: form.control,
        name: "options"
    });

    const { fields: variantFields, replace: replaceVariants } = useFieldArray({
        control: form.control,
        name: "variants"
    });

    const { fields: mediaFields, append: appendMedia, remove: removeMedia } = useFieldArray({
        control: form.control,
        name: "media"
    });

    // --- Dynamic Logic ---
    useEffect(() => {
        if (!form.watch('hasVariants')) return;
        const options = form.getValues('options');
        if (options.length === 0) return;

        const generateCombinations = (arr: string[][]): string[][] => {
            return arr.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())), [[]] as string[][]);
        };

        const allValues = options.map(o => o.values);
        if (allValues.some(v => v.length === 0)) return;

        const combinations = generateCombinations(allValues);
        const newVariants = combinations.map(combo => {
            const name = combo.join(' / ');
            const existing = form.getValues('variants').find(v => v.name === name);
            return existing || {
                name,
                sku: `${form.getValues('sku')}-${combo.join('-').toUpperCase()}`,
                price: form.getValues('price'),
                quantity: form.getValues('quantity')
            };
        });
        replaceVariants(newVariants);
    }, [form.watch('options'), form.watch('hasVariants'), replaceVariants]);

    // SEO Slug sync
    useEffect(() => {
        const name = form.watch('name');
        if (name && !form.getValues('seoSlug')) {
            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            form.setValue('seoSlug', slug);
        }
    }, [form.watch('name'), form.setValue]);

    // --- Handlers ---
    const onSubmit = async (data: ProductFormValues) => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log("FINAL SUBMISSION DATA:", data);
            toast.success(`Product "${data.name}" successfully created!`);
            router.push("/dashboard/products");
        } catch (error) {
            toast.error("Internal Server Error: Failed to save product");
        } finally {
            setLoading(false);
        }
    };

    const addTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            const current = form.getValues('tags');
            if (!current.includes(tagInput.trim())) {
                form.setValue('tags', [...current, tagInput.trim()]);
            }
            setTagInput("");
        }
    };

    // --- UI Helpers ---
    const navItems = [
        { id: "basic", label: "General Information", icon: Info },
        { id: "pricing", label: "Pricing & Tax", icon: DollarSign },
        { id: "media", label: "Media Assets", icon: ImageIcon },
        { id: "inventory", label: "Stock Control", icon: Package },
        { id: "variants", label: "Product Options", icon: Layers },
        { id: "shipping", label: "Logistics", icon: Truck },
        { id: "org", label: "Categorization", icon: Tag },
        { id: "seo", label: "SEO Settings", icon: SeoIcon },
        { id: "advanced", label: "Advanced", icon: Settings },
    ];

    const primaryMedia = form.watch('media').find(m => m.isPrimary);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 pb-24 md:pb-32">
                {/* --- Sticky Header --- */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-border pb-6 sticky top-0 bg-background/95 backdrop-blur-md z-40 pt-4 px-1">
                    <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto">
                        <Link href="/dashboard/products">
                            <Button variant="outline" size="icon" className="h-10 w-10 min-h-[44px] min-w-[44px] sm:h-10 sm:w-10 rounded-none border-border group">
                                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 group-hover:-translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <div className="min-w-0 flex-1">
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tighter truncate">New Product</h1>
                            <div className="flex items-center gap-2 mt-0.5 sm:mt-1">
                                <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
                                <span className="text-[8px] sm:text-[10px] uppercase font-black tracking-widest text-muted-foreground">Draft Mode</span>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        <Button type="button" variant="ghost" className="rounded-none text-[8px] sm:text-[10px] uppercase font-black tracking-widest text-muted-foreground hover:bg-transparent hover:text-foreground whitespace-nowrap px-2">
                            Preview
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="rounded-none border-border font-black text-[8px] sm:text-[10px] uppercase tracking-widest h-9 sm:h-11 px-4 sm:px-8 whitespace-nowrap"
                            onClick={() => {
                                form.setValue('status', 'draft');
                                form.handleSubmit(onSubmit)();
                            }}
                        >
                            Save Draft
                        </Button>
                        <Button
                            disabled={loading}
                            type="submit"
                            className="rounded-none bg-blue-600 hover:bg-blue-700 font-black text-[8px] sm:text-[10px] uppercase tracking-widest h-9 sm:h-11 px-6 sm:px-10 border-none shadow-[0_0_20px_rgba(37,99,235,0.2)] whitespace-nowrap"
                        >
                            {loading ? <Loader2 className="mr-1.5 h-3 w-3 sm:h-4 sm:w-4 animate-spin" /> : <Save className="mr-1.5 h-3 w-3 sm:h-4 sm:w-4" />}
                            Publish
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                    {/* --- Sidebar Navigation --- */}
                    <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-28 z-30">
                        <nav className="flex flex-row lg:flex-col gap-1 p-1 bg-muted/30 border border-border overflow-x-auto scrollbar-hide lg:overflow-visible">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => {
                                        setActiveSection(item.id);
                                        const el = document.getElementById(item.id);
                                        if (el) {
                                            const offset = 120;
                                            const bodyRect = document.body.getBoundingClientRect().top;
                                            const elementRect = el.getBoundingClientRect().top;
                                            const elementPosition = elementRect - bodyRect;
                                            const offsetPosition = elementPosition - offset;

                                            window.scrollTo({
                                                top: offsetPosition,
                                                behavior: 'smooth'
                                            });
                                        }
                                    }}
                                    className={cn(
                                        "flex items-center gap-3 px-5 py-4 text-[10px] uppercase font-black tracking-widest transition-all",
                                        activeSection === item.id
                                            ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20 translate-x-1"
                                            : "hover:bg-muted text-muted-foreground hover:text-foreground hover:translate-x-1"
                                    )}
                                >
                                    <item.icon className="h-4 w-4 shrink-0" />
                                    {item.label}
                                </button>
                            ))}
                        </nav>

                        <div className="mt-8 p-6 bg-blue-50/50 border border-blue-100 border-dashed">
                            <div className="flex items-center gap-2 mb-3">
                                <ShieldCheck className="h-4 w-4 text-blue-600" />
                                <span className="text-[10px] uppercase font-black text-blue-900">Validation Status</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] uppercase font-bold text-blue-700">Required Fields</span>
                                    <span className="text-[10px] font-black text-blue-900">12/12</span>
                                </div>
                                <div className="h-1.5 w-full bg-blue-200/50 rounded-full overflow-hidden">
                                    <div className="h-full w-full bg-blue-600" />
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* --- Main Content area --- */}
                    <main className="flex-1 min-w-0 space-y-16">

                        {/* 1. Basic Info */}
                        <section id="basic" className="scroll-mt-28">
                            <Card className="rounded-none border-border bg-card shadow-sm border-2">
                                <CardHeader className="border-b-2 border-border bg-muted/20 p-8">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="h-8 w-8 bg-foreground text-background flex items-center justify-center font-black">01</div>
                                        <CardTitle className="text-[14px] uppercase tracking-[0.2em] font-black">Basic Information</CardTitle>
                                    </div>
                                    <CardDescription className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-11">Essential identifiers and descriptions</CardDescription>
                                </CardHeader>
                                <CardContent className="p-10 space-y-10">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="space-y-4">
                                                <FormLabel className="text-[11px] uppercase tracking-widest font-black text-muted-foreground">Product Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="e.g. Master & Dynamic MH40 Headphones"
                                                        className="rounded-none h-14 border-border font-black text-xl px-6 focus-visible:ring-blue-600 transition-all border-2"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-[10px] uppercase font-bold text-pink-500" />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <FormField
                                            control={form.control}
                                            name="sku"
                                            render={({ field }) => (
                                                <FormItem className="space-y-4">
                                                    <FormLabel className="text-[11px] uppercase tracking-widest font-black text-muted-foreground">SKU (Stock Keeping Unit)</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="rounded-none h-12 border-border font-black uppercase tracking-[0.2em] px-4 focus-visible:ring-blue-600 border-2"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="category"
                                            render={({ field }) => (
                                                <FormItem className="space-y-4">
                                                    <FormLabel className="text-[11px] uppercase tracking-widest font-black text-muted-foreground">Collection Category</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="rounded-none h-12 border-border font-black text-[11px] uppercase tracking-widest px-4 border-2">
                                                                <SelectValue placeholder="Selection Required" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className="rounded-none border-2 border-border">
                                                            <SelectItem value="electronics" className="text-[10px] uppercase font-black p-3">Electronics</SelectItem>
                                                            <SelectItem value="apparell" className="text-[10px] uppercase font-black p-3">Apparell</SelectItem>
                                                            <SelectItem value="accessories" className="text-[10px] uppercase font-black p-3">Accessories</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem className="space-y-4">
                                                <FormLabel className="text-[11px] uppercase tracking-widest font-black text-muted-foreground">Extended Description</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        className="rounded-none min-h-[250px] border-border font-medium focus-visible:ring-blue-600 resize-none p-6 text-base leading-relaxed border-2"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                        </section>

                        {/* 2. Pricing */}
                        <section id="pricing" className="scroll-mt-28">
                            <Card className="rounded-none border-border bg-card shadow-sm border-2">
                                <CardHeader className="border-b-2 border-border bg-muted/20 p-8">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 bg-foreground text-background flex items-center justify-center font-black">02</div>
                                        <CardTitle className="text-[14px] uppercase tracking-[0.2em] font-black">Pricing System</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-10 space-y-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <FormField
                                            control={form.control}
                                            name="price"
                                            render={({ field }) => (
                                                <FormItem className="space-y-4">
                                                    <FormLabel className="text-[11px] uppercase font-black border-b-4 border-blue-600 w-fit pb-1">Price (USD)</FormLabel>
                                                    <div className="relative">
                                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-xl text-muted-foreground">$</span>
                                                        <FormControl>
                                                            <Input type="number" step="0.01" className="rounded-none h-14 pl-10 font-black text-2xl border-2 border-border" {...field} />
                                                        </FormControl>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="compareAtPrice"
                                            render={({ field }) => (
                                                <FormItem className="space-y-4">
                                                    <FormLabel className="text-[11px] uppercase font-black border-b-4 border-pink-500 w-fit pb-1 text-muted-foreground">Original Price</FormLabel>
                                                    <div className="relative">
                                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-xl text-muted-foreground/30">$</span>
                                                        <FormControl>
                                                            <Input type="number" step="0.01" className="rounded-none h-14 pl-10 font-black text-xl border-2 border-border text-muted-foreground/40" {...field} value={field.value || ''} />
                                                        </FormControl>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t-2 border-border border-dashed">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-[10px] uppercase font-black text-muted-foreground">Status</span>
                                            <Badge className="bg-emerald-500 text-white rounded-none uppercase text-[9px] font-black w-fit px-3 py-1">Profitable</Badge>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span className="text-[10px] uppercase font-black text-muted-foreground">Margin</span>
                                            <span className="text-lg font-black uppercase">72.4%</span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span className="text-[10px] uppercase font-black text-muted-foreground">Markup</span>
                                            <span className="text-lg font-black uppercase">$124.00</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>

                        {/* 3. Media Assets */}
                        <section id="media" className="scroll-mt-28">
                            <Card className="rounded-none border-2 border-border">
                                <CardHeader className="border-b-2 border-border bg-muted/20 p-8 flex flex-row items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 bg-foreground text-background flex items-center justify-center font-black">03</div>
                                        <CardTitle className="text-[14px] uppercase tracking-[0.2em] font-black">Media Gallery</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-10 space-y-10">
                                    <div
                                        className="h-64 border-2 border-dashed border-border bg-muted/5 flex flex-col items-center justify-center gap-6 group cursor-pointer hover:bg-blue-600/[0.02] hover:border-blue-600 transition-all"
                                        onClick={() => {
                                            const urls = ["https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000", "https://images.unsplash.com/photo-1524362618583-207ea376fa2a?q=80&w=1000"];
                                            appendMedia({ url: urls[0], isPrimary: mediaFields.length === 0 });
                                        }}
                                    >
                                        <div className="h-20 w-20 bg-blue-600/10 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                            <Upload className="h-10 w-10" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[12px] uppercase font-black tracking-widest">Global Asset Upload</p>
                                            <p className="text-[10px] uppercase font-bold text-muted-foreground/50 mt-1">DND Or Click To Multi-Select</p>
                                        </div>
                                    </div>

                                    {mediaFields.length > 0 && (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                                            {mediaFields.map((field, idx) => (
                                                <div key={field.id} className={cn("aspect-square border-2 relative group overflow-hidden", form.watch(`media.${idx}.isPrimary`) ? "border-blue-600 shadow-xl" : "border-border")}>
                                                    <img src={form.watch(`media.${idx}.url`)} className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                                        <Button type="button" size="icon" variant="ghost" className="text-white hover:bg-blue-600 rounded-none h-10 w-10" onClick={() => {
                                                            const m = form.getValues('media').map((item, i) => ({ ...item, isPrimary: i === idx }));
                                                            form.setValue('media', m);
                                                        }}>
                                                            <CheckCircle2 className="h-5 w-5" />
                                                        </Button>
                                                        <Button type="button" size="icon" variant="ghost" className="text-white hover:bg-pink-600 rounded-none h-10 w-10" onClick={() => removeMedia(idx)}>
                                                            <Trash2 className="h-5 w-5" />
                                                        </Button>
                                                    </div>
                                                    {form.watch(`media.${idx}.isPrimary`) && (
                                                        <div className="absolute top-0 left-0 bg-blue-600 text-white text-[8px] font-black px-2 py-1 uppercase tracking-widest">Master Asset</div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </section>

                        {/* 4. Variations & Configuration (Step 6/7 Combined logic) */}
                        <section id="variants" className="scroll-mt-28">
                            <Card className="rounded-none border-2 border-border shadow-xl">
                                <CardHeader className="border-b-2 border-border bg-muted/20 p-8 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 bg-foreground text-background flex items-center justify-center font-black">04</div>
                                        <CardTitle className="text-[14px] uppercase tracking-[0.2em] font-black">Matrix Variants</CardTitle>
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="hasVariants"
                                        render={({ field }) => (
                                            <div className="flex items-center gap-4 bg-muted/50 p-3 border border-border">
                                                <Label className="text-[10px] uppercase font-black tracking-tighter">Enable Variant Matrix</Label>
                                                <Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-blue-600" />
                                            </div>
                                        )}
                                    />
                                </CardHeader>
                                <CardContent className="p-10 space-y-10">
                                    {form.watch('hasVariants') ? (
                                        <>
                                            <div className="space-y-8">
                                                {optionFields.map((field, index) => (
                                                    <div key={field.id} className="p-8 border-2 border-border bg-muted/5 space-y-8 animate-in slide-in-from-right-4 duration-500">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-[11px] uppercase font-black tracking-[0.3em] text-blue-600">Option Axiom #{index + 1}</span>
                                                            <Button type="button" variant="ghost" className="text-pink-600 text-[10px] uppercase font-black h-8 hover:bg-pink-50 rounded-none" onClick={() => removeOption(index)}><Trash2 className="h-4 w-4 mr-2" /> Unset</Button>
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                                            <div className="space-y-4">
                                                                <Label className="text-[11px] uppercase font-black text-muted-foreground">Property Name</Label>
                                                                <Input {...form.register(`options.${index}.name`)} placeholder="e.g. SIZE" className="rounded-none h-11 border-2 font-black uppercase tracking-widest pl-4" />
                                                            </div>
                                                            <div className="md:col-span-2 space-y-4">
                                                                <Label className="text-[11px] uppercase font-black text-muted-foreground">Property Values</Label>
                                                                <div className="flex flex-wrap gap-3 mb-4">
                                                                    {form.watch(`options.${index}.values`).map((val, vIdx) => (
                                                                        <Badge key={vIdx} className="bg-blue-600 text-white rounded-none py-2 px-4 text-[10px] font-black uppercase tracking-widest gap-3">
                                                                            {val}
                                                                            <X className="h-3 w-3 cursor-pointer" onClick={() => {
                                                                                const c = form.getValues(`options.${index}.values`);
                                                                                form.setValue(`options.${index}.values`, c.filter((_, i) => i !== vIdx));
                                                                            }} />
                                                                        </Badge>
                                                                    ))}
                                                                </div>
                                                                <Input
                                                                    placeholder="Append value and commit with [Enter]"
                                                                    className="rounded-none h-11 border-2 font-bold uppercase tracking-widest focus-visible:ring-blue-600 pl-4"
                                                                    onKeyDown={(e) => {
                                                                        if (e.key === 'Enter') {
                                                                            e.preventDefault();
                                                                            const v = e.currentTarget.value.trim();
                                                                            if (v) {
                                                                                const c = form.getValues(`options.${index}.values`);
                                                                                if (!c.includes(v)) form.setValue(`options.${index}.values`, [...c, v]);
                                                                                e.currentTarget.value = "";
                                                                            }
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                <Button type="button" variant="outline" className="w-full h-14 rounded-none border-2 border-dashed font-black text-[11px] uppercase tracking-widest hover:bg-blue-50 transition-colors" onClick={() => appendOption({ name: "", values: [] })}><Plus className="mr-2" /> Add Dimension</Button>
                                            </div>

                                            {variantFields.length > 0 && (
                                                <div className="pt-10 border-t-2 border-border scrollbar-hide overflow-x-auto">
                                                    <table className="w-full border-2 border-border border-collapse min-w-[600px]">
                                                        <thead>
                                                            <tr className="bg-muted text-[10px] uppercase font-black tracking-[0.2em]">
                                                                <th className="p-6 text-left">Variant Property</th>
                                                                <th className="p-6 text-left">Internal Price</th>
                                                                <th className="p-6 text-left">Available Qty</th>
                                                                <th className="p-6 text-left">Target SKU</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y-2 divide-border">
                                                            {variantFields.map((v, i) => (
                                                                <tr key={v.id} className="hover:bg-muted/30 transition-colors">
                                                                    <td className="p-6 font-black uppercase text-[12px]">{v.name}</td>
                                                                    <td className="p-6"><Input {...form.register(`variants.${i}.price`)} className="rounded-none h-10 border-2 font-black w-32" /></td>
                                                                    <td className="p-6"><Input {...form.register(`variants.${i}.quantity`)} className="rounded-none h-10 border-2 font-black w-24" /></td>
                                                                    <td className="p-6"><Input {...form.register(`variants.${i}.sku`)} className="rounded-none h-10 border-2 font-black uppercase" /></td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="h-64 border-2 border-dashed border-border flex flex-col items-center justify-center opacity-30 grayscale gap-4">
                                            <Layers className="h-10 w-10" />
                                            <span className="text-[11px] uppercase font-black tracking-widest">Dimension Matrix Disabled</span>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </section>

                        {/* Additional Sections (Shipping, SEO, Org etc. condensed for final high-performance view) */}
                        <section id="shipping"><Card className="rounded-none border-2 border-border"><CardHeader className="bg-muted/20 border-b-2 border-border p-8"><CardTitle className="text-[14px] uppercase font-black tracking-widest">05 Logistics Hub</CardTitle></CardHeader><CardContent className="p-10"><div className="flex items-center justify-between p-6 bg-blue-600/5 border-2 border-blue-600/20"><div className="space-y-1"><p className="text-[12px] uppercase font-black">Physical Fulfillment Required</p><p className="text-[10px] font-bold text-blue-700/60 uppercase">System will generate shipping labels</p></div><Switch checked={form.watch('isPhysical')} onCheckedChange={(v) => form.setValue('isPhysical', v)} /></div></CardContent></Card></section>

                    </main>

                    {/* --- Right Sidebar Metadata --- */}
                    <aside className="w-full lg:w-96 shrink-0 space-y-8 order-first lg:order-none lg:sticky lg:top-24">
                        <Card className="rounded-none border-2 border-border overflow-hidden bg-[#0a0a0a] text-white">
                            <CardHeader className="border-b-2 border-white/10 p-6 flex flex-row items-center justify-between">
                                <CardTitle className="text-[10px] uppercase font-black tracking-[0.3em]">System Telemetry</CardTitle>
                                <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                            </CardHeader>
                            <CardContent className="p-8 space-y-8">
                                <div className="space-y-4">
                                    <Label className="text-[11px] uppercase font-black text-white/40 tracking-widest">Active Status</Label>
                                    <Select onValueChange={(v) => form.setValue('status', v as any)} defaultValue={form.getValues('status')}>
                                        <SelectTrigger className="rounded-none h-12 border-white/20 bg-white/5 font-black uppercase tracking-widest text-[12px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-none bg-[#111] border-white/10 text-white">
                                            <SelectItem value="active" className="text-emerald-400">Published</SelectItem>
                                            <SelectItem value="draft" className="text-amber-400">Drafted</SelectItem>
                                            <SelectItem value="archived" className="text-pink-400">Archived</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="pt-8 border-t border-white/10 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] uppercase font-black text-white/40">Product Type</span>
                                        <Badge className="bg-white/10 text-white font-black rounded-none">VIRTUAL_CORE</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] uppercase font-black text-white/40">Sync Protocol</span>
                                        <span className="text-[11px] font-black uppercase text-blue-400">ACTIVE:STRIPE</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="rounded-none border-2 border-border">
                            <CardHeader className="p-6 border-b-2 border-border bg-muted/20">
                                <CardTitle className="text-[10px] uppercase font-black tracking-widest">Master Asset Preview</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 aspect-square flex items-center justify-center bg-muted/10 relative overflow-hidden group">
                                {primaryMedia ? (
                                    <img src={primaryMedia.url} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-125 grayscale hover:grayscale-0" />
                                ) : (
                                    <div className="flex flex-col items-center gap-4 opacity-10">
                                        <ImageIcon className="h-16 w-16" />
                                        <span className="text-[10px] uppercase font-black">Unmapped Asset</span>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </aside>
                </div>

                {/* Mobile sticky bottom bar */}
                <div className="fixed bottom-0 left-0 right-0 z-50 flex gap-3 p-4 bg-background border-t border-border md:hidden">
                    <Link href="/dashboard/products" className="flex-1">
                        <Button type="button" variant="outline" className="w-full rounded-none border-border h-12 font-black text-[10px] uppercase tracking-widest">
                            Cancel
                        </Button>
                    </Link>
                    <Button
                        disabled={loading}
                        type="submit"
                        className="flex-1 rounded-none bg-blue-600 hover:bg-blue-700 h-12 font-black text-[10px] uppercase tracking-widest"
                    >
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        Save
                    </Button>
                </div>
            </form>
        </Form>
    );
}
