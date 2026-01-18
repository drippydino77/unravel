"use client";
import { useEffect, useRef } from "react";

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let stream: MediaStream;

    const start = async () => {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (!videoRef.current) {
        alert("Camera failed to open")
        return
      };
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
    };

    start();

    return () => {
      stream?.getTracks().forEach(t => t.stop());
    };
  }, []);

  return videoRef;
}
