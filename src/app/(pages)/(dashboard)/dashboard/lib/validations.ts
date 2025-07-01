import {
  createSearchParamsCache,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const searchParamsCache = createSearchParamsCache({
  alcaldia: parseAsString.withDefault(""),
  habitaciones: parseAsInteger.withDefault(0),
  baños: parseAsInteger.withDefault(0),
  metros: parseAsInteger.withDefault(0),
  renta_actual: parseAsInteger.withDefault(0),
  valor_actual: parseAsInteger.withDefault(0),
  tasa_ocupacion: parseAsInteger.withDefault(0),
  evento_mundial: parseAsBoolean.withDefault(false),
  fecha: parseAsString.withDefault(""),
});

export type GetPredictionsSchema = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
