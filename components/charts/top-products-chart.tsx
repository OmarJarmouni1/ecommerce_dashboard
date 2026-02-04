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
            y={y}
            width={width}
            height={height}
            fill={fill}
            fillOpacity={1}
            radius={[0, 0, 0, 0]}
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
                            <stop offset="0%" stopColor="#2563eb" />
                            <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                    <XAxis type="number" hide />
                    <YAxis
                        dataKey="name"
                        type="category"
                        width={150}
                        tick={{ fontSize: 9, fill: "#94a3b8", fontWeight: 900 }}
                        interval={0}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip
                        cursor={{ fill: '#f8fafc' }}
                        contentStyle={{
                            borderRadius: "0px",
                            border: "1px solid #f1f5f9",
                            backgroundColor: "rgba(255,255,255,0.9)",
                            color: "#18181b",
                            fontSize: "10px",
                            fontWeight: "900",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                        }}
                    />
                    <Bar
                        dataKey="sales"
                        fill="url(#barGradient)"
                        radius={[0, 0, 0, 0]}
                        activeBar={<CustomActiveBar />}
                        barSize={32}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
