"use client";

import React, { useState } from "react";
import BackButton from "@/components/ui/BackButton";
import ToggleButton from "@/components/ui/ToggleButton";
import SwipeRevealCard from "@/components/ui/SwipeToRevealCard";
import LinkDisplayCard from "@/components/ui/LinkDisplayCard";
import { LuVideo } from "react-icons/lu";
import cn from "@/lib/helpers/cn";

type ColorTheme = "red" | "purple" | "yellow" | "blue";
type InteractionMode = "mouse" | "gesture";

type CardPreviewScreenProps = {
  link?: string;
  colorTheme?: ColorTheme;
  onBack?: () => void;
  className?: string;
};

const colorBackgrounds: Record<ColorTheme, string> = {
  red: "bg-red-100",
  purple: "bg-purple-100",
  yellow: "bg-yellow-100",
  blue: "bg-blue-100",
};

export default function CardPreviewScreen({
  link = "card.app/xyz123",
  colorTheme = "purple",
  onBack,
  className,
}: CardPreviewScreenProps) {
  const [mode, setMode] = useState<InteractionMode>("mouse");

  const toggleOptions = [
    { id: "mouse", label: "Mouse/Touch" },
    { id: "gesture", label: "Hand Gesture", icon: <LuVideo size={16} /> },
  ];

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col",
        colorBackgrounds[colorTheme],
        className
      )}
    >
      {/* Header with Back Button and Toggle */}
      <header className="flex items-center justify-between p-6">
        <BackButton label="Back to Edit" onClick={onBack} />

        <ToggleButton
          options={toggleOptions}
          selected={mode}
          onSelect={(id) => setMode(id as InteractionMode)}
        />
      </header>

      {/* Main Content - Centered */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 gap-12">
        {/* Swipe/Gesture Card */}
        <SwipeRevealCard mode={mode} />

        {/* Link Display Card */}
        <LinkDisplayCard link={link} />
      </main>
    </div>
  );
}