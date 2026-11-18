import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SectionShell, SectionHeading, Tag } from "./ui";
import SmartImage from "./SmartImage";
import { IMG } from "../lib/images";

const DOMAINS = [
  {
    code: "A",
    title: "Robotics & Autonomous Systems",
    desc: "Designing intelligent machines that interact with the physical world — kinematics, actuation, sensing, autonomy.",
    img: IMG.humanoid,
    caption: "Humanoid robotics — reference imagery",
    tags: ["Kinematics", "Actuation", "Sensors"],
  },
  {
    code: "B",
    title: "Artificial Intelligence",
    desc: "Exploring how AI gives machines the ability to perceive, reason, and make decisions.",
    img: IMG.trackedRobot,
    caption: "Intelligent agent concept — reference imagery",
    tags: ["Perception", "Reasoning", "Agents"],
  },
  {
    code: "C",
    title: "Embedded Systems",
    desc: "Connecting software with hardware through embedded intelligence — ESP32 firmware, buses, and real constraints.",
    img: IMG.circuit,
    caption: "Embedded electronics — reference imagery",
    tags: ["ESP32", "Firmware", "I²C"],
  },
  {
    code: "D",
    title: "Software Engineering",
    desc: "Building the software infrastructure that powers intelligent systems — architecture, tooling, and reliable code.",
    img: IMG.code,
    caption: "Development environment — reference imagery",
    tags: ["Architecture", "Python", "TypeScript"],
  },
  {
    code: "E",
    title: "Engineering & Prototyping",
    desc: "Transforming ideas into functional designs and testable prototypes — CAD thinking, iteration, honest testing.",
    img: IMG.lab,
    caption: "Laboratory work — reference imagery",
    tags: ["CAD", "Prototyping", "Testing"],
  },
];

export default function Domains() {
  return (
    <SectionShell id="domains" className="border-t border-white/[0.05]">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="container-lab relative">
        <SectionHeading
          index="01"
          kicker="Engineering Domains"
          title={
            <>
              FIVE FIELDS.
              <br />
              <span className="text-accent">ONE INTEGRATED FRONTIER.</span>
            </>
          }
          sub="Every domain below is an active area of study — explored through experiments, simulations and design work. Reference imagery is labeled; it is not presented as personal hardware."
        />

        <div className="space-y-8 sm:space-y-10">
          {DOMAINS.map((d, i) => (
            <motion.article
              key={d.code}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.05 * i }}
              className={`panel clip-corner group grid items-stretch gap-0 overflow-hidden md:grid-cols-5 ${
                i % 2 === 1 ? "md:[&>figure]:order-2" : ""
              }`}
            >
              <SmartImage
                src={d.img.src}
                alt={d.title}
                caption={d.caption}
                wrapperClassName="md:col-span-2 h-64 md:h-auto"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="p-7 sm:p-10 md:col-span-3">
                <div className="flex items-baseline gap-4">
                  <span className="font-outline font-display text-5xl font-bold">
                    {d.code}
                  </span>
                  <h3 className="font-display text-xl font-bold text-ice sm:text-2xl">
                    {d.title.toUpperCase()}
                  </h3>
                </div>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-ice-dim sm:text-base">
                  {d.desc}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {d.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
                <Link
                  to="/lab"
                  className="mt-7 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-ice-dim transition-colors hover:text-accent"
                >
                  Inspect in the lab →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
