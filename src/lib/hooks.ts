import { useEffect, useState } from "react";
import { getWebGLSupport, prefersReducedMotion } from "./env";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export function useGraphicsMode(): "high" | "low" {
  const reduced = useReducedMotion();
  const [webgl, setWebgl] = useState(true);
  useEffect(() => {
    setWebgl(getWebGLSupport());
  }, []);
  const lowPower = useMediaQuery("(max-width: 768px)");
  return !webgl || reduced ? "low" : lowPower ? "low" : "high";
}
