import { useEffect, useRef, useState } from "react";

export default function PreviewVideo({
  src,
  paused,
  onEnded,
}: {
  src: string;
  paused: boolean;
  onEnded: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasRenderedFrame, setHasRenderedFrame] = useState(false);

  // Load + render first frame
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.src = src;
    video.currentTime = 0;

    const onLoaded = () => {
      // Force a single frame render
      video.play().then(() => {
        video.pause();
        setHasRenderedFrame(true);
      });
    };

    video.addEventListener("loadeddata", onLoaded);
    return () => video.removeEventListener("loadeddata", onLoaded);
  }, [src]);

  // Pause / resume logic
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasRenderedFrame) return;

    paused ? video.pause() : video.play();
  }, [paused, hasRenderedFrame]);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-contain"
      muted
      playsInline
      onEnded={onEnded}
    />
  );
}
