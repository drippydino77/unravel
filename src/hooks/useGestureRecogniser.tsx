"use client";
import { useEffect, useRef } from "react";
import { FilesetResolver, GestureRecognizer } from "@mediapipe/tasks-vision";

export type GestureTransition = {
  from: string;
  to: string;
  maxDurationMs?: number;
  minScore?: number;
  onTrigger: () => void;
};

export function useGestureRecognizer(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  transitions: GestureTransition[]
) {
  const recognizerRef = useRef<GestureRecognizer | null>(null);
  const lastGestureRef = useRef<{ name: string; timestamp: number } | null>(null);
  const firedRef = useRef<Record<string, boolean>>({});

  useEffect(() => {
    let stopped = false;

    const init = async () => {
      if (!videoRef.current) return;

      try {
        // FIXED WASM PATH (no trailing space)
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
        );

        recognizerRef.current = await GestureRecognizer.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
            delegate: "GPU",
          },
          runningMode: "VIDEO",
        });

        console.log("GestureRecognizer initialized");

        const loop = () => {
          if (stopped) return;
          const video = videoRef.current;
          const recognizer = recognizerRef.current;

          if (!video || !recognizer || video.readyState < 2 || video.videoWidth === 0) {
            requestAnimationFrame(loop);
            return;
          }

          try {
            const result = recognizer.recognizeForVideo(video, performance.now());
            const g = result.gestures?.[0]?.[0];
            if(g){            console.log(g.categoryName, g.score)
            }

            if (g) {
              const now = performance.now();
              const last = lastGestureRef.current;

              transitions.forEach((t) => {
                const key = `${t.from}->${t.to}`;
                const duration = t.maxDurationMs ?? 300;
                const minScore = t.minScore ?? 0.7;

                if (
                  !firedRef.current[key] &&
                  g.categoryName === t.to &&
                  g.score >= minScore &&
                  last?.name === t.from &&
                  now - last.timestamp <= duration
                ) {
                  t.onTrigger();
                  firedRef.current[key] = true;
                } else if (g.categoryName !== t.to) {
                  firedRef.current[key] = false;
                }
              });

              lastGestureRef.current = { name: g.categoryName, timestamp: now };
            }
          } catch (err) {
            console.error("Gesture recognition error:", err);
          }

          requestAnimationFrame(loop);
        };

        requestAnimationFrame(loop);
      } catch (err) {
        console.error("Failed to initialize GestureRecognizer:", err);
      }
    };

    init();

    return () => {
      stopped = true;
      recognizerRef.current?.close();
      console.log("GestureRecognizer stopped");
    };
  }, [videoRef, transitions]);
}
