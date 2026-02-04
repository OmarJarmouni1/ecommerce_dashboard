"use client";

import { useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';

interface DistributionChartProps {
    data: any[];
}

const COLORS = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)'];

const RADIAN = Math.PI / 180;
const renderActiveShape = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={-4} textAnchor="middle" fill={fill} className="text-lg font-bold font-sans">
                {payload.name}
            </text>
            <text x={cx} y={cy} dy={20} textAnchor="middle" fill="var(--muted-foreground)" className="text-sm font-sans">
                {`(${(percent * 100).toFixed(0)}%)`}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius + 10}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
        </g>
    );
};

export function DistributionChart({ data }: DistributionChartProps) {
    const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index);
    };

    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        // @ts-ignore
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                        onMouseLeave={() => setActiveIndex(undefined)}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    {activeIndex === undefined && (
                        <g>
                            <text x="50%" y="50%" dy={-4} textAnchor="middle" fill="var(--foreground)" className="text-lg font-bold font-sans">
                                Total
                            </text>
                            <text x="50%" y="50%" dy={20} textAnchor="middle" fill="var(--muted-foreground)" className="text-sm font-sans">
                                {total.toLocaleString()}
                            </text>
                        </g>
                    )}
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
