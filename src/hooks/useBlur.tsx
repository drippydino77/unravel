import { useEffect, useState } from "react";

export function useBlurTransition(initial = 20, final = 5, duration = 1000) {
  const [blur, setBlur] = useState(initial);

  useEffect(() => {
    const timeout = setTimeout(() => setBlur(final), 50); // small delay
    return () => clearTimeout(timeout);
  }, [final, duration]);

  return blur;
}
