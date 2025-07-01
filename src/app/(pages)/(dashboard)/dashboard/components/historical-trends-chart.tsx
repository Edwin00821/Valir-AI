"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface Historical {
  year: string;
  rent: number;
  value: number;
}

interface HistoricalTrendsChartProps {
  historicalData: Historical[];
}

export const HistoricalTrendsChart = ({
  historicalData,
}: HistoricalTrendsChartProps) => {
  return (
    <ChartContainer
      config={{
        rent: {
          label: "Renta Promedio (MXN)",
          color: "var(--chart-1)",
        },
        value: {
          label: "Valor Promedio (MXN)",
          color: "var(--chart-2)",
        },
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={historicalData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="year" tickLine={false} axisLine={false} />
          <YAxis
            yAxisId="left"
            orientation="left"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="rent"
            fill="var(--color-rent)"
            fillOpacity={0.3}
            stroke="var(--color-rent)"
          />
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="value"
            fill="var(--color-value)"
            fillOpacity={0.3}
            stroke="var(--color-value)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
