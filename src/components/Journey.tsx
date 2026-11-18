import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { SectionShell, SectionHeading } from "./ui";

type Item = {
  phase: string;
  title: string;
  body: string;
  date: string;
  tags: string[];
};

const ITEMS: Item[] = [
  {
    phase: "PHASE 01",
    title: "STEM SCHOOL — 6TH OF OCTOBER",
    body: "Foundation years in science, technology, engineering and mathematics. The first place where problem-solving stopped being a subject and became a method.",
    date: "DATE: EDITABLE",
    tags: ["Mathematics", "Physics", "First Code"],
  },
  {
    phase: "PHASE 02",
    title: "DIGITAL EGYPT CUBS",
    body: "A structured national learning journey — programming fundamentals, digital skills, and early exposure to robotics track content through hands-on coursework.",
    date: "DATE: EDITABLE",
    tags: ["Programming", "Digital Skills", "Robotics Track"],
  },
  {
    phase: "PHASE 03",
    title: "ROBOTICS & EMBEDDED SYSTEMS STUDIES",
    body: "Self-directed lab work: ESP32 experiments, Wokwi simulations, sensor integration, and the discipline of simulate → wire → verify → document.",
    date: "DATE: EDITABLE",
    tags: ["ESP32", "Firmware", "Sensors"],
  },
  {
    phase: "PHASE 04",
    title: "NASA SPACE APPS — PARTICIPATION",
    body: "Joined a global collaborative science event and shaped MISSIONFORGE — a space mission design game concept built around honest engineering trade-offs.",
    date: "EDITION: EDITABLE",
    tags: ["Hackathon", "Game Design", "Mission Engineering"],
  },
  {
    phase: "PHASE 05",
    title: "PERSONAL ROBOTICS & AI PROJECTS",
    body: "RED DUAL MODE — a dual-connectivity robot architecture designed end to end. AI ROBOTICS — experiments binding AI APIs to hardware boundaries. Both documented publicly in the archive.",
    date: "DATE: EDITABLE",
    tags: ["System Design", "AI APIs", "Documentation"],
  },
  {
    phase: "PHASE 06",
    title: "RED FRONTIER — TEAM FORMATION",
    body: "A team identity organized around robotics and AI experimentation: shared standards, open documentation, and the principle of engineering the unknown.",
    date: "PHASE: ACTIVE",
    tags: ["Team building", "Open documentation", "Collaboration"],
  },
];

export default function Journey() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.75", "end 0.6"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <SectionShell id="journey" className="border-t border-white/[0.05]">
      <div className="container-lab">
        <SectionHeading
          index="04"
          kicker="Engineering Journey"
          title={
            <>
              A CAREER IS AN
              <br />
              <span className="text-accent">ACCUMULATING SYSTEM.</span>
            </>
          }
          sub="A phase-by-phase technical timeline. Dates are shown as editable placeholders until they can be stated with certainty."
        />

        <div ref={trackRef} className="relative">
          <div className="absolute left-[11px] top-0 h-full w-px bg-white/[0.07] sm:left-1/2" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-[11px] top-0 h-full w-px origin-top bg-gradient-to-b from-accent via-accent-soft to-transparent sm:left-1/2"
          />

          <div className="space-y-12 sm:space-y-16">
            {ITEMS.map((item, i) => (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className={`relative grid sm:grid-cols-2 sm:gap-16 ${
                  i % 2 === 0 ? "" : ""
                }`}
              >
                <div
                  className={`pl-10 sm:pl-0 ${
                    i % 2 === 0
                      ? "sm:col-start-1 sm:pr-2 sm:text-right"
                      : "sm:col-start-2 sm:pl-2"
                  }`}
                >
                  <div className="font-mono text-[10px] uppercase tracking-widest2 text-accent">
                    {item.phase}
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold text-ice sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ice-dim">
                    {item.body}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-mono uppercase tracking-widest2 text-ice-dim">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="border border-white/10 bg-white/[0.03] px-2 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 font-mono text-[9px] uppercase tracking-widest2 text-ice-dim/50">
                    {item.date}
                  </div>
                </div>

                <div
                  className={`absolute left-[5px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-lab-950 sm:left-1/2 sm:-translate-x-1/2 ${
                    i % 2 === 0 ? "sm:block" : "sm:block"
                  }`}
                >
                  <span className="absolute inset-0 rounded-full bg-accent/50 animate-ping" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
