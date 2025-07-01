"use client";

import { useRouter } from "next/navigation";

import {
  parseAsBoolean,
  parseAsFloat,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "nuqs";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export const Filters = () => {
  const router = useRouter();

  const [selectedDistrict, setSelectedDistrict] = useQueryState(
    "alcaldia",
    parseAsString.withDefault("Todas")
  );

  const [bedrooms, setBedrooms] = useQueryState(
    "habitaciones",
    parseAsInteger.withDefault(2)
  );

  const [bathrooms, setBathrooms] = useQueryState(
    "baños",
    parseAsInteger.withDefault(2)
  );

  const [squareMeters, setSquareMeters] = useQueryState(
    "metros",
    parseAsInteger.withDefault(80)
  );

  const [currentIncome, setCurrentIncome] = useQueryState(
    "renta_actual",
    parseAsInteger.withDefault(1500)
  );

  const [currentValue, setCurrentValue] = useQueryState(
    "valor_actual",
    parseAsInteger.withDefault(150000)
  );

  const [occupancyRate, setOccupancyRate] = useQueryState(
    "tasa_ocupacion",
    parseAsFloat.withDefault(75)
  );

  const [worldEvent, setWorldEvent] = useQueryState(
    "evento_mundial",
    parseAsBoolean.withDefault(false)
  );

  const clearFilters = () => {
    setSquareMeters(null);
    setBedrooms(null);
    setBathrooms(null);
    setSquareMeters(null);
    setCurrentIncome(null);
    setCurrentValue(null);
    setOccupancyRate(null);
    setWorldEvent(null);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle>Filtros</CardTitle>
        <CardDescription>
          Personaliza los parámetros para las predicciones
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 justify-center items-center">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Alcaldía</Label>
            <Select
              value={selectedDistrict}
              onValueChange={(v) => setSelectedDistrict(v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar alcaldía" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todas">Todas</SelectItem>
                <SelectItem value="Benito Juárez">Benito Juárez</SelectItem>
                <SelectItem value="Cuauhtémoc">Cuauhtémoc</SelectItem>
                <SelectItem value="Miguel Hidalgo">Miguel Hidalgo</SelectItem>
                <SelectItem value="Coyoacán">Coyoacán</SelectItem>
                <SelectItem value="Álvaro Obregón">Álvaro Obregón</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Habitaciones: {bedrooms}
            </Label>
            <Slider
              value={[bedrooms]}
              min={1}
              max={5}
              step={1}
              onValueChange={(v) => setBedrooms(v[0])}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Baños: {bathrooms}</Label>
            <Slider
              value={[bathrooms]}
              min={1}
              max={4}
              step={1}
              onValueChange={(v) => setBathrooms(v[0])}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Metros cuadrados: {squareMeters}m²
            </Label>
            <Slider
              value={[squareMeters]}
              min={40}
              max={200}
              step={10}
              onValueChange={(v) => setSquareMeters(v[0])}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Renta Actual</Label>
            <Input
              type="number"
              min="0"
              value={currentIncome}
              onChange={(e) => setCurrentIncome(+e.target.value)}
              placeholder="1500"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Valor Actual</Label>
            <Input
              type="number"
              min="0"
              value={currentValue}
              onChange={(e) => setCurrentValue(+e.target.value)}
              placeholder="1500"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Tasa Ocupacion</Label>
            <Input
              type="number"
              min="0"
              max="100"
              value={occupancyRate}
              onChange={(e) => setOccupancyRate(+e.target.value)}
              placeholder="75"
            />
          </div>
          <div className="flex justify-center items-center gap-2">
            <Checkbox
              checked={worldEvent}
              onCheckedChange={(v) => setWorldEvent(Boolean(v))}
            />
            <Label className="text-sm font-medium">Evento Mundial</Label>
          </div>

          <Button className="cursor-pointer" onClick={() => router.refresh()}>
            Aplicar filtros
          </Button>
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={() => clearFilters()}
          >
            Borrar filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
