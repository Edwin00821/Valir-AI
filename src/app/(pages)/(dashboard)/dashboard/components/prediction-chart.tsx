"use client";

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface PredictionData {
  month: string;
  actual: number | null;
  predicted: number;
}

interface PredictionChartProps {
  type: "rent" | "value";
  rentData?: PredictionData[];
  valueData?: PredictionData[];
}

export const PredictionChart = ({
  type,
  rentData,
  valueData,
}: PredictionChartProps) => {
  const data = type === "rent" ? rentData : valueData;

  const formatter =
    type === "rent"
      ? (value: number) => `$${value.toLocaleString()} MXN`
      : (value: number) => `$${(value / 1000000).toFixed(2)}M MXN`;

  return (
    <ChartContainer
      config={{
        actual: {
          label: "Valor Real",
          color: "var(--chart-1)",
        },
        predicted: {
          label: "Predicción",
          color: "var(--chart-2)",
        },
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data ?? []}>
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.split(" ")[0]}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={formatter}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="actual"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            stroke="var(--color-actual)"
          />
          <Line
            type="monotone"
            dataKey="predicted"
            strokeWidth={2}
            strokeDasharray="5 5"
            activeDot={{ r: 6 }}
            stroke="var(--color-predicted)"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
