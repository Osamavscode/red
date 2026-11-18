import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";

const COMPONENTS = [
  {
    id: "esp32",
    name: "ESP32 DEV BOARD",
    role: "Wi-Fi + BLE microcontroller",
    desc: "The controller candidate for RED DUAL MODE: dual-core, Wi-Fi and Bluetooth LE on a single low-cost module.",
  },
  {
    id: "breadboard",
    name: "BREADBOARD",
    role: "Solderless prototyping",
    desc: "830-point solderless board. Every circuit is simulated in Wokwi before it reaches this bench.",
  },
  {
    id: "led",
    name: "INDICATOR LEDs",
    role: "Status signaling",
    desc: "The first debugging layer: firmware state machines report through LED patterns before any serial console is attached.",
  },
  {
    id: "servo",
    name: "MICRO SERVO",
    role: "First actuator",
    desc: "An SG90-class servo demonstrates PWM control — the gateway from reading sensors to moving things.",
  },
  {
    id: "sensor",
    name: "TEMPERATURE SENSOR",
    role: "Environmental input",
    desc: "The classic first sensor experiment — read, verify, and log environmental data through the ESP32.",
  },
];

export default function WorkbenchInfo({
  selected,
}: {
  selected: string | null;
}) {
  const active = COMPONENTS.find((c) => c.id === selected);

  return (
    <div className="panel min-h-[220px] p-6">
      <div className="kicker mb-4 flex items-center gap-2">
        <Info size={12} /> Component Dossier
      </div>
      <AnimatePresence mode="wait">
        {active ? (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <div className="font-mono text-sm font-semibold tracking-[0.15em] text-accent-soft">
              {active.name}
            </div>
            <div className="mt-1 font-mono text-[9px] uppercase tracking-widest2 text-ice-dim">
              {active.role}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ice-dim">{active.desc}</p>
          </motion.div>
        ) : (
          <motion.div key="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-sm leading-relaxed text-ice-dim">
              Click any component in the 3D scene to open its dossier. The bench
              corresponds to the real experiment protocol: simulate in Wokwi → wire
              → verify → document.
            </p>
            <div className="mt-6 space-y-2.5">
              {COMPONENTS.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between border-b border-white/[0.05] pb-2 font-mono text-[10px] uppercase tracking-widest2"
                >
                  <span className="text-ice-dim">{c.name}</span>
                  <span className="text-ice-dim/60">{c.role}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
