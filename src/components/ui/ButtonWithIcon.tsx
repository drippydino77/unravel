import cn from "@/lib/helpers/cn";
import React from "react";

type ButtonWithIconProps = React.ComponentProps<"div"> & {
  onClickEnabled?: boolean;
};

export default function ButtonWithIcon({
  className,
  children,
  onClick,
  onClickEnabled = true,
  ...props
}: ButtonWithIconProps) {
  // Only attach onClick if enabled
  const handleClick: React.MouseEventHandler<HTMLDivElement> | undefined =
    onClickEnabled
      ? (e) => {
          e.stopPropagation();
          onClick?.(e);
        }
      : undefined;

  return (
    <div
      {...props}
      onClick={handleClick}
      className={cn(
        "flex gap-3 px-7 py-3 bg-brand rounded-soft text-white cursor-pointer",
        className,
      )}
    >
      {children}
    </div>
  );
}
