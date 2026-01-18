"use client";
import React, { useState } from "react";
import Card from "@/components/ui/Card";
import ButtonWithIcon from "@/components/ui/ButtonWithIcon";
import { LuVideo } from "react-icons/lu";
import { useParams } from "next/navigation";
import GestureHint from "@/components/ui/GestureHint";
import LinkDisplayCard from "@/components/ui/LinkDisplayCard";

type InteractionMode = "mouse" | "gesture";

type CardPreviewScreenProps = {
  link?: string;
  onBack?: () => void;
  className?: string;
  stepIndex: number;
  step: { type: "gesture"; freezeFrame: number } | { type: "animation"; frames: readonly [number, number] };
  isComplete: boolean;
  handleAnimationComplete: () => void;
  totalSteps: number;
  reset: () => void;
};

const colorBackgrounds: Record<string, string> = {
  black: "bg-black"
};

export default function CardPreviewScreen({
  link = "card.app/xyz123",
  onBack,
  className,
  stepIndex,
  step,
  isComplete,
  handleAnimationComplete,
  totalSteps,
  reset,
}: CardPreviewScreenProps) {
  const [mode, setMode] = useState<InteractionMode>("gesture");
  const [showCard, setShowCard] = useState(false);

  const params = useParams();
  const projectId = params.projectId as string;

  const toggleOptions = [
    { id: "mouse", label: "Mouse/Touch" },
    { id: "gesture", label: "Hand Gesture", icon: <LuVideo size={16} /> },
  ];

  const handleModeChange = (id: string) => {
    setMode(id as InteractionMode);
    if (id === "gesture") {
      setShowCard(false);
      reset();
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col relative ${colorBackgrounds.black} ${className}`}
    >
      {/* Header with Back Button and Toggle */}
      <header className="flex items-center justify-between p-6 relative z-20">
        <ButtonWithIcon onClick={onBack} className="text-white">Back</ButtonWithIcon>
        <div className="flex space-x-4">
          {toggleOptions.map(option => (
            <button key={option.id} onClick={() => handleModeChange(option.id)}>
              {option.label}
            </button>
          ))}
        </div>
      </header>

      {/* Gesture Mode - Animation Flow */}
      {mode === "gesture" && !showCard && (
        <>
          {/* Gesture Hint */}
          {step.type === "gesture" && (
            <Card className="absolute bottom-30 left-1/2 -translate-x-1/2 overflow-hidden animate-fade-in z-10">
              <GestureHint />
            </Card>
          )}

          {/* Reveal Card Button */}
          {isComplete && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex justify-center">
              <ButtonWithIcon
                onClick={() => setShowCard(true)}
                className="animate-in fade-in duration-300"
              >
                Reveal Card
              </ButtonWithIcon>
            </div>
          )}

          {/* Debug info */}
          <div className="absolute top-20 left-4 bg-black/50 text-white px-4 py-2 rounded-lg font-mono text-sm z-50">
            <div>Step: {stepIndex + 1}/{totalSteps}</div>
            {step.type === "gesture" ? (
              <div>Frame: {step.freezeFrame}</div>
            ) : (
              <div>Frames: {step.frames[0]} → {step.frames[1]}</div>
            )}
          </div>
        </>
      )}

      {/* Main Content - Show when in mouse mode OR when card is revealed in gesture mode */}
      {(mode === "mouse" || showCard) && (
        <main className="flex-1 flex flex-col items-center justify-center p-6 gap-12 absolute bottom-20 left-1/2 -translate-x-1/2">
          <LinkDisplayCard link={link} />
        </main>
      )}
    </div>
  );
}
