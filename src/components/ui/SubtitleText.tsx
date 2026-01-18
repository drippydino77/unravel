import cn from "@/lib/helpers/cn";

type SubtitleTextProps = React.ComponentProps<"p"> & {
  variant?: "large" | "medium" | "small";
};

export default function SubtitleText({
  className,
  children,
  variant = "medium",
  ...props
}: SubtitleTextProps) {
  const baseClass = "";
  const variantClass = {
    large: "text-normal-size",
    medium: "text-subtitle-size",
    small: "text-xs",
  }[variant];
  return (
    <p {...props} className={cn(baseClass, variantClass, className)}>
      {children}
    </p>
  );
}
