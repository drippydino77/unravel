"use client";

import React from "react";
import Card from "@/components/ui/Card";
import SubtitleText from "@/components/ui/SubtitleText";
import HandGestureAnimation from "@/components/ui/HandGestureAnimation";
import { LuWand } from "react-icons/lu";
import cn from "@/lib/helpers/cn";

type SwipeRevealCardProps = {
  mode: "mouse" | "gesture";
  onTap?: () => void;
  className?: string;
};

export default function SwipeRevealCard({
  mode,
  onTap,
  className,
}: SwipeRevealCardProps) {
  const handleTap = () => {
    if (mode === "mouse") {
      console.log("Tapped to reveal!");
      onTap?.();
    }
  };

  return (
    <Card
      className={cn(
        "max-w-md mx-auto p-12 flex flex-col items-center justify-center gap-6",
        mode === "mouse" && "cursor-pointer hover:shadow-lg transition-shadow",
        className
      )}
      onClick={handleTap}
    >
      {mode === "mouse" ? (
        <>
          {/* Placeholder for camera icon - you'll add actual content later */}
          <div className="w-32 h-32 flex items-center justify-center">
            {/* Empty space for camera icon */}
          </div>

          {/* Swipe to Reveal Button */}
          <div className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-sm border border-gray-200">
            <LuWand size={20} className="text-brand" />
            <SubtitleText variant="medium" className="text-brand font-medium">
              Swipe to Reveal
            </SubtitleText>
          </div>
        </>
      ) : (
        <>
          {/* Hand Gesture Animation */}
        </>
      )}
    </Card>
  );
}