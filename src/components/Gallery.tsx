import { motion } from "framer-motion";
import { SectionShell, SectionHeading } from "./ui";
import SmartImage from "./SmartImage";
import { IMG } from "../lib/images";

/**
 * Engineering gallery. Every tile is labeled reference imagery:
 * verified Unsplash photography + live WebGL concept renders from the Lab.
 */
export default function Gallery() {
  const tiles = [
    { ...IMG.humanoid, label: "HUMANOID PLATFORM", note: "Robotics / reference" },
    { ...IMG.circuit, label: "PCB MACRO", note: "Electronics / reference" },
    { ...IMG.trackedRobot, label: "TRACKED ROBOT UNIT", note: "Robotics / reference" },
    { ...IMG.lab, label: "LABORATORY WORK", note: "Engineering practice / reference" },
    { ...IMG.code, label: "SYSTEMS CODE", note: "Software / reference" },
    { ...IMG.asimo, label: "BIPEDAL ROBOT", note: "Humanoid research / reference" },
  ];

  const spans = [
    "sm:col-span-2 sm:row-span-2",
    "",
    "",
    "sm:row-span-2",
    "",
    "",
  ];

  return (
    <SectionShell id="gallery" className="border-t border-white/[0.05]">
      <div className="container-lab">
        <SectionHeading
          index="07"
          kicker="Engineering Gallery"
          title={
            <>
              VISUAL <span className="text-accent">TELEMETRY</span>
            </>
          }
          sub="Curated reference imagery of machines, electronics and laboratories — verified sources, labeled honestly, lazy-loaded. Live 3D concept renders run in The Lab."
        />

        <div className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {tiles.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.05 * (i % 4) }}
              className={spans[i]}
            >
              <SmartImage
                src={t.src}
                alt={t.label}
                caption={`${t.note} — ${t.credit}`}
                wrapperClassName="h-full"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          ))}
        </div>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-widest2 text-ice-dim/60">
          NOTE: conceptual renders & reference photography — none of the above depicts Osama's own hardware.
        </p>
      </div>
    </SectionShell>
  );
}
