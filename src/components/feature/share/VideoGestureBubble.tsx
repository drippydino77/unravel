"use client";
import CameraPreview from "@/components/ui/CameraPreview";
import { useCamera } from "@/hooks/useCamera";
import { useGestureRecognizer } from "@/hooks/useGestureRecogniser";

type Step =
  | { type: "gesture"; freezeFrame: number }
  | { type: "animation"; frames: readonly [number, number] };

type VideoGestureProps = {
  onNextStep?: () => void;
  step: Step;
};

export default function VideoGesture({ onNextStep, step }: VideoGestureProps) {
  const videoRef = useCamera();
  
  // Use gesture transitions and call nextStep when detected
  // Only trigger if current step type is "gesture"
  useGestureRecognizer(videoRef, [
    {
      from: "Open_Palm",
      to: "Closed_Fist",
      maxDurationMs: 3000,
      minScore: 0.3,
      onTrigger: () => {
        console.log("✊ FAST GRAB DETECTED!", step);
        if (step.type === "gesture") {
          onNextStep?.(); // Only call nextStep during gesture steps
        }
      },
    },
  ]);
  
  return <CameraPreview ref={videoRef} />;
}
