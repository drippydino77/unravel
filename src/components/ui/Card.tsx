import React from "react";
import cn from "@/lib/helpers/cn";
import CircularBadge from "./CircularBadge";
import { LuCheck } from "react-icons/lu"; // any check icon

type CardProps = React.ComponentProps<"div"> & {
  variant?: "default" | "elevated" | "outlined";
  selected?: boolean;
};

export default function Card({
  className,
  children,
  variant = "default",
  selected = false,
  ...props
}: CardProps) {
  const baseClass =
    "bg-white rounded-lg p-6 shadow-sm border border-transparent";

  const variantClass = {
    default: "shadow-sm",
    elevated: "shadow-lg",
    outlined: "border-gray-300",
  }[variant];

  const selectedClass = selected
    ? "!border-brand" // brand outline when selected
    : "";

  return (
    <div
      {...props}
      className={cn(baseClass, variantClass, className, selectedClass)}
    >
      {/* Tick badge on top-right */}
      {selected && (
        <div className="absolute top-2 right-2 z-30">
          <CircularBadge size={24} className="bg-brand text-white">
            <LuCheck size={16} />
          </CircularBadge>
        </div>
      )}

      {children}
    </div>
  );
}
