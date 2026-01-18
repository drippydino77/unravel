import cn from "@/lib/helpers/cn";
import React from "react";

type TitleTextProps = React.ComponentProps<"p"> & {
  variant?: "landing" | "section" | "card" | "title";
}; // use <h1> if preferred

export default function TitleText({
  variant = "section",
  className,
  children,
  ...props
}: TitleTextProps) {
  const baseClass = "font-bold";
  const variantClass: string = {
    landing: "text-title-size",
    section: "text-2xl",
    card: "text-2xl",
    title: "text-4xl",
  }[variant];

  return (
    <p {...props} className={cn(baseClass, className, variantClass)}>
      {children}
    </p>
  );
}
