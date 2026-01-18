"use client";
import CameraPreview from "@/components/ui/CameraPreview";
import { useCamera } from "@/hooks/useCamera";
import { useGestureRecognizer } from "@/hooks/useGestureRecogniser";

export default function VideoGesture() {
  const videoRef = useCamera();

  // Use gesture transitions instead of a single onGesture
  useGestureRecognizer(videoRef, [
    {
      from: "Open_Palm",
      to: "Closed_Fist",
      maxDurationMs: 1000, // more human-speed friendly
      minScore: 0.7,
      onTrigger: () => console.log("✊ FAST GRAB DETECTED!"),
    },
  ]);
  

  return <CameraPreview ref={videoRef} />;
}
