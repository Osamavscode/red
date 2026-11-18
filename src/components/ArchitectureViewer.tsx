import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./ui";

type Layer = {
  id: string;
  title: string;
  subtitle: string;
  items: string[];
  color: string;
  glow: string;
};

const LAYERS: Layer[] = [
  {
    id: "ai",
    title: "AI LAYER",
    subtitle: "Perception & reasoning",
    items: [
      "Cloud AI APIs (online mode only)",
      "Action-plan generation & validation",
      "Computer vision experiments (planned)",
      "Local fallback behavior policies",
    ],
    color: "#57D7E8",
    glow: "rgba(87,215,232,0.14)",
  },
  {
    id: "comm",
    title: "COMMUNICATION LAYER",
    subtitle: "Connectivity & arbitration",
    items: [
      "Wi-Fi channel to cloud services",
      "Bluetooth LE to local peers",
      "Mode-manager link quality checks",
      "JSON message schema on all paths",
    ],
    color: "#FF773D",
    glow: "rgba(255,119,61,0.14)",
  },
  {
    id: "fw",
    title: "FIRMWARE LAYER",
    subtitle: "On-device intelligence",
    items: [
      "Dual-mode state machine",
      "Sensor sampling loops",
      "Actuator drivers & safety limits",
      "OTA update path (designed)",
    ],
    color: "#FF4D24",
    glow: "rgba(255,77,36,0.15)",
  },
  {
    id: "hw",
    title: "HARDWARE LAYER",
    subtitle: "Physical systems",
    items: [
      "ESP32 microcontroller",
      "Motors, drivers & encoders",
      "Temperature / distance sensors",
      "Power regulation & battery",
    ],
    color: "#DDE5EC",
    glow: "rgba(221,229,236,0.08)",
  },
];

export default function ArchitectureViewer() {
  const [openId, setOpenId] = useState<string>("fw");

  return (
    <div>
      <SectionHeading
        index="04-D"
        kicker="Robot Architecture Viewer"
        title={
          <>
            FOUR LAYERS.
            <br />
            <span className="text-accent">ONE MACHINE.</span>
          </>
        }
        sub="Select a layer to inspect its responsibilities. The layers map one-to-one to RED DUAL MODE's architecture documents."
      />

      <div
        className="relative mx-auto max-w-2xl space-y-3"
        style={{ perspective: "1200px" }}
      >
        {LAYERS.map((l, i) => {
          const isOpen = openId === l.id;
          return (
            <motion.div
              key={l.id}
              layout
              onClick={() => setOpenId(isOpen ? "" : l.id)}
              whileHover={{ rotateX: -3, scale: 1.01 }}
              className={`cursor-pointer rounded-xl border p-5 transition-all duration-300 ${
                isOpen ? "" : "border-white/[0.08] bg-lab-850/80"
              }`}
              style={
                isOpen
                  ? {
                      borderColor: l.color,
                      background: `linear-gradient(135deg, ${l.glow}, rgba(18,24,32,0.9))`,
                      boxShadow: `0 18px 60px ${l.glow}`,
                    }
                  : undefined
              }
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span
                    className="font-mono text-[10px] font-bold tracking-widest2"
                    style={{ color: l.color }}
                  >
                    L{LAYERS.length - i}
                  </span>
                  <div>
                    <div className="font-display text-base font-bold tracking-[0.12em] text-ice">
                      {l.title}
                    </div>
                    <div className="mt-0.5 font-mono text-[9px] uppercase tracking-widest2 text-ice-dim">
                      {l.subtitle}
                    </div>
                  </div>
                </div>
                <div
                  className={`h-2.5 w-2.5 rounded-full transition-transform ${
                    isOpen ? "scale-125" : ""
                  }`}
                  style={{ background: l.color, boxShadow: `0 0 12px ${l.color}` }}
                />
              </div>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 grid gap-2 border-t border-white/[0.08] pt-4 sm:grid-cols-2">
                      {l.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-xs leading-relaxed text-ice-dim"
                        >
                          <span
                            className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                            style={{ background: l.color }}
                          />
                          {item}
                        </li>
                      ))}
                    </div>
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
