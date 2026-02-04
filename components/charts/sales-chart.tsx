"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SalesChartProps {
    data: any[];
}

export function SalesChart({ data }: SalesChartProps) {
    return (
        <div className="space-y-4 h-full flex flex-col">
            <div className="flex flex-col">
                <h3 className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">Sales Performance</h3>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-foreground tracking-tighter">Growth</span>
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">+12.5%</span>
                </div>
            </div>

            <div className="flex-1 min-h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <defs>
                            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#2563eb" />
                                <stop offset="100%" stopColor="#ec4899" />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                        <XAxis
                            dataKey="name"
                            stroke="var(--muted-foreground)"
                            fontSize={9}
                            fontWeight={900}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="var(--muted-foreground)"
                            fontSize={9}
                            fontWeight={900}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip
                            contentStyle={{
                                borderRadius: "0px",
                                border: "1px solid var(--border)",
                                backgroundColor: "var(--popover)",
                                color: "var(--popover-foreground)",
                                fontSize: "10px",
                                fontWeight: "900",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="total"
                            stroke="url(#lineGradient)"
                            strokeWidth={4}
                            activeDot={{ r: 6, fill: "var(--primary)", strokeWidth: 2, stroke: "var(--background)" }}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
