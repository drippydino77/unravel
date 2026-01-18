import React from "react";
import cn from "@/lib/helpers/cn";
import { ColorTheme } from "@/types/color";
import { ColorOption } from "@/types/color";


type ColorSelectorProps = {
  colors?: ColorOption[];
  selectedColor?: ColorTheme;
  onColorChange?: (colorId: ColorTheme) => void;
  className?: string;
};

const defaultColors: ColorOption[] = [
  {id:"black", color:"#000000", name: "Black"}
];

export default function ColorSelector({
  colors = defaultColors,
  selectedColor,
  onColorChange,
  className,
}: ColorSelectorProps) {
  return (
    <div className={cn("flex gap-3", className)}>
      {colors.map((colorOption) => {
        const isSelected = selectedColor === colorOption.id;
        return (
          <button
            key={colorOption.id}
            onClick={() => onColorChange?.(colorOption.id)}
            className={cn(
              "w-12 h-12 rounded-full transition-all cursor-pointer border-4",
              isSelected
                ? "border-gray-800 scale-110"
                : "border-transparent hover:scale-105",
            )}
            style={{ backgroundColor: colorOption.color }}
            aria-label={`Select ${colorOption.name} color`}
          />
        );
      })}
    </div>
  );
}
