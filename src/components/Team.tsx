import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Users, Cpu, Brain, Radio } from "lucide-react";
import { SectionShell, SectionHeading } from "./ui";

const UNITS = [
  {
    icon: Cpu,
    name: "ROBOTICS DIVISION",
    focus:
      "Mechanism design, kinematics, actuation and the physical engineering of machines that move with intent.",
    status: "BUILDING CORE",
    slots: "MEMBER SLOTS — OPEN (EDITABLE)",
  },
  {
    icon: Brain,
    name: "AI DIVISION",
    focus:
      "Perception, reasoning pipelines, AI API integration and the interface between learning systems and the physical world.",
    status: "RESEARCH ACTIVE",
    slots: "MEMBER SLOTS — OPEN (EDITABLE)",
  },
  {
    icon: Radio,
    name: "EMBEDDED DIVISION",
    focus:
      "ESP32 firmware, sensor buses, power budgets, and everything that lives dangerously close to the metal.",
    status: "EXPERIMENTS RUNNING",
    slots: "MEMBER SLOTS — OPEN (EDITABLE)",
  },
  {
    icon: Users,
    name: "SYSTEMS & OPERATIONS",
    focus:
      "Documentation standards, simulation tooling, versioned experiment logs and the unglamorous discipline that keeps engineering honest.",
    status: "STANDARDS DRAFTED",
    slots: "MEMBER SLOTS — OPEN (EDITABLE)",
  },
];

export default function Team() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <SectionShell id="team" className="border-t border-white/[0.05] bg-lab-900/30">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="container-lab relative">
        <SectionHeading
          index="05"
          kicker="Team Identity"
          title={
            <>
              RED <span className="text-accent">FRONTIER</span>
            </>
          }
          sub="ENGINEERING THE UNKNOWN. A robotics & AI team identity — collaborative development, open experiment logs, and a shared bias for building. No fictional rosters are published; crew assignments are intentionally unlisted."
        />

        <div className="grid gap-10 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="panel clip-corner p-8"
          >
            <div className="kicker">Broadcast</div>
            <p className="mt-4 font-display text-2xl font-bold leading-snug text-ice">
              "ENGINEERING THE
              <br />
              UNKNOWN."
            </p>
            <p className="mt-5 text-sm leading-relaxed text-ice-dim">
              RED FRONTIER is a team identity built around curiosity and
              experimental thinking — a standing invitation to collaborate on
              real, documented engineering.
            </p>
            <div className="mt-8 space-y-3 font-mono text-[10px] uppercase tracking-widest2">
              <div className="flex justify-between border-b border-white/[0.06] pb-2 text-ice-dim">
                <span>FOCUS</span>
                <span className="text-ice">ROBOTICS + AI</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.06] pb-2 text-ice-dim">
                <span>MODE</span>
                <span className="text-ice">COLLABORATIVE DEV</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.06] pb-2 text-ice-dim">
                <span>DOCS</span>
                <span className="text-ice-cyan">OPEN LOG POLICY</span>
              </div>
            </div>
          </motion.div>

          <div className="space-y-3 lg:col-span-2">
            {UNITS.map((u, i) => {
              const Icon = u.icon;
              const isOpen = open === i;
              return (
                <motion.div
                  key={u.name}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.05 * i }}
                  className={`panel overflow-hidden transition-colors ${
                    isOpen ? "border-accent/40" : ""
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center gap-4 p-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md border transition-colors ${
                        isOpen
                          ? "border-accent/60 bg-accent/10 text-accent"
                          : "border-white/10 text-ice-dim"
                      }`}
                    >
                      <Icon size={18} />
                    </span>
                    <div className="flex-1">
                      <div className="font-display text-sm font-bold tracking-[0.15em] text-ice sm:text-base">
                        {u.name}
                      </div>
                      <div className="mt-0.5 font-mono text-[9px] uppercase tracking-widest2 text-ice-dim">
                        {u.status}
                      </div>
                    </div>
                    <span className="text-ice-dim">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                      >
                        <div className="border-t border-white/[0.06] px-5 py-4 pl-[4.5rem]">
                          <p className="text-sm leading-relaxed text-ice-dim">
                            {u.focus}
                          </p>
                          <p className="mt-3 font-mono text-[9px] uppercase tracking-widest2 text-accent/80">
                            {u.slots}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
