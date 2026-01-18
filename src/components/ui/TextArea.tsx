import React, { useEffect, useRef } from "react";
import cn from "@/lib/helpers/cn";

type TextAreaProps = Omit<React.ComponentProps<"textarea">, "onChange"> & {
  label?: string;
  maxLength?: number;
  showCounter?: boolean;
  minHeight?: number;
  value?: string;
  onChange?: (value: string) => void;
};

export default function TextArea({
  className,
  label,
  maxLength = 500,
  showCounter = true,
  minHeight = 100,
  value = "",
  onChange,
  ...props
}: TextAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${minHeight}px`;
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${Math.max(scrollHeight, minHeight)}px`;
    }
  }, [value, minHeight]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      onChange?.(newValue);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="font-medium text-sm text-gray-700">{label}</label>
      )}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          {...props}
          className={cn(
            "w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors resize-none",
            showCounter && "pb-8",
            className,
          )}
          style={{ minHeight: `${minHeight}px` }}
        />
        {showCounter && (
          <div className="absolute bottom-2 right-3 text-xs text-gray-500">
            {value.length}/{maxLength}
          </div>
        )}
      </div>
    </div>
  );
}
