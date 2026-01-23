"use client";
import React, { useState, useEffect } from "react";
import Player from "lottie-react";
import BackButton from "@/components/ui/BackButton";
import ToggleButton from "@/components/ui/ToggleButton";
import LinkDisplayCard from "@/components/ui/LinkDisplayCard";
import GestureHint from "@/components/ui/GestureHint";
import Card from "@/components/ui/Card";
import ButtonWithIcon from "@/components/ui/ButtonWithIcon";
import { LuVideo } from "react-icons/lu";
import cn from "@/lib/helpers/cn";
import animationData from "@/animation.json";
import { useProject } from "@/hooks/useProject";
import { ColorTheme } from "@/types/color";
import { useParams } from "next/navigation";
import Letter from "@/components/ui/Letter";

type InteractionMode = "mouse" | "gesture";

type CardPreviewScreenProps = {
  link?: string;
  colorTheme?: ColorTheme;
  onBack?: () => void;
  className?: string;
  // Add animation props
  stepIndex: number;
  step: { type: "gesture"; freezeFrame: number } | { type: "animation"; frames: readonly [number, number] };
  isComplete: boolean;
  handleAnimationComplete: () => void;
  totalSteps: number;
  reset: () => void;
};

const colorBackgrounds: Record<ColorTheme, string> = {
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
  lottieRef,
}: CardPreviewScreenProps) {
  const [showLetter, setShowLetter] = useState(false);

  const params = useParams();
  const projectId = params.projectId as string;

  // Fetch project data using the `useProject` hook
  const { name, message, fontStyle, colorTheme } = useProject(projectId);

  const toggleOptions = [
    { id: "mouse", label: "Mouse/Touch" },
    { id: "gesture", label: "Hand Gesture", icon: <LuVideo size={16} /> },
  ];

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col relative",
        colorBackgrounds[colorTheme],
        className
      )}
    >      

      {/* Gesture Mode - Animation Flow */}
      {(
        <>
          {/* Always render Player in its own layer */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Player
              lottieRef={lottieRef}
              animationData={animationData}
              loop={false}
              autoplay={false}
              className="w-full h-full max-w-2xl"
              initialSegment={[0, 0]}
              onComplete={handleAnimationComplete}
            />
          </div>

          {step.type === "gesture" && (
            <Card className="absolute bottom-30 left-1/2 -translate-x-1/2 overflow-hidden animate-fade-in z-10">
              <GestureHint />
            </Card>
          )}

          {isComplete && (
            <div className="w-full h-full absolute flex items-center justify-center pointer-events-none">
              <ButtonWithIcon
                className="animate-in fade-in duration-300 pointer-events-auto"
                onClick={() => {
                  setShowLetter(true);
                  console.log("Reveal card clicked!");
                }}
              >
                Reveal Letter
              </ButtonWithIcon>
            </div>
          )}

          {showLetter && (
            <div className="absolute inset-x-0 top-0 bottom-20 flex items-center justify-center overflow-auto bg-[var(--brand)] z-50">
              <Letter
                className="shadow-[0_20px_60px_0px_var(--brand)]"
                onClose={() => setShowLetter(false)}
                style={{
                  fontFamily: fontStyle === "playful"
                    ? "'Comic Neue', 'Comic Sans MS', cursive"
                    : fontStyle === "elegant"
                      ? "'Crimson Text', Georgia, serif"
                      : "'Inter', -apple-system, sans-serif"
                }}
              >
                <p className="mb-4">Dear Friend,</p>
                <p className="mb-4">{message}</p>
                <p className="mt-8">With warm regards, {name}</p>
              </Letter>
            </div>
          )}
        </>
      )}

      {/* Main Content - Show when in mouse mode OR when card is revealed in gesture mode */}
      {(
        <main className="flex-1 flex flex-col items-center justify-center p-6 gap-12 absolute bottom-20 left-1/2 -translate-x-1/2">
          <LinkDisplayCard link={link} />
        </main>
      )}
    </div>
  );
}
