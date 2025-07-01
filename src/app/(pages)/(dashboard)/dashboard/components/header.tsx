"use client";

import { useState } from "react";

import { CalendarIcon, Download } from "lucide-react";

import { format } from "date-fns";
import { es } from "date-fns/locale";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const Header = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <header className="border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Dashboard de Predicciones Inmobiliarias
        </h1>
        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <CalendarIcon className="ml-auto size-4 opacity-50" />
                {date ? (
                  <span className="first-letter:uppercase">
                    {format(date, "MMMM yyyy", { locale: es })}
                  </span>
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="size-4" />
            <span>Exportar</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
