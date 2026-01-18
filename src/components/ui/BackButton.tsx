import React from "react";
import { LuArrowLeft } from "react-icons/lu";
import cn from "@/lib/helpers/cn";

type BackButtonProps = {
  label?: string;
  onClick?: () => void;
  className?: string;
};

export default function BackButton({
  label = "Back",
  onClick,
  className,
}: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group cursor-pointer",
        className,
      )}
    >
      <LuArrowLeft
        size={20}
        className="transition-transform group-hover:-translate-x-1"
      />
      <span className="text-sm">{label}</span>
    </button>
  );
}
