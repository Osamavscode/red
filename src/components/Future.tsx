import { Suspense, lazy, useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Rocket, BrainCircuit, HandMetal, Trophy, Package, Building2 } from "lucide-react";
import { useGraphicsMode } from "../lib/hooks";
import { SectionShell } from "./ui";

const MarsScene = lazy(() =>
  import("./three/LabScenes").then((m) => ({ default: m.MarsScene }))
);

const AMBITIONS = [
  { icon: Rocket, title: "AUTONOMOUS ROBOTICS", body: "Machines that navigate, decide and act on their own — reliably and verifiably." },
  { icon: BrainCircuit, title: "ADVANCED AI SYSTEMS", body: "Reasoning engines fused with real hardware constraints, not just chat windows." },
  { icon: HandMetal, title: "HUMAN-ROBOT INTERACTION", body: "Interfaces where people and machines cooperate naturally and safely." },
  { icon: Trophy, title: "INTERNATIONAL COMPETITIONS", body: "Testing engineering under pressure on global stages." },
  { icon: Package, title: "REAL-WORLD PRODUCTS", body: "Technology that leaves the bench and earns its keep." },
  { icon: Building2, title: "AN ENGINEERING COMPANY", body: "An organization that builds what doesn't exist yet — starting from RED FRONTIER." },
];

export default function Future() {
  const mode = useGraphicsMode();
  const [allow3D, setAllow3D] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);

  useEffect(() => {
    if (mode !== "high") return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => setAllow3D(e.isIntersecting)),
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [mode]);

  return (
    <SectionShell className="!px-0 border-t border-white/[0.05]">
      <div ref={ref} className="relative min-h-[130svh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <motion.div style={{ y, scale }} className="absolute inset-0">
            {allow3D ? (
              <Suspense
                fallback={
                  <div className="h-full w-full bg-[radial-gradient(ellipse_at_50%_120%,#4d2f24,#150b07_60%)]" />
                }
              >
                <MarsScene />
              </Suspense>
            ) : (
              <div className="h-full w-full bg-[radial-gradient(ellipse_at_50%_120%,#4d2f24,#150b07_60%)]" />
            )}
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-lab-950 via-transparent to-lab-950" />

          <div className="container-lab relative z-10 flex h-full flex-col justify-center">
            <div className="kicker">10 / Future Vision</div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-4 max-w-4xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-ice sm:text-6xl lg:text-7xl"
            >
              THE FUTURE IS
              <br />
              <span className="text-accent">ENGINEERED.</span>
            </motion.h2>

            <div className="mt-10 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {AMBITIONS.map((a, i) => {
                const Icon = a.icon;
                return (
                  <motion.div
                    key={a.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.06 * i }}
                    className="rounded-lg border border-white/[0.08] bg-lab-950/70 p-4 backdrop-blur-sm transition-colors hover:border-accent/40"
                  >
                    <Icon size={18} className="text-accent" />
                    <div className="mt-2 font-mono text-[11px] font-semibold tracking-[0.15em] text-ice">
                      {a.title}
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-ice-dim">
                      {a.body}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
