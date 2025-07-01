"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

interface District {
  id: number;
  name: string;
  x: number;
  y: number;
  value: number;
  rent: number;
}

interface PropertyValueMapProps {
  districts: District[];
}

export const PropertyValueMap = ({ districts }: PropertyValueMapProps) => {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  return (
    <div className="relative w-full h-full bg-muted/20 rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-30" />

      {districts.map((district) => (
        <div
          key={district.id}
          className="absolute"
          style={{
            left: `${district.x}%`,
            top: `${district.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          onMouseEnter={() => setHoveredDistrict(district.name)}
          onMouseLeave={() => setHoveredDistrict(null)}
        >
          <div className="relative">
            <MapPin
              className="h-8 w-8 text-primary"
              fill={
                hoveredDistrict === district.name
                  ? "currentColor"
                  : "transparent"
              }
            />
            {hoveredDistrict === district.name && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-background border rounded-md shadow-md whitespace-nowrap z-10">
                <div className="font-semibold">{district.name}</div>
                <div className="text-sm">
                  Valor: ${(district.value / 1000000).toFixed(2)}M MXN
                </div>
                <div className="text-sm">
                  Renta: ${district.rent.toLocaleString()} MXN
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="absolute bottom-4 right-4 bg-background/90 p-3 rounded-md border shadow-sm">
        <div className="text-sm font-semibold mb-2">Valor promedio por m²</div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-xs">Alto (&gt;$45,000/m²)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-xs">Medio ($30,000-$45,000/m²)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-xs">Bajo (&lt;$30,000/m²)</span>
        </div>
      </div>
    </div>
  );
};
