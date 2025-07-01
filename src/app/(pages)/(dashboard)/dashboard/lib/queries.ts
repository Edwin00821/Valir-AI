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

        console.log(input);

        const dataParsed = transformRentAndValueData(data, new Date());

        return {
          rentData: dataParsed.rentData,
          valueData: dataParsed.valueData,

          monthlyRentAmount: data.renta.renta_mensual_estimada,
          monthlyRentChange: data.renta.cambio_en_renta_mensual,
          saleValueAmount: data.plusvalia.valor_estimado_de_venta,
          saleValueChange: data.plusvalia.cambio_estimado_de_venta,
          annualCapitalGainAmount: data.plusvalia.plusvalia_pct,
          annualCapitalGainChange: data.plusvalia.plusvalia_pct,
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
