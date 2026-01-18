import React from "react";
import cn from "@/lib/helpers/cn";

type ToggleOption = {
  id: string;
  label: string;
  icon?: React.ReactNode;
};

type ToggleButtonProps = {
  options: ToggleOption[];
  selected: string;
  onSelect: (id: string) => void;
  className?: string;
};

export default function ToggleButton({
  options,
  selected,
  onSelect,
  className,
}: ToggleButtonProps) {
  return (
    <div
      className={cn(
        "inline-flex bg-white rounded-full p-1 shadow-sm border border-gray-200",
        className
      )}
    >
      {options.map((option) => {
        const isSelected = selected === option.id;
        return (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-medium transition-all duration-200",
              isSelected
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            <span className="flex items-center gap-2">
              {option.icon}
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}