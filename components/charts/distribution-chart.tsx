import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface DistributionItem {
    name: string;
    value: number;
}

interface DistributionChartProps {
    data: DistributionItem[];
}

const COLORS = ['#2563eb', '#ec4899', '#1e40af', '#cbd5e1'];

export function DistributionChart({ data }: DistributionChartProps) {
    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="w-full">
            <Table>
                <TableHeader className="bg-muted/30 border-y border-border">
                    <TableRow className="hover:bg-transparent border-none">
                        <TableHead className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground px-4 h-10">Category</TableHead>
                        <TableHead className="text-right text-[10px] uppercase tracking-widest font-bold text-muted-foreground px-4 h-10">Value</TableHead>
                        <TableHead className="text-right text-[10px] uppercase tracking-widest font-bold text-muted-foreground px-4 h-10">Share</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item, idx) => (
                        <TableRow key={idx} className="border-b border-border hover:bg-muted/30 transition-colors">
                            <TableCell className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="h-2 w-2 rounded-none"
                                        style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                                    />
                                    <span className="font-bold text-xs text-foreground uppercase tracking-widest">{item.name}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-right px-4 py-3">
                                <span className="font-mono text-xs font-bold text-muted-foreground">{item.value.toLocaleString()}</span>
                            </TableCell>
                            <TableCell className="text-right px-4 py-3">
                                <span className="font-black text-xs text-foreground">
                                    {((item.value / total) * 100).toFixed(1)}%
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
