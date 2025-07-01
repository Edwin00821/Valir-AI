import { addMonths, format } from "date-fns";
import { es } from "date-fns/locale";

type RentPlusvaliaResponse = {
  renta: {
    renta_estimada: number[];
    renta_real: number[];
  };
  plusvalia: {
    plusvalia_estimada: number[];
    plusvalia_real: number[];
  };
};

export function generateMonthLabels(start: Date, count: number): string[] {
  return Array.from({ length: count }, (_, i) =>
    format(addMonths(start, i), "MMM yyyy", { locale: es })
  );
}

export function transformRentAndValueData(
  data: RentPlusvaliaResponse,
  startMonth: Date
) {
  const months = generateMonthLabels(
    startMonth,
    data.renta.renta_estimada.length
  );

  const rentData = months.map((month, i) => ({
    month,
    actual: data.renta.renta_real[i] ?? null,
    predicted: data.renta.renta_estimada[i],
  }));

  const valueData = months.map((month, i) => ({
    month,
    actual: data.plusvalia.plusvalia_real[i] ?? null,
    predicted: data.plusvalia.plusvalia_estimada[i],
  }));

  return { rentData, valueData };
}
