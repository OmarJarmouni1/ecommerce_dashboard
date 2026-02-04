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
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={order.customer.avatar} alt={order.customer.name} />
                                            <AvatarFallback>{order.customer.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="font-medium">
                                            <div className="text-sm">{order.customer.name}</div>
                                            <div className="text-xs text-muted-foreground">{order.customer.email}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right font-medium">
                                    ${order.amount.toFixed(2)}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Badge
                                        variant={order.status === 'success' ? 'default' : 'secondary'}
                                        className={
                                            order.status === 'success' ? 'bg-green-500 hover:bg-green-600' :
                                                order.status === 'processing' ? 'bg-blue-500 hover:bg-blue-600' :
                                                    'bg-gray-500'
                                        }
                                    >
                                        {order.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
