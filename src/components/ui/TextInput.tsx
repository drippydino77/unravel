import React from "react";
import cn from "@/lib/helpers/cn";

type TextInputProps = React.ComponentProps<"input"> & {
  label?: string;
};

export default function TextInput({
  className,
  label,
  ...props
}: TextInputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="font-medium text-sm text-gray-700">{label}</label>
      )}
      <input
        type="text"
        {...props}
        className={cn(
          "w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors",
          className,
        )}
      />
    </div>
  );
}
