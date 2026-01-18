"use client";

import React, { useEffect, useState } from "react";
import cn from "@/lib/helpers/cn";

type HandGestureAnimationProps = {
  className?: string;
};

export default function HandGestureAnimation({
  className,
}: HandGestureAnimationProps) {
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsClosed((prev) => !prev);
    }, 1500); // Toggle every 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Hand Icon - Simple SVG outline */}
      <div className="relative w-32 h-32">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full transition-all duration-500"
          style={{
            transform: isClosed ? "scale(0.85)" : "scale(1)",
          }}
        >
          {/* Open Hand */}
          {!isClosed && (
            <g className="transition-opacity duration-500">
              {/* Palm */}
              <path
                d="M 30 50 Q 30 35 40 30 L 40 70 Q 30 65 30 50 Z"
                fill="none"
                stroke="#B4A5F6"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Thumb */}
              <path
                d="M 35 50 Q 25 48 20 40"
                fill="none"
                stroke="#B4A5F6"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Index finger */}
              <path
                d="M 45 30 L 45 10"
                fill="none"
                stroke="#B4A5F6"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Middle finger */}
              <path
                d="M 55 30 L 55 5"
                fill="none"
                stroke="#B4A5F6"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Ring finger */}
              <path
                d="M 65 30 L 65 10"
                fill="none"
                stroke="#B4A5F6"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Pinky */}
              <path
                d="M 75 35 L 75 20"
                fill="none"
                stroke="#B4A5F6"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Closed Fist */}
          {isClosed && (
            <g className="transition-opacity duration-500">
              {/* Main fist body */}
              <rect
                x="35"
                y="40"
                width="35"
                height="30"
                rx="8"
                fill="none"
                stroke="#B4A5F6"
                strokeWidth="3"
              />
              {/* Thumb */}
              <path
                d="M 32 50 Q 25 50 20 45 Q 20 40 25 38 Q 30 38 32 42"
                fill="none"
                stroke="#B4A5F6"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Finger knuckles indication */}
              <line
                x1="45"
                y1="40"
                x2="45"
                y2="35"
                stroke="#B4A5F6"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="55"
                y1="40"
                x2="55"
                y2="32"
                stroke="#B4A5F6"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="65"
                y1="40"
                x2="65"
                y2="35"
                stroke="#B4A5F6"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Text */}
      <p className="text-center text-sm text-gray-600 font-medium">
        Form a fist to crack fortune cookie
      </p>
    </div>
  );
}