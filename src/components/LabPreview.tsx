import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Move3d, MousePointerClick, ZoomIn, Layers } from "lucide-react";
import { SectionShell, SectionHeading } from "./ui";

const FEATURES = [
  {
    icon: Move3d,
    title: "INTERACTIVE ROBOT ARM",
    body: "Grab, rotate and zoom a mechanically detailed arm. Drive each joint yourself or release it to idle choreography.",
  },
  {
    icon: MousePointerClick,
    title: "ELECTRONICS WORKBENCH",
    body: "A live 3D bench: ESP32 board, breadboard, LEDs, servo and sensors — every component clickable and documented.",
  },
  {
    icon: ZoomIn,
    title: "ENGINEERING BLUEPRINTS",
    body: "Multi-view technical drawings with an exploded assembly view you can drive interactively.",
  },
  {
    icon: Layers,
    title: "ROBOT ARCHITECTURE VIEWER",
    body: "Peel through the four-layer robot stack: hardware, firmware, AI and communication — layer by layer.",
  },
];

export default function LabPreview() {
  return (
    <SectionShell className="border-t border-white/[0.05]">
      <div className="container-lab">
        <SectionHeading
          index="03"
          kicker="The Robotics Lab"
          title={
            <>
              DON'T READ ABOUT IT.
              <br />
              <span className="text-accent">OPERATE IT.</span>
            </>
          }
          sub="A dedicated interactive laboratory — the section that makes this site an experience instead of a résumé. Real 3D, real clicks, real controls."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.06 * i }}
                className="panel clip-corner p-6 transition-colors hover:border-accent/40"
              >
                <Icon size={20} className="text-accent" />
                <h3 className="mt-4 font-mono text-xs font-semibold tracking-[0.15em] text-ice">
                  {f.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-ice-dim">{f.body}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link to="/lab" className="btn-primary">
            Initialize the Lab
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}
