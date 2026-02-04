import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface TopProduct {
    name: string;
    sales: number;
    revenue: number;
    growth: string;
}

interface TopProductsChartProps {
    data: TopProduct[];
}

export function TopProductsChart({ data }: TopProductsChartProps) {
    return (
        <div className="w-full">
            <Table>
                <TableHeader className="bg-muted/30 border-y border-border">
                    <TableRow className="hover:bg-transparent border-none">
                        <TableHead className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground px-4 h-10">Product</TableHead>
                        <TableHead className="text-center text-[10px] uppercase tracking-widest font-bold text-muted-foreground px-4 h-10">Sales</TableHead>
                        <TableHead className="text-right text-[10px] uppercase tracking-widest font-bold text-muted-foreground px-4 h-10">Revenue</TableHead>
                        <TableHead className="text-center text-[10px] uppercase tracking-widest font-bold text-muted-foreground px-4 h-10">Trend</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((product, idx) => (
                        <TableRow key={idx} className="border-b border-border hover:bg-muted/30 transition-colors">
                            <TableCell className="px-4 py-4">
                                <span className="font-bold text-sm text-foreground">{product.name}</span>
                            </TableCell>
                            <TableCell className="text-center px-4 py-4">
                                <span className="font-mono text-xs font-bold text-muted-foreground">{product.sales}</span>
                            </TableCell>
                            <TableCell className="text-right px-4 py-4">
                                <span className="font-black text-sm text-foreground">${product.revenue.toFixed(2)}</span>
                            </TableCell>
                            <TableCell className="text-center px-4 py-4">
                                <div className="flex justify-center">
                                    <Badge variant="outline" className="rounded-none uppercase text-[9px] tracking-widest font-bold py-0.5 border-emerald-500/20 bg-emerald-500/5 text-emerald-500">
                                        {product.growth}
                                    </Badge>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
