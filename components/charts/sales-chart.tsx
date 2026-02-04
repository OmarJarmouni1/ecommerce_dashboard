"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SalesChartProps {
    data: any[];
}

export function SalesChart({ data }: SalesChartProps) {
    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis
                                dataKey="name"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: "8px", border: "none", backgroundColor: "var(--background)", color: "var(--foreground)" }}
                                itemStyle={{ color: "var(--primary)" }}
                            />
                            <Line
                                type="monotone"
                                dataKey="total"
                                stroke="var(--primary)"
                                strokeWidth={2}
                                activeDot={{ r: 8 }}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
