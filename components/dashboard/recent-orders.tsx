import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface RecentOrder {
    id: string;
    customer: {
        name: string;
        email: string;
        avatar?: string;
    };
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
}

interface RecentOrdersProps {
    orders: RecentOrder[];
}

export function RecentOrders({ orders }: RecentOrdersProps) {
    return (
        <Card className="rounded-none border-border shadow-sm relative overflow-hidden bg-card h-full">
            <CardHeader className="pl-6 pt-6 pb-2">
                <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent className="px-2">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-border">
                            <TableHead className="text-[9px] uppercase tracking-widest font-black text-muted-foreground/60 pl-4">Customer</TableHead>
                            <TableHead className="text-right text-[9px] uppercase tracking-widest font-black text-muted-foreground/60">Amount</TableHead>
                            <TableHead className="text-right text-[9px] uppercase tracking-widest font-black text-muted-foreground/60 pr-4">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id} className="border-border hover:bg-muted/50 transition-colors group">
                                <TableCell className="pl-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="relative h-8 w-8 rounded-none overflow-hidden border border-border shadow-sm">
                                            <Avatar className="h-full w-full rounded-none">
                                                <AvatarImage src={order.customer.avatar} alt={order.customer.name} />
                                                <AvatarFallback className="rounded-none bg-muted text-[10px] font-black text-muted-foreground">{order.customer.name[0]}</AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="text-xs font-black text-foreground leading-tight">{order.customer.name}</div>
                                            <div className="text-[9px] font-bold text-muted-foreground/70 uppercase tracking-tighter">{order.customer.email}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right py-4">
                                    <div className="text-xs font-black text-foreground">${order.amount.toFixed(2)}</div>
                                </TableCell>
                                <TableCell className="text-right py-4 pr-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <div className={cn(
                                            "h-1.5 w-1.5 rounded-full",
                                            order.status === 'success' ? "bg-blue-600" :
                                                order.status === 'processing' ? "bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.5)]" :
                                                    "bg-muted"
                                        )} />
                                        <span className={cn(
                                            "text-[9px] font-black uppercase tracking-widest",
                                            order.status === 'success' ? "text-blue-600" :
                                                order.status === 'processing' ? "text-pink-600" :
                                                    "text-muted-foreground"
                                        )}>
                                            {order.status}
                                        </span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
