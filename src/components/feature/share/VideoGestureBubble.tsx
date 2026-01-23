"use client";
import CameraPreview from "@/components/ui/CameraPreview";
import { useCamera } from "@/hooks/useCamera";
import { useGestureRecognizer } from "@/hooks/useGestureRecogniser";
import { useEffect, useRef } from "react";

type Step =
  | { type: "gesture"; freezeFrame: number }
  | { type: "animation"; frames: readonly [number, number] };

type VideoGestureProps = {
  onNextStep?: () => void;
  step: Step;
  setGestureModelLoaded: (gestureModelLoaded: boolean) => void
};

export default function VideoGesture({ onNextStep, step, setGestureModelLoaded }: VideoGestureProps) {
  const videoRef = useCamera();
  const stepRef = useRef(step)
  useEffect(() => { stepRef.current = step }, [step])

  // Use gesture transitions and call nextStep when detected
  // Only trigger if current step type is "gesture"
  useGestureRecognizer(videoRef, [
    {
      from: "Open_Palm",
      to: "Closed_Fist",
      maxDurationMs: 1000,
      minScore: 0.3,
      onTrigger: () => {
        const latestStep = stepRef.current
        console.log("✊ FAST GRAB DETECTED!", latestStep);
        if (latestStep.type === "gesture") {
          onNextStep?.(); // Only call nextStep during gesture steps
          console.log("NEXT GESTURE TRIGGERED", latestStep)
        }
      },
    },
  ], () => {
    setGestureModelLoaded(true)
  });

  return <CameraPreview ref={videoRef} />;
}
