import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  caption?: string;
  loading?: "lazy" | "eager";
};

/**
 * Lazy image with graceful fallback: on failure it degrades to a
 * procedural HUD placeholder (never a broken-image glyph).
 */
export default function SmartImage({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  caption,
  loading = "lazy",
}: Props) {
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");

  return (
    <figure className={`relative overflow-hidden bg-lab-850 ${wrapperClassName}`}>
      {state === "error" ? (
        <div className="grid-bg-fine flex h-full w-full min-h-[220px] items-center justify-center bg-gradient-to-br from-lab-900 to-lab-850">
          <div className="text-center font-mono text-[10px] uppercase tracking-widest2 text-ice-dim">
            <div className="mx-auto mb-3 h-10 w-10 rounded-full border border-accent/50 animate-pulse-slow" />
            Signal Unavailable
            <div className="mt-1 text-[8px] normal-case tracking-normal text-ice-dim/70">
              conceptual placeholder
            </div>
          </div>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          onLoad={() => setState("ok")}
          onError={() => setState("error")}
          className={`${className} ${
            state === "loading" ? "opacity-0" : "opacity-100"
          } transition-opacity duration-700`}
        />
      )}
      {state === "loading" && (
        <div className="absolute inset-0 animate-pulse bg-lab-850" />
      )}
      <div className="pointer-events-none absolute inset-0 border border-white/[0.06]" />
      {caption && (
        <figcaption className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-lab-950/90 to-transparent px-3 pb-2 pt-8 font-mono text-[9px] uppercase tracking-[0.15em] text-ice-dim">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
