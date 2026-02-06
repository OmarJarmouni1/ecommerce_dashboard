"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { Product } from "./columns";

interface ProductMobileCardProps {
    product: Product;
    selected?: boolean;
    onToggle?: () => void;
}

export function ProductMobileCard({ product, selected, onToggle }: ProductMobileCardProps) {
    const stock = product.stock;
    let stockStatus = { label: "In Stock", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" };
    if (stock === 0) stockStatus = { label: "Out of Stock", color: "text-pink-500 bg-pink-500/10 border-pink-500/20" };
    else if (stock < 10) stockStatus = { label: "Low Stock", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" };

    return (
        <Link href={`/dashboard/products/${product.id}`}>
            <div
                className="flex items-center gap-3 p-4 bg-card border border-border rounded-none active:bg-muted/50 transition-colors"
                onClick={(e) => {
                    if ((e.target as HTMLElement).closest("[data-prevent-link]")) {
                        e.preventDefault();
                    }
                }}
            >
                {onToggle != null && (
                    <div data-prevent-link className="flex items-center" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                            checked={!!selected}
                            onCheckedChange={() => onToggle()}
                            aria-label="Select product"
                            className="rounded-none border-muted-foreground/50 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        />
                    </div>
                )}
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-none border border-border bg-muted">
                    {product.image ? (
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs opacity-30">IMG</div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-foreground truncate">{product.name}</p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{product.sku}</p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="font-black text-base text-foreground">${product.price.toFixed(2)}</span>
                        <Badge className={cn("rounded-none text-[8px] uppercase tracking-widest font-bold px-1.5 py-0", stockStatus.color)}>
                            {stockStatus.label}
                        </Badge>
                        <Badge
                            variant={product.status === "active" ? "default" : "secondary"}
                            className={cn(
                                "rounded-none text-[8px] uppercase tracking-widest font-bold",
                                product.status === "active" ? "bg-blue-600" : "bg-muted text-muted-foreground"
                            )}
                        >
                            {product.status}
                        </Badge>
                    </div>
                </div>
            </div>
        </Link>
    );
}
