import Link from "next/link";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center space-y-6 mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Predictor de Inversión Inmobiliaria
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Utiliza inteligencia artificial para predecir el rendimiento de tus
          inversiones inmobiliarias y toma decisiones informadas.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/dashboard">Comenzar Análisis</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card>
          <CardHeader>
            <Icons.calculator className="h-8 w-8 text-primary" />
            <CardTitle>Cálculos Precisos</CardTitle>
            <CardDescription>
              Algoritmos avanzados para calcular ingresos por renta y plusvalía
              esperada
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Icons.barChart className="h-8 w-8 text-primary" />
            <CardTitle>Visualización Clara</CardTitle>
            <CardDescription>
              Gráficas interactivas que muestran la evolución de tu inversión
              mes a mes
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Icons.trendingUp className="h-8 w-8 text-primary" />
            <CardTitle>Predicciones IA</CardTitle>
            <CardDescription>
              Modelos de machine learning para proyecciones más precisas del
              mercado
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
