"use client";
import React, { useEffect, useState } from "react";
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
  lottieRef: React.RefObject<any>;
  handleAnimationComplete: () => void;
  totalSteps: number;
  reset: () => void;
  onNextStep: ()=>void;
  gestureModelLoaded: boolean
};

const colorBackgrounds: Record<ColorTheme, string> = {
  black: "bg-black"
};

export default function CardPreviewScreen({
  link = "localhost:3000",
  onBack,
  className,
  stepIndex,
  step,
  isComplete,
  lottieRef,
  handleAnimationComplete,
  totalSteps,
  reset,
  gestureModelLoaded,
}: CardPreviewScreenProps) {
  const [mode, setMode] = useState<InteractionMode>("gesture");

  const params = useParams();
  const projectId = params.projectId as string;

  const { 
    name, 
    message, 
    fontStyle, 
    colorTheme,
  } = useProject(projectId);
  const [showLetter, setShowLetter] = useState(false)

  const toggleOptions = [
    { id: "mouse", label: "Mouse/Touch" },
    { id: "gesture", label: "Hand Gesture", icon: <LuVideo size={16} /> },
  ];


  useEffect(()=>{
    console.log("STEP:",step)
  },[step])

  useEffect(()=>{
    lottieRef.current.goToAndStop(2, true)
  },[gestureModelLoaded, lottieRef])

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col relative",
        colorBackgrounds[colorTheme],
        className
      )}
    >
      {/* Header with Back Button and Toggle */}
      <header className="flex items-center justify-between p-6 relative z-20">
        <BackButton label="Back to Edit" onClick={onBack} className="text-white"/>
      </header>

      {/* Gesture Mode - Animation Flow */}
      {mode === "gesture" && (
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

          {/* Debug info */}
          <div className="absolute top-20 left-4 bg-black/50 text-white px-4 py-2 rounded-lg font-mono text-sm z-50">
            <div>Step: {stepIndex + 1}/{totalSteps}</div>
            <div>Type: {step.type}</div>
            {step.type === "gesture" ? (
              <div>Frame: {step.freezeFrame}</div>
            ) : (
              <div>Frames: {step.frames[0]} → {step.frames[1]}</div>
            )}
          </div>
          {showLetter && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    
    {/* Blur + dim background */}
    <div className="absolute inset-0 bg-black/30 backdrop-blur-md" />

    {/* Letter container */}
    <div className="relative animate-letter-in">
      <Letter
        className="shadow-[0_20px_60px_0px_var(--brand)]"
        onClose={() => setShowLetter(false)}
        style={{
          fontFamily:
            fontStyle === "playful"
              ? "'Comic Neue', 'Comic Sans MS', cursive"
              : fontStyle === "elegant"
              ? "'Crimson Text', Georgia, serif"
              : "'Inter', -apple-system, sans-serif",
        }}
      >
        <p className="mb-4">Dear Friend,</p>
        <p className="mb-4">{message}</p>
        <p className="mt-8">With warm regards, {name}</p>
      </Letter>
    </div>

  </div>
)}

        </>
      )}

      {/* Main Content - Show when in mouse mode OR when card is revealed in gesture mode */}
      {(
        <main className="flex-1 flex flex-col items-center justify-center p-6 gap-12 absolute top-20 left-1/2 -translate-x-1/2">
          <LinkDisplayCard link={link} />
        </main>
      )}
    </div>
  );
}