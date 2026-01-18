"use client";
import { useEffect, useRef, useState } from "react";
import Player, { LottieRefCurrentProps } from "lottie-react";
import GestureHint from "@/components/ui/GestureHint";
import Card from "@/components/ui/Card";
import { ColorTheme } from "@/types/color";
import animationData from "@/animation.json";
import ButtonWithIcon from "@/components/ui/ButtonWithIcon";
import Letter from "@/components/ui/Letter";

type Step =
  | { type: "gesture"; freezeFrame: number; }
  | { type: "animation"; frames: readonly [number, number] };

const STEP_FRAMES: readonly Step[] = [
  { type: "gesture", freezeFrame: 2, },
  { type: "animation", frames: [1, 50] },
  { type: "gesture", freezeFrame: 50, },
  { type: "animation", frames: [50, 125] },
  { type: "gesture", freezeFrame: 125, },
  { type: "animation", frames: [125, 207] },
  { type: "gesture", freezeFrame: 207, },
  { type: "animation", frames: [207, 294] },
  { type: "gesture", freezeFrame: 294, },
  { type: "animation", frames: [294, 383] },
] as const;

export default function AnimationPreview({ colorTheme = "#667eea" }: { colorTheme?: ColorTheme }) {
  const [stepIndex, setStepIndex] = useState(0);
  const step = STEP_FRAMES[stepIndex];
  const lottieRef = useRef<any>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  // Update handleAnimationComplete
  const handleAnimationComplete = () => {
    if (step.type === "animation") {
      setStepIndex((i) => {
        const next = i + 1;
        if (next >= STEP_FRAMES.length) {
          setIsComplete(true); // Mark as complete
          return i;
        }
        return next;
      });
    }
  };
  // Auto-advance gesture steps after duration
  useEffect(() => {
    if (step.type === "gesture") {
      const timer = setTimeout(() => {
        setStepIndex((i) => {
          const next = i + 1;
          return next >= STEP_FRAMES.length ? i : next; // Stop at last step
        });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step.type]);

  // Control Lottie animation per step
  useEffect(() => {
    const lottie = lottieRef.current;
    if (!lottie) return;

    if (step.type === "gesture") {
      // Freeze at specific frame
      lottie.goToAndStop(step.freezeFrame, true);
    } else if (step.type === "animation") {
      // Play animation segment
      lottie.playSegments([step.frames[0], step.frames[1]], true);
    }
  }, [stepIndex, step]);

 return (
  <main
    className="relative min-h-screen w-full"
    style={{ backgroundColor: colorTheme }}
  >
        <ButtonWithIcon className="absolute right-3 top-3 pointer-cursor">View my Card</ButtonWithIcon>

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
      <Card className="absolute bottom-30 left-1/2 -translate-x-1/2 overflow-hidden animate-fade-in">
  <GestureHint />
</Card>
    )}

    {isComplete && (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
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
        <Letter className="shadow-[0_20px_60px_0px_var(--brand)]" onClose={() => setShowLetter(false)}>
          <p className="text-sm text-gray-500 mb-6">January 18, 2026</p>
          <p className="mb-4">Dear Friend,</p>
          <p className="mb-4">Your fortune awaits within these pages...</p>
          <p className="mt-8">With warm regards,</p>
          <p className="font-script text-xl mt-2">Fortune Cookie</p>
        </Letter>
      </div>
    )}

    {/* Debug info */}
    <div className="absolute top-4 left-4 bg-black/50 text-white px-4 py-2 rounded-lg font-mono text-sm z-50">
      <div>Step: {stepIndex + 1}/{STEP_FRAMES.length}</div>
      <div>Type: {step.type}</div>
      {step.type === "gesture" ? (
        <div>Frame: {step.freezeFrame}</div>
      ) : (
        <div>Frames: {step.frames[0]} → {step.frames[1]}</div>
      )}
    </div>
  </main>
);
}