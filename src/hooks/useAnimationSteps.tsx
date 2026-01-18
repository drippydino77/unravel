import { useState, useEffect, useRef } from "react";

type Step =
  | { type: "gesture"; freezeFrame: number }
  | { type: "animation"; frames: readonly [number, number] };

const STEP_FRAMES: readonly Step[] = [
  { type: "gesture", freezeFrame: 2 },
  { type: "animation", frames: [1, 50] },
  { type: "gesture", freezeFrame: 50 },
  { type: "animation", frames: [50, 125] },
  { type: "gesture", freezeFrame: 125 },
  { type: "animation", frames: [125, 207] },
  { type: "gesture", freezeFrame: 207 },
  { type: "animation", frames: [207, 294] },
  { type: "gesture", freezeFrame: 294 },
  { type: "animation", frames: [294, 383] },
] as const;

type UseAnimationStepsOptions = {
  auto?: boolean;
  gestureDuration?: number;
};

export function useAnimationSteps(options: UseAnimationStepsOptions = {}) {
  const { auto = true, gestureDuration = 2000 } = options;
  
  const [stepIndex, setStepIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const lottieRef = useRef<any>(null);
  
  const step = STEP_FRAMES[stepIndex];

  // Handle animation complete
  const handleAnimationComplete = () => {
    if (step.type === "animation") {
      setStepIndex((i) => {
        const next = i + 1;
        if (next >= STEP_FRAMES.length) {
          setIsComplete(true);
          return i;
        }
        return next;
      });
    }
  };

  // Auto-advance gesture steps (only if auto is true)
  useEffect(() => {
    if (auto && step.type === "gesture") {
      const timer = setTimeout(() => {
        setStepIndex((i) => {
          const next = i + 1;
          return next >= STEP_FRAMES.length ? i : next;
        });
      }, gestureDuration);
      return () => clearTimeout(timer);
    }
  }, [step.type, gestureDuration, auto]);

  // Control Lottie animation
  useEffect(() => {
    const lottie = lottieRef.current;
    if (!lottie) return;

    if (step.type === "gesture") {
      lottie.goToAndStop(step.freezeFrame, true);
    } else if (step.type === "animation") {
      lottie.playSegments([step.frames[0], step.frames[1]], true);
    }
  }, [stepIndex, step]);

  // Manual control functions
  const nextStep = () => {
    setStepIndex((i) => {
      const next = i + 1;
      if (next >= STEP_FRAMES.length) {
        setIsComplete(true);
        return i;
      }
      return next;
    });
  };

  const previousStep = () => {
    setStepIndex((i) => {
      const prev = i - 1;
      if (prev < 0) return 0;
      setIsComplete(false); // Reset complete status if going backwards
      return prev;
    });
  };

  const goToStep = (index: number) => {
    if (index >= 0 && index < STEP_FRAMES.length) {
      setStepIndex(index);
      setIsComplete(index >= STEP_FRAMES.length - 1);
    }
  };

  const reset = () => {
    setStepIndex(0);
    setIsComplete(false);
  };

  return {
    stepIndex,
    step,
    isComplete,
    lottieRef,
    handleAnimationComplete,
    totalSteps: STEP_FRAMES.length,
    reset,
    // Manual control functions
    nextStep,
    previousStep,
    goToStep,
  };
}
