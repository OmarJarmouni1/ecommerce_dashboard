import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
    title: string;
    value: string;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
    icon: LucideIcon;
    description?: string;
    loading?: boolean;
}

export function KPICard({
    title,
    value,
    change,
    trend,
    icon: Icon,
    description,
    loading
}: KPICardProps) {
    if (loading) {
        return <Card className="animate-pulse h-32" />;
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {(change || description) && (
                    <p className="text-xs text-muted-foreground">
                        {change && (
                            <span
                                className={cn(
                                    "mr-1 font-medium",
                                    trend === 'up' ? "text-green-500" :
                                        trend === 'down' ? "text-red-500" : "text-muted-foreground"
                                )}
                            >
                                {change}
                            </span>
                        )}
                        {description}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
