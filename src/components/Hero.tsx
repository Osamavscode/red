import { Suspense, lazy, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useGraphicsMode } from "../lib/hooks";
import { StatusLabel } from "./ui";
import { IMG } from "../lib/images";

const HeroScene = lazy(() => import("./three/HeroScene"));

export default function Hero() {
  const mode = useGraphicsMode();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);
  const show3D = mode === "high" && mounted;

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden">
      {/* Backdrop */}
      <div className="grid-bg absolute inset-0 opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(255,77,36,0.09),transparent_55%)]" />

      {/* 3D layer */}
      <div className="absolute inset-0">
        {show3D ? (
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        ) : (
          <div className="relative h-full w-full">
            <img
              src={IMG.asimo.src}
              alt="Humanoid robot — reference render"
              className="absolute right-0 top-0 h-full w-full object-cover object-right opacity-50 md:w-3/5"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-lab-950 via-lab-950/70 to-transparent" />
          </div>
        )}
      </div>

      {/* scanlines overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.15]">
        <div className="h-8 w-full bg-gradient-to-b from-transparent via-ice-cyan/60 to-transparent animate-scanline" />
      </div>
      {/* HUD corners */}
      <div className="hud-line left-5 top-24 hidden border-l border-t border-white/15 p-3 font-mono text-[9px] tracking-widest2 text-ice-dim md:block">
        <div className="text-accent">LAB-01 / HERO BAY</div>
        <div className="mt-1">CAM.RIG — TRACKING POINTER</div>
      </div>
      <div className="hud-line bottom-24 right-5 hidden border-r border-b border-white/15 p-3 text-right font-mono text-[9px] tracking-widest2 text-ice-dim md:block">
        <div>RENDER: WEBGL2</div>
        <div className="mt-1">
          MODE: <span className="text-ice-cyan">{show3D ? "INTERACTIVE" : "STATIC"}</span>
        </div>
      </div>

      {/* Content */}
      <div className="container-lab relative z-10 pt-28 pb-16 sm:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-3xl"
        >
          <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest2 text-ice-dim sm:text-xs">
            <span className="h-2 w-2 rounded-full bg-accent animate-blink-dot" />
            RED FRONTIER / ENGINEERING DIVISION
          </div>

          <h1 className="font-display text-5xl font-bold leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl">
            <span className="text-gradient-warm">OSAMA</span>{" "}
            <span className="font-outline">MOHAMED</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28 }}
            className="mt-5 font-display text-lg font-medium text-accent-soft sm:text-2xl"
          >
            BUILDING THE NEXT GENERATION OF INTELLIGENT MACHINES.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42 }}
            className="mt-4 max-w-xl text-sm leading-relaxed text-ice-dim sm:text-base"
          >
            From lines of code to intelligent machines. Exploring robotics,
            artificial intelligence, embedded systems, and the engineering
            behind tomorrow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link to="/#archive" className="btn-primary">
              Explore My Projects
            </Link>
            <Link to="/lab" className="btn-ghost">
              Enter The Lab
              <ArrowDown size={14} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 max-w-md"
          >
            <StatusLabel
              items={[
                ["System", "ONLINE"],
                ["Engineering Mode", "ACTIVE"],
                ["Domain", "ROBOTICS + AI"],
                ["Location", "EGYPT"],
              ]}
            />
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.15em] text-ice-dim/60">
              Decorative interface labels — reference identity, no live telemetry
            </p>
          </motion.div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce text-ice-dim">
        <ArrowDown size={16} />
      </div>
    </section>
  );
}
