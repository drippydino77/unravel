import React from "react";
import cn from "@/lib/helpers/cn";

type CircularBadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: number; // diameter in px
  className?: string;
};

export default function CircularBadge({
  size = 24,
  className,
  children,
  ...props
}: CircularBadgeProps) {
  return (
    <div
      {...props}
      className={cn(
        "flex items-center justify-center rounded-full bg-brand shadow z-10",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {children}
    </div>
  );
}
