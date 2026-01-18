import React from "react";
import cn from "@/lib/helpers/cn";

type ScrollAreaProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  padding?: number; // optional, default padding in px
};

export default function ScrollArea({
  className,
  children,
  padding = 10, // default 5 (1.25rem) -> 20px
  ...props
}: ScrollAreaProps) {
  return (
    <div {...props} className={cn("h-full", "overflow-y-scroll", "bg-background")}>
      <div className={cn(`py-${padding} w-full h-max`, className)}>
        {children}
      </div>
    </div>
  );
}
