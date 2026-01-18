"use client";

import CardPreviewScreen from "@/components/feature/share/CardPreview";
import { useRouter } from "next/navigation";
import VideoGesture from "@/components/feature/share/VideoGestureBubble";
import { useAnimationSteps } from "@/hooks/useAnimationSteps";

export default function SharePage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  const {
    stepIndex,
    step,
    isComplete,
    lottieRef,
    handleAnimationComplete,
    totalSteps,
    reset,
    nextStep,
  } = useAnimationSteps({auto: false});


  return (
    <>
      {/* Main card preview screen */}
      <CardPreviewScreen
        link="card.app/xyz123"
        onBack={handleBack}
        stepIndex={stepIndex}
        step={step}
        isComplete={isComplete}
        lottieRef={lottieRef}
        handleAnimationComplete={handleAnimationComplete}
        totalSteps={totalSteps}
        reset={reset}
      />

      {/* Gesture camera bubble */}
      <VideoGesture onNextStep={nextStep} step={step}/>
    </>
  );
}
