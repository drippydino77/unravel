"use client";

import { useRouter } from "next/navigation";
import CardPreview from "@/components/feature/view/CardPreview";
import VideoGesture from "@/components/feature/share/VideoGestureBubble";
import { useAnimationSteps } from "@/hooks/useAnimationSteps";

export default function SharePage() {
  const router = useRouter();

  const {
    stepIndex,
    step,
    isComplete,
    lottieRef,
    handleAnimationComplete,
    totalSteps,
    reset,
    nextStep,
  } = useAnimationSteps({ auto: false });

  return (
    <>
      {/* Main card preview */}
      <CardPreview
        onBack={() => router.back()}
        stepIndex={stepIndex}
        step={step}
        isComplete={isComplete}
        lottieRef={lottieRef}
        handleAnimationComplete={handleAnimationComplete}
        totalSteps={totalSteps}
        reset={reset}
      />

      {/* Gesture camera bubble */}
      <VideoGesture
        step={step}
        onNextStep={nextStep}
      />
    </>
  );
}
