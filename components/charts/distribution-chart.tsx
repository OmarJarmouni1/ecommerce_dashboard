"use client";

import { useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';

interface DistributionChartProps {
    data: any[];
}

const COLORS = ['#2563eb', '#ec4899', '#1e40af', '#cbd5e1'];

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
            <text x={cx} y={cy} dy={-6} textAnchor="middle" fill={fill} className="text-xl font-black uppercase tracking-widest font-sans">
                {payload.name}
            </text>
            <text x={cx} y={cy} dy={16} textAnchor="middle" fill="var(--muted-foreground)" className="text-[10px] font-black uppercase tracking-[0.2em] font-sans">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius + 12}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
                stroke="var(--card)"
                strokeWidth={2}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 8}
                outerRadius={outerRadius + 12}
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
                        innerRadius={70}
                        outerRadius={95}
                        fill="#8884d8"
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                        onMouseLeave={() => setActiveIndex(undefined)}
                        paddingAngle={5}
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    {activeIndex === undefined && (
                        <g>
                            <text x="50%" y="50%" dy={-6} textAnchor="middle" fill="var(--foreground)" className="text-2xl font-black uppercase tracking-widest font-sans">
                                Total
                            </text>
                            <text x="50%" y="50%" dy={16} textAnchor="middle" fill="var(--muted-foreground)" className="text-[10px] font-black uppercase tracking-[0.2em] font-sans">
                                {total.toLocaleString()} UNITS
                            </text>
                        </g>
                    )}
                    <Legend
                        iconType="square"
                        formatter={(value) => <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-2">{value}</span>}
                        verticalAlign="bottom"
                        wrapperStyle={{ paddingTop: '20px' }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
