import React from "react";
import cn from "@/lib/helpers/cn";

type RoundedIconWithBackgroundProps = React.ComponentProps<"div"> & {
  size?: number;
  bgColor?: string;
};

export default function RoundedIconWithBackground({
  size = 40,
  bgColor = "bg-gray-200",
  className,
  children,
  ...props
}: RoundedIconWithBackgroundProps) {
  return (
    <div
      {...props}
      className={cn(
        "flex items-center justify-center rounded-full",
        bgColor,
        className,
      )}
      style={{ width: size, height: size }}
    >
      {children}
    </div>
  );
}
