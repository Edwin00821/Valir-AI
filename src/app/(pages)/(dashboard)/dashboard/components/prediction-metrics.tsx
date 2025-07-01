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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface Metric {
  model: string;
  mae: number;
  rmse: number;
  r2: number;
}

interface PredictionMetricsProps {
  metricsData: Metric[];
}

export const PredictionMetrics = ({ metricsData }: PredictionMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Métricas de Error</CardTitle>
          <CardDescription>MAE y RMSE por modelo</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              mae: {
                label: "Error Absoluto Medio",
                color: "var(--chart-1)",
              },
              rmse: {
                label: "Raíz del Error Cuadrático Medio",
                color: "var(--chart-2)",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metricsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="model" tickLine={false} axisLine={false} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) =>
                    value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value
                  }
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar
                  dataKey="mae"
                  fill="var(--color-mae)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="rmse"
                  fill="var(--color-rmse)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Coeficiente de Determinación (R²)</CardTitle>
          <CardDescription>Precisión del modelo</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              r2: {
                label: "R²",
                color: "var(--chart-3)",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metricsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="model" tickLine={false} axisLine={false} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 1]}
                  tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar
                  dataKey="r2"
                  fill="var(--color-r2)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
