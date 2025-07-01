"use client";

import {
  Bar,
  BarChart,
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

interface DistrictData {
  name: string;
  rentAvg: number;
  valueAvg: number;
  appreciation: number;
}

interface DistrictComparisonChartProps {
  districtData: DistrictData[];
}

export const DistrictComparisonChart = ({
  districtData,
}: DistrictComparisonChartProps) => {
  return (
    <ChartContainer
      config={{
        rentAvg: {
          label: "Renta Promedio (MXN)",
          color: "var(--chart-1)",
        },
        valueAvg: {
          label: "Valor Promedio (MXN)",
          color: "var(--chart-2)",
        },
        appreciation: {
          label: "Plusvalía Anual (%)",
          color: "var(--chart-3)",
        },
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={districtData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tickLine={false} axisLine={false} />
          <YAxis
            yAxisId="left"
            orientation="left"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="rentAvg"
            fill="var(--color-rentAvg)"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            yAxisId="left"
            dataKey="valueAvg"
            fill="var(--color-valueAvg)"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            yAxisId="right"
            dataKey="appreciation"
            fill="var(--color-appreciation)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
