import cn from "@/lib/helpers/cn";
import React from "react";

type LetterProps = React.ComponentProps<"div"> & {
    variant?: "classic" | "minimal" | "vintage";
    onClose?: () => void;
  };

export default function Letter({
    className,
    children,
    variant = "classic",
    onClose,
    ...props
}: LetterProps) {
  return (
    <div 
      className={cn("", className)}
      {...props}
    >
      {/* Paper */}
      <div className="bg-[#f9f7f3] shadow-2xl relative p-3">
      {(
        <button
          onClick={onClose}
          className="z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200/80 hover:bg-gray-300/80 transition-colors text-gray-600 hover:text-gray-800"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      )}
        {/* Fold line at top */}
        {variant !== "minimal" && (
          <div className="h-1 from-gray-300/30 to-transparent" />
        )}
        
        {/* Letter content */}
        <div className="px-12 py-16 md:px-16 md:py-20">
          {/* Decorative header line */}
          {variant === "classic" && (
            <div className="border-t-2 border-b border-gray-300 mb-8 pt-2 pb-1">
              <div className="h-px bg-gray-200" />
            </div>
          )}
          
          {/* Letter body */}
          <div className="font-serif text-gray-800 leading-relaxed">
            {children}
          </div>
          
          {/* Decorative footer line */}
          {variant === "classic" && (
            <div className="border-t border-b-2 border-gray-300 mt-8 pt-1 pb-2">
              <div className="h-px bg-gray-200" />
            </div>
          )}
        </div>
        
        {/* Paper texture overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiLz48L3N2Zz4=')]" />
      </div>
      
      {/* Shadow/depth */}
      <div className="absolute -bottom-2 left-2 right-2 h-2 bg-black/10 blur-sm -z-10" />
    </div>
  );
}