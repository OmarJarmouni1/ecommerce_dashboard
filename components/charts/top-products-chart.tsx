"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Rectangle } from 'recharts';

interface TopProductsChartProps {
    data: any[];
}

const CustomActiveBar = (props: any) => {
    const { x, y, width, height, fill } = props;
    return (
        <Rectangle
            {...props}
            x={x}
            y={y - 2}
            width={width}
            height={height + 4}
            fill={fill}
            fillOpacity={1}
            radius={[0, 4, 4, 0]}
        />
    );
};

export function TopProductsChart({ data }: TopProductsChartProps) {
    return (
        <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0.8} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
                    <XAxis type="number" hide />
                    <YAxis
                        dataKey="name"
                        type="category"
                        width={120}
                        tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                        interval={0}
                    />
                    <Tooltip
                        cursor={{ fill: 'var(--muted)', opacity: 0.2 }}
                        contentStyle={{
                            borderRadius: "8px",
                            border: "1px solid var(--border)",
                            backgroundColor: "var(--popover)",
                            color: "var(--popover-foreground)",
                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                        }}
                    />
                    <Bar
                        dataKey="sales"
                        fill="url(#barGradient)"
                        radius={[0, 4, 4, 0]}
                        activeBar={<CustomActiveBar />}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
