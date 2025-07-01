import "server-only";

import { unstable_cache } from "@/lib/unstable-cache";

import type { GetPredictionsSchema } from "./validations";
import { env } from "@/env";
import { transformRentAndValueData } from "./utils";

export async function getPredictions(input: GetPredictionsSchema) {
  return await unstable_cache(
    async () => {
      try {
        const response = await fetch(`${env.API_URL}/predict`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            alcaldia: input.alcaldia ?? "Todas",
            habitaciones: input.habitaciones ?? 2,
            baños: input.baños ?? 2,
            metros: input.metros ?? 80,
            renta_actual: input.renta_actual ?? 1500,
            valor_actual: input.valor_actual ?? 150000,
            tasa_ocupacion: input.tasa_ocupacion ?? 75,
            evento_mundial: input.evento_mundial ?? false,
            fecha: input.fecha ?? "string",
          }),
        });

        const data = await response.json();

        const mock = {
          renta: {
            plusvalia_pct: 10.09,
            renta_mensual_estimada: 1009467.99,

            renta_estimada: [
              84122.33243385951, 168244.66486771902, 252366.99730157852,
              336489.32973543805, 420611.6621692976, 504733.9946031571,
              588856.3270370166, 672978.6594708761, 757100.9919047356,
              841223.324338595, 925345.6567724545, 1009467.989206314,
            ],
            renta_real: [80000, 168200],
          },
          plusvalia: {
            plusvalia_pct: 10.09,
            plusvalia_total: 1009467.99,
            plusvalia_estimada: [
              84122.33243385951, 168244.66486771902, 252366.99730157852,
              336489.32973543805, 420611.6621692976, 504733.9946031571,
              588856.3270370166, 672978.6594708761, 757100.9919047356,
              841223.324338595, 925345.6567724545, 1009467.989206314,
            ],
            plusvalia_real: [84100, 168200],
          },
        };

        const mockParsed = transformRentAndValueData(mock, new Date());

        return {
          rentData: mockParsed.rentData,
          valueData: mockParsed.valueData,

          monthlyRentAmount: mock.renta.renta_mensual_estimada,
          monthlyRentChange: 5.2,
          saleValueAmount: mock.plusvalia.plusvalia_total,
          saleValueChange: 2.8,
          annualCapitalGainAmount: mock.plusvalia.plusvalia_pct,
          annualCapitalGainChange: 0.3,
        };
      } catch (_err) {
        return {
          rentData: undefined,
          valueData: undefined,

          monthlyRentAmount: 0,
          monthlyRentChange: 0,
          saleValueAmount: 0,
          saleValueChange: 0,
          annualCapitalGainAmount: 0,
          annualCapitalGainChange: 0,
        };
      }
    },
    [JSON.stringify(input)],
    {
      revalidate: 1,
      tags: ["predictions"],
    }
  )();
}
