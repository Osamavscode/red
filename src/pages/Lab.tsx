import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, MousePointer2, Info } from "lucide-react";
import { useGraphicsMode } from "../lib/hooks";
import {
  ROBOT_PARTS,
  DEFAULT_ANGLES,
  ArmAngles,
} from "../components/three/RobotArm";
import Blueprints from "../components/Blueprints";
import ArchitectureViewer from "../components/ArchitectureViewer";
import WorkbenchInfo from "../components/WorkbenchInfo";
import { SectionShell, SectionHeading } from "../components/ui";

const LabArmScene = lazy(() => import("../components/three/LabArmScene"));
const WorkbenchScene = lazy(() =>
  import("../components/three/LabScenes").then((m) => ({
    default: m.WorkbenchScene,
  }))
);

function CanvasFallback({ label }: { label: string }) {
  return (
    <div className="grid-bg-fine flex h-full min-h-[380px] items-center justify-center rounded-lg border border-white/[0.06] bg-lab-900">
      <div className="text-center font-mono text-[10px] uppercase tracking-widest2 text-ice-dim">
        <div className="mx-auto mb-3 h-12 w-12 rounded-full border border-accent/40 animate-pulse-slow" />
        {label} — static fallback
        <div className="mt-1 text-[9px] normal-case tracking-normal text-ice-dim/60">
          interactive 3D requires WebGL
        </div>
      </div>
    </div>
  );
}

function ArmViewer() {
  const mode = useGraphicsMode();
  const [angles, setAngles] = useState<ArmAngles>(DEFAULT_ANGLES);
  const [idle, setIdle] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => setMounted(e.isIntersecting)),
      { rootMargin: "150px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const JOINTS: { key: keyof ArmAngles; label: string; range: [number, number] }[] = [
    { key: "turret", label: "J1 · TURRET YAW", range: [-1.6, 1.6] },
    { key: "shoulder", label: "J2 · SHOULDER PITCH", range: [-0.2, 1.1] },
    { key: "elbow", label: "J3 · ELBOW PITCH", range: [0, 2.1] },
    { key: "wrist", label: "J4 · WRIST PITCH", range: [-1.4, 1.1] },
    { key: "gripper", label: "J5 · GRIPPER OPEN", range: [0, 1] },
  ];

  const part = ROBOT_PARTS.find((p) => p.id === selected);

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div ref={mountRef} className="panel clip-corner relative overflow-hidden lg:col-span-3">
        <div className="grid-bg-fine pointer-events-none absolute inset-0 z-10 opacity-40" />
        <div className="hud-line left-4 top-4 z-10 border border-white/10 bg-lab-950/70 px-3 py-1.5 font-mono text-[9px] tracking-widest2 text-ice-dim backdrop-blur">
          STATION A — ARM.UNIT-01 · DRAG TO ORBIT · WHEEL TO ZOOM
        </div>
        <div className="h-[420px] sm:h-[520px]">
          {mode === "high" && mounted ? (
            <Suspense fallback={<CanvasFallback label="ARM BAY" />}>
              <LabArmScene
                angles={angles}
                idle={idle}
                selected={selected}
                onSelectPart={setSelected}
              />
            </Suspense>
          ) : (
            <CanvasFallback label="ARM BAY" />
          )}
        </div>
      </div>

      <div className="space-y-4 lg:col-span-2">
        <div className="panel p-5">
          <div className="flex items-center justify-between">
            <div className="kicker">Joint Control</div>
            <div className="flex gap-2">
              <button
                onClick={() => setIdle((v) => !v)}
                className={`rounded px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest2 transition-colors ${
                  idle ? "bg-accent/20 text-accent" : "border border-white/10 text-ice-dim"
                }`}
              >
                {idle ? "IDLE MODE" : "MANUAL MODE"}
              </button>
              <button
                onClick={() => {
                  setAngles(DEFAULT_ANGLES);
                  setIdle(true);
                }}
                className="flex items-center gap-1 rounded border border-white/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest2 text-ice-dim transition-colors hover:text-ice"
              >
                <RotateCcw size={11} /> Reset
              </button>
            </div>
          </div>
          <div className={`mt-4 space-y-4 ${idle ? "opacity-40" : ""}`}>
            {JOINTS.map((j) => (
              <div key={j.key}>
                <div className="flex justify-between font-mono text-[9px] uppercase tracking-widest2">
                  <span className="text-ice-dim">{j.label}</span>
                  <span className="text-accent">
                    {Math.round((angles[j.key] * 180) / Math.PI)}°
                  </span>
                </div>
                <input
                  type="range"
                  min={j.range[0]}
                  max={j.range[1]}
                  step={0.01}
                  value={angles[j.key]}
                  disabled={idle}
                  onChange={(e) => {
                    setIdle(false);
                    setAngles((a) => ({ ...a, [j.key]: parseFloat(e.target.value) }));
                  }}
                  className="mt-1.5 h-1 w-full accent-[#FF4D24] disabled:cursor-not-allowed"
                  aria-label={j.label}
                />
              </div>
            ))}
          </div>
          <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-ice-dim">
            <MousePointer2 size={12} className="mt-0.5 shrink-0 text-accent" />
            Toggle to MANUAL to command the joints directly — the same axes that animate the idle choreography.
          </p>
        </div>

        <div className="panel min-h-[180px] p-5">
          <div className="kicker mb-3 flex items-center gap-2">
            <Info size={12} /> Component Inspection
          </div>
          {part ? (
            <motion.div
              key={part.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="font-mono text-xs font-semibold tracking-[0.15em] text-accent-soft">
                {part.name}
              </div>
              <div className="mt-1 font-mono text-[9px] uppercase tracking-widest2 text-ice-dim">
                {part.spec}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-ice-dim">{part.desc}</p>
            </motion.div>
          ) : (
            <p className="text-xs leading-relaxed text-ice-dim">
              Click any component on the model — base, turret, shoulder, elbow, wrist
              or gripper — to read its engineering role.
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {ROBOT_PARTS.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelected(p.id)}
                className={`rounded border px-2 py-1 font-mono text-[9px] uppercase tracking-widest2 transition-colors ${
                  selected === p.id
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-white/10 text-ice-dim hover:text-ice"
                }`}
              >
                {p.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Workbench() {
  const mode = useGraphicsMode();
  const [selected, setSelected] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => setMounted(e.isIntersecting)),
      { rootMargin: "150px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="order-2 space-y-4 lg:order-1 lg:col-span-2">
        <WorkbenchInfo selected={selected} />
      </div>
      <div ref={mountRef} className="panel clip-corner relative overflow-hidden order-1 lg:order-2 lg:col-span-3">
        <div className="hud-line left-4 top-4 z-10 border border-white/10 bg-lab-950/70 px-3 py-1.5 font-mono text-[9px] tracking-widest2 text-ice-dim backdrop-blur">
          STATION B — WORKBENCH · DRAG TO ORBIT · CLICK COMPONENTS
        </div>
        <div className="h-[420px] sm:h-[520px]">
          {mode === "high" && mounted ? (
            <Suspense fallback={<CanvasFallback label="WORKBENCH" />}>
              <WorkbenchScene selected={selected} onSelect={setSelected} />
            </Suspense>
          ) : (
            <CanvasFallback label="WORKBENCH" />
          )}
        </div>
      </div>
    </div>
  );
}

export default function Lab() {
  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,77,36,0.08),transparent_60%)]" />
        <div className="container-lab relative">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="kicker">RED FRONTIER / INTERACTIVE FACILITY</div>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ice sm:text-6xl">
              THE ROBOTICS <span className="text-accent">LAB</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ice-dim sm:text-base">
              Four interactive stations: drive a robot arm joint by joint, probe the
              electronics workbench, unfold engineering blueprints, and peel through
              the robot's architecture layer by layer.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-[9px] uppercase tracking-widest2 text-ice-dim">
              <span className="rounded border border-emerald-400/40 bg-emerald-400/10 px-2 py-1 text-emerald-400">
                FACILITY: ONLINE
              </span>
              <span className="rounded border border-white/10 px-2 py-1">
                STATIONS: 02 LIVE · 02 DRAWING-TYPE
              </span>
              <span className="rounded border border-white/10 px-2 py-1">
                TELEMETRY: DECORATIVE ONLY
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionShell className="!pt-6">
        <div className="container-lab">
          <SectionHeading
            index="04-A"
            kicker="Station A"
            title={<>INTERACTIVE ROBOT ARM</>}
            sub="A procedurally engineered 6-axis reference arm. Orbit it, zoom, click parts for engineering context, and take manual control of every joint."
          />
          <ArmViewer />
        </div>
      </SectionShell>

      <SectionShell className="!pt-4 bg-lab-900/30">
        <div className="container-lab">
          <SectionHeading
            index="04-B"
            kicker="Station B"
            title={<>ELECTRONICS WORKBENCH</>}
            sub="The standard experimental bench behind the ESP32 series: controller, breadboard, signaling LEDs, a micro servo and a temperature sensor."
          />
          <Workbench />
        </div>
      </SectionShell>

      <SectionShell className="!pt-4">
        <div className="container-lab">
          <SectionHeading
            index="04-C"
            kicker="Station C"
            title={<>ENGINEERING BLUEPRINTS</>}
            sub="Original multi-view schematics of the reference arm, including a fully interactive exploded assembly and an annotated circuit diagram."
          />
          <Blueprints />
        </div>
      </SectionShell>

      <SectionShell className="!pt-4 bg-lab-900/30" >
        <div className="container-lab">
          <ArchitectureViewer />
        </div>
      </SectionShell>
    </>
  );
}
