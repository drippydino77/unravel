"use client";
import { useEffect, useRef, useState } from "react";
import Player, { LottieRefCurrentProps } from "lottie-react";
import GestureHint from "@/components/ui/GestureHint";
import Card from "@/components/ui/Card";
import { ColorTheme } from "@/types/color";
import animationData from "@/animation.json";
import ButtonWithIcon from "@/components/ui/ButtonWithIcon";
import Letter from "@/components/ui/Letter";
import { useAnimationSteps } from "@/hooks/useAnimationSteps";

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

type AnimationPreviewProps = {
  templateId: string;
  fontStyle: string;
  colorTheme: ColorTheme;
  name: string;
  message: string;
};

export default function AnimationPreview({
  colorTheme = "black",
  templateId,
  fontStyle,
  name,
  message
}: AnimationPreviewProps) {
  const [showLetter, setShowLetter] = useState(false);
  const { stepIndex,
    step,
    isComplete,
    lottieRef,
    handleAnimationComplete,
    totalSteps,
    reset } = useAnimationSteps()

  return (
    <main
      className="relative min-h-screen w-full"
      style={{ backgroundColor: colorTheme }}
    >
      <ButtonWithIcon className="absolute right-3 top-3 pointer-cursor z-20" onClick={() => setShowLetter(true)}>Preview my Letter</ButtonWithIcon>

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
          >          <p className="mb-4">Dear Friend,</p>
            <p className="mb-4">{message}</p>
            <p className="mt-8">With warm regards, {name}</p>
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