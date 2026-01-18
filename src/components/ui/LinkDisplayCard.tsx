"use client";

import React, { useState } from "react";
import ButtonWithIcon from "@/components/ui/ButtonWithIcon";
import { LuCopy, LuCheck } from "react-icons/lu";
import cn from "@/lib/helpers/cn";

type LinkDisplayCardProps = {
  link: string;
  className?: string;
};

export default function LinkDisplayCard({
  link,
  className,
}: LinkDisplayCardProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setIsCopied(true);

      // Reset after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      onClick={handleCopy}
      className={cn(
        "max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between gap-4 cursor-pointer hover:shadow-xl transition-all",
        className
      )}
    >
      {/* Link Text */}
      <span className="text-gray-700 font-medium text-lg flex-1 text-center">
        {link}
      </span>

      {/* Copy Button */}
      <ButtonWithIcon
        onClick={(e) => {
          e.stopPropagation();
          handleCopy();
        }}
        className={cn(
          "shrink-0 transition-all",
          isCopied && "bg-green-500 hover:bg-green-600"
        )}
      >
        {isCopied ? (
          <>
            <LuCheck size={20} />
            <span>Copied</span>
          </>
        ) : (
          <>
            <LuCopy size={20} />
            <span>Copy Link</span>
          </>
        )}
      </ButtonWithIcon>
    </div>
  );
}