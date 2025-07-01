import { SearchParams } from "@/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getPredictions } from "./lib/queries";
import { searchParamsCache } from "./lib/validations";

import { Header } from "./components/header";
import { Filters } from "./components/filters";
import { PredictionChart } from "./components/prediction-chart";
import { DistrictComparisonChart } from "./components/district-comparison-chart";
import { PropertyValueMap } from "./components/property-value-map";
import { PredictionMetrics } from "./components/prediction-metrics";
import { HistoricalTrendsChart } from "./components/historical-trends-chart";
import { MetricsSummary } from "./components/metrics-summary";
import { notFound } from "next/navigation";

interface DashboardPageProps {
  searchParams: SearchParams;
}

const districtData = [
  {
    name: "Benito Juárez",
    rentAvg: 22500,
    valueAvg: 4200000,
    appreciation: 9.2,
  },
  {
    name: "Miguel Hidalgo",
    rentAvg: 25000,
    valueAvg: 4800000,
    appreciation: 8.7,
  },
  {
    name: "Cuauhtémoc",
    rentAvg: 19800,
    valueAvg: 3800000,
    appreciation: 8.5,
  },
  {
    name: "Coyoacán",
    rentAvg: 18500,
    valueAvg: 3500000,
    appreciation: 7.8,
  },
  {
    name: "Álvaro Obregón",
    rentAvg: 17200,
    valueAvg: 3200000,
    appreciation: 7.2,
  },
];

const districts = [
  { id: 1, name: "Benito Juárez", x: 50, y: 50, value: 4200000, rent: 22500 },
  {
    id: 2,
    name: "Miguel Hidalgo",
    x: 30,
    y: 30,
    value: 4800000,
    rent: 25000,
  },
  { id: 3, name: "Cuauhtémoc", x: 55, y: 35, value: 3800000, rent: 19800 },
  { id: 4, name: "Coyoacán", x: 60, y: 65, value: 3500000, rent: 18500 },
  {
    id: 5,
    name: "Álvaro Obregón",
    x: 25,
    y: 55,
    value: 3200000,
    rent: 17200,
  },
];

const historicalData = [
  { year: "2020", rent: 14500, value: 2800000 },
  { year: "2021", rent: 15200, value: 2950000 },
  { year: "2022", rent: 16100, value: 3050000 },
  { year: "2023", rent: 17000, value: 3150000 },
  { year: "2024", rent: 18000, value: 3250000 },
  { year: "2025", rent: 18500, value: 3350000 },
];

const metricsData = [
  { model: "XGBoost (Renta)", mae: 520, rmse: 680, r2: 0.92 },
  { model: "XGBoost (Valor)", mae: 85000, rmse: 120000, r2: 0.89 },
  { model: "Prophet (Renta)", mae: 580, rmse: 750, r2: 0.88 },
  { model: "Prophet (Valor)", mae: 95000, rmse: 135000, r2: 0.85 },
];

export default async function DashboardPage(props: DashboardPageProps) {
  const searchParams = props.searchParams;

  const search = await searchParamsCache.parse(searchParams);

  const predictions = await getPredictions(search);

  if (predictions == null) return notFound();

  const selectedDistrict = "Todas";

  const selected =
    selectedDistrict !== "Todas" ? selectedDistrict : "todas las alcaldías";

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-6 overflow-auto bg-muted/20">
          {/* Filters */}
          <Filters />

          <MetricsSummary
            monthlyRentAmount={predictions.monthlyRentAmount}
            monthlyRentChange={predictions.monthlyRentChange}
            saleValueAmount={predictions.saleValueAmount}
            saleValueChange={predictions.saleValueChange}
            annualCapitalGainAmount={predictions.annualCapitalGainAmount}
            annualCapitalGainChange={predictions.annualCapitalGainChange}
          />

          {/* Main Dashboard Content */}
          <Tabs defaultValue="predictions">
            <TabsList className="mb-4">
              <TabsTrigger value="predictions">Predicciones</TabsTrigger>
              <TabsTrigger value="comparison">
                Comparativa por Alcaldía
              </TabsTrigger>
              <TabsTrigger value="map">Mapa de Valores</TabsTrigger>
              <TabsTrigger value="historical">
                Tendencias Históricas
              </TabsTrigger>
              <TabsTrigger value="metrics">Métricas del Modelo</TabsTrigger>
            </TabsList>

            <TabsContent value="predictions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Predicción de Renta Mensual (12 meses)</CardTitle>
                  <CardDescription>
                    Proyección basada en modelo XGBoost y Prophet para{" "}
                    {selected}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="min-h-[400px] mt-8">
                    <PredictionChart
                      type="rent"
                      rentData={predictions.rentData}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Predicción de Plusvalía (12 meses)</CardTitle>
                  <CardDescription>
                    Proyección de valorización para {selected}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="min-h-[400px]">
                    <PredictionChart
                      type="value"
                      valueData={predictions.valueData}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comparison">
              <Card>
                <CardHeader>
                  <CardTitle>Comparativa por Alcaldía</CardTitle>
                  <CardDescription>
                    Análisis comparativo de renta y plusvalía entre alcaldías
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="min-h-[600px]">
                    <DistrictComparisonChart districtData={districtData} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="map">
              <Card>
                <CardHeader>
                  <CardTitle>Mapa de Valores Inmobiliarios</CardTitle>
                  <CardDescription>
                    Distribución geográfica de precios en la Ciudad de México
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[600px]">
                    <PropertyValueMap districts={districts} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="historical">
              <Card>
                <CardHeader>
                  <CardTitle>Tendencias Históricas</CardTitle>
                  <CardDescription>
                    Evolución de precios en los últimos 5 años
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="min-h-[600px]">
                    <HistoricalTrendsChart historicalData={historicalData} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="metrics">
              <Card>
                <CardHeader>
                  <CardTitle>Métricas de Rendimiento del Modelo</CardTitle>
                  <CardDescription>
                    Evaluación de precisión de las predicciones
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[600px]">
                    <PredictionMetrics metricsData={metricsData} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
