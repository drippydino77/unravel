"use client";

import { useRouter, useParams } from "next/navigation";
import CardPreview from "@/components/feature/share/CardPreview";
import VideoGesture from "@/components/feature/share/VideoGestureBubble";
import { useAnimationSteps } from "@/hooks/useAnimationSteps";
import { useState } from "react";

export default function SharePage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.projectId as string;

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

  const [gestureModelLoaded, setGestureModelLoaded] = useState(false);

  console.log("GESTURE MODEL LOADED: ",gestureModelLoaded)

  return (
    <>
      {/* Main card preview */}
      {!gestureModelLoaded 
        ? "Loading hand detection model..." 
        : <CardPreview
            onBack={() => router.back()}
            stepIndex={stepIndex}
            step={step}
            isComplete={isComplete}
            lottieRef={lottieRef}
            handleAnimationComplete={handleAnimationComplete}
            totalSteps={totalSteps}
            reset={reset}
            onNextStep={nextStep}
            link={`localhost:3000/view/${projectId}`}
            gestureModelLoaded={gestureModelLoaded}
          />
      }

      {/* Gesture camera bubble */}
      <VideoGesture
        step={step}
        onNextStep={nextStep}
        setGestureModelLoaded={setGestureModelLoaded}
      />
    </>
  );
}
