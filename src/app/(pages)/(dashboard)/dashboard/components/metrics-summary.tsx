import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatPercentage } from "@/lib/utils";

interface MetricsSummaryProps {
  monthlyRentAmount: number;
  monthlyRentChange: number;
  saleValueAmount: number;
  saleValueChange: number;
  annualCapitalGainAmount: number;
  annualCapitalGainChange: number;
}

export const MetricsSummary = ({
  monthlyRentAmount,
  monthlyRentChange,
  saleValueAmount,
  saleValueChange,
  annualCapitalGainAmount,
  annualCapitalGainChange,
}: MetricsSummaryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Renta Mensual Estimada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(monthlyRentAmount ?? 0)}
          </div>
          <p className="text-xs text-muted-foreground">
            {formatPercentage(monthlyRentChange ?? 0)} vs mes anterior
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Valor Estimado de Venta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(saleValueAmount ?? 0)}
          </div>
          <p className="text-xs text-muted-foreground">
            {formatPercentage(saleValueChange ?? 0)} vs mes anterior
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Plusvalía Anual Proyectada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatPercentage(annualCapitalGainAmount ?? 0)}
          </div>
          <p className="text-xs text-muted-foreground">
            {formatPercentage(annualCapitalGainChange ?? 0)} vs año anterior
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
