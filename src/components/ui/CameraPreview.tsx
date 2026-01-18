"use client";
import { forwardRef } from "react";

const CameraPreview = forwardRef<HTMLVideoElement>((_, ref) => (
  <video
    ref={ref}
    muted
    playsInline
    autoPlay
    className="
      fixed
      bottom-4
      right-4
      w-40
      h-40
      rounded-full
      object-cover
      bg-black
      shadow-lg
      ring-2
      ring-white/20
      z-50
    "
  />
));

CameraPreview.displayName = "CameraPreview";

export default CameraPreview;
