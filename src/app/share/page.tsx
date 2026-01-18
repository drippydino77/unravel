"use client";

import CardPreviewScreen from "@/components/feature/share/CardPreview";
import { useRouter } from "next/navigation";
import VideoGesture from "@/components/feature/share/VideoGestureBubble"; // assuming we saved it here

export default function SharePage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  

  return (
    <>
      {/* Main card preview screen */}
      <CardPreviewScreen
        link="card.app/xyz123"
        colorTheme="purple"
        onBack={handleBack}
      />

      {/* Gesture camera bubble */}
      <VideoGesture />
    </>
  );
}
