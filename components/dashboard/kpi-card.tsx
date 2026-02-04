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
        <Card className="rounded-none border-border shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow bg-card">
            {/* Dynamic Accent Bar */}
            <div className={cn(
                "absolute left-0 top-0 bottom-0 w-1 transition-colors",
                trend === 'up' ? "bg-blue-600" : trend === 'down' ? "bg-pink-500" : "bg-border"
            )} />

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pl-6">
                <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground/50 group-hover:text-blue-600 transition-colors" />
            </CardHeader>
            <CardContent className="pl-6">
                <div className="text-3xl font-black text-foreground tracking-tighter">{value}</div>
                {(change || description) && (
                    <p className="text-[10px] uppercase tracking-widest font-bold mt-1">
                        {change && (
                            <span
                                className={cn(
                                    "mr-2",
                                    trend === 'up' ? "text-blue-600" :
                                        trend === 'down' ? "text-pink-500" : "text-muted-foreground"
                                )}
                            >
                                {change}
                            </span>
                        )}
                        <span className="text-muted-foreground/50">{description}</span>
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
