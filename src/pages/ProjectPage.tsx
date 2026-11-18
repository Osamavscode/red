import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check, PenLine, Cpu, FileCode2 } from "lucide-react";
import { Project } from "../data/projects";
import { projects as allProjects } from "../data/projects";
import SmartImage from "../components/SmartImage";
import FlowDiagram from "../components/FlowDiagram";
import { Tag } from "../components/ui";
import { IMG } from "../lib/images";

const Fade = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 26 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

function SeriesTitle({ n, title }: { n: string; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="font-mono text-[11px] tracking-widest2 text-accent">
        [{n}]
      </span>
      <h2 className="font-display text-2xl font-bold tracking-tight text-ice sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}

export default function ProjectPage({ project }: { project: Project }) {
  const img = IMG[project.imgKey];
  const idx = allProjects.findIndex((p) => p.slug === project.slug);
  const next = allProjects[(idx + 1) % allProjects.length];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-28 sm:pt-36">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(255,77,36,0.08),transparent_55%)]" />
        <div className="container-lab relative pb-10">
          <Link
            to="/#archive"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest2 text-ice-dim transition-colors hover:text-accent"
          >
            <ArrowLeft size={13} /> Back to archive
          </Link>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-widest2"
              >
                <span className="rounded border border-accent/40 bg-accent/10 px-2.5 py-1 text-accent">
                  PROJECT {project.index}
                </span>
                <span className="rounded border border-ice-cyan/40 bg-ice-cyan/10 px-2.5 py-1 text-ice-cyan">
                  {project.status}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="mt-5 font-display text-4xl font-bold leading-none tracking-tight text-ice sm:text-6xl"
              >
                {project.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 }}
                className="mt-4 text-base text-ice-dim sm:text-lg"
              >
                {project.subtitle}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="mt-6 flex items-start gap-2.5 rounded-lg border border-amber-500/25 bg-amber-500/[0.06] p-4 text-xs leading-relaxed text-amber-200/90"
              >
                <PenLine size={14} className="mt-0.5 shrink-0 text-amber-400" />
                {project.statusNote}
              </motion.div>
            </div>

            <div>
              {project.marsHero ? (
                <div className="panel clip-corner relative overflow-hidden">
                  <div className="h-64 sm:h-80 lg:h-96 bg-[radial-gradient(ellipse_at_50%_120%,#4d2f24,#150b07_70%)]">
                    <MarsHeroCanvas />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-lab-950/90 to-transparent p-4 font-mono text-[9px] uppercase tracking-widest2 text-ice-dim">
                    {project.heroCaption}
                  </div>
                </div>
              ) : (
                <SmartImage
                  src={img.src}
                  alt={project.title}
                  caption={project.heroCaption}
                  wrapperClassName="clip-corner h-64 sm:h-80 lg:h-96"
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="container-lab space-y-24 py-16 sm:space-y-28 sm:py-20">
        {/* 1 overview / 2 problem / 3 solution */}
        <div className="grid gap-10 lg:grid-cols-3">
          <Fade>
            <SeriesTitle n="01" title="Project Overview" />
            <p className="text-sm leading-relaxed text-ice-dim sm:text-base">{project.overview}</p>
          </Fade>
          <Fade delay={0.08}>
            <SeriesTitle n="02" title="The Problem" />
            <p className="text-sm leading-relaxed text-ice-dim sm:text-base">{project.problem}</p>
          </Fade>
          <Fade delay={0.16}>
            <SeriesTitle n="03" title="Proposed Solution" />
            <p className="text-sm leading-relaxed text-ice-dim sm:text-base">{project.solution}</p>
          </Fade>
        </div>

        {/* 4 architecture diagrams */}
        <div>
          <Fade>
            <SeriesTitle n="04" title="System Architecture" />
          </Fade>
          <div className="space-y-6">
            {project.diagramSections.map((ds, i) => (
              <Fade key={ds.title} delay={0.05 * i}>
                <div className="panel clip-corner p-5 sm:p-8">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-mono text-xs font-semibold uppercase tracking-widest2 text-accent-soft">
                      {ds.title}
                    </h3>
                    <span className="font-mono text-[9px] uppercase tracking-widest2 text-ice-dim">
                      FIG 4.{i + 1} — animated schematic
                    </span>
                  </div>
                  <FlowDiagram kind={ds.kind} />
                  <p className="mt-4 text-[11px] leading-relaxed text-ice-dim/80">
                    {ds.caption}
                  </p>
                </div>
              </Fade>
            ))}
          </div>
        </div>

        {/* 5 technologies */}
        <Fade>
          <SeriesTitle n="05" title="Technologies" />
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </Fade>

        {/* 6 hardware & software */}
        <div className="grid gap-6 md:grid-cols-2">
          <Fade>
            <div className="panel clip-corner h-full p-7">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-accent">
                <Cpu size={14} /> Hardware
              </div>
              <ul className="mt-5 space-y-3">
                {project.hardware.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-ice-dim">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </Fade>
          <Fade delay={0.1}>
            <div className="panel clip-corner h-full p-7">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-ice-cyan">
                <FileCode2 size={14} /> Software
              </div>
              <ul className="mt-5 space-y-3">
                {project.software.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-sm text-ice-dim">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ice-cyan" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Fade>
        </div>

        {/* 7 engineering decisions */}
        <div>
          <Fade>
            <SeriesTitle n="07" title="Engineering Decisions" />
          </Fade>
          <div className="grid gap-4 md:grid-cols-3">
            {project.decisions.map((d, i) => (
              <Fade key={d.title} delay={0.06 * i}>
                <div className="panel clip-corner h-full p-6">
                  <div className="font-mono text-[10px] tracking-widest2 text-accent">
                    DECISION {String(i + 1).padStart(2, "0")}
                  </div>
                  <h4 className="mt-2 font-display text-base font-bold text-ice">{d.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-ice-dim">{d.body}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>

        {/* 8 current status + scope */}
        <Fade>
          <SeriesTitle n="08" title="Current Development Status" />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="panel clip-corner p-7">
              <p className="text-sm leading-relaxed text-ice-dim">{project.currentStatus}</p>
              <div className="mt-6 font-mono text-[10px] uppercase tracking-widest2 text-ice-dim">
                STATUS: <span className="text-ice-cyan">{project.status}</span> · {project.year}
              </div>
            </div>
            <div className="space-y-4">
              <div className="panel clip-corner p-6">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest2 text-emerald-400">
                  <Check size={13} /> Implemented / documented
                </div>
                <ul className="mt-4 space-y-2">
                  {project.scope.implemented.map((s) => (
                    <li key={s} className="text-xs text-ice-dim">✓ {s}</li>
                  ))}
                </ul>
              </div>
              <div className="panel clip-corner p-6">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest2 text-accent-soft">
                  <PenLine size={13} /> Designed only — not built yet
                </div>
                <ul className="mt-4 space-y-2">
                  {project.scope.designed.map((s) => (
                    <li key={s} className="text-xs text-ice-dim">◇ {s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Fade>

        {/* 9 future */}
        <div>
          <Fade>
            <SeriesTitle n="09" title="Future Improvements" />
          </Fade>
          <div className="grid gap-3 sm:grid-cols-2">
            {project.future.map((f, i) => (
              <Fade key={f} delay={0.05 * i}>
                <div className="panel flex items-center gap-4 p-5">
                  <span className="font-mono text-[10px] tracking-widest2 text-accent">
                    F{i + 1}
                  </span>
                  <span className="text-sm text-ice-dim">{f}</span>
                </div>
              </Fade>
            ))}
          </div>
        </div>

        {/* 10 gallery */}
        <div>
          <Fade>
            <SeriesTitle n="10" title="Project Gallery" />
          </Fade>
          <Fade>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.marsHero ? (
                <div className="panel clip-corner relative h-64 overflow-hidden bg-[radial-gradient(ellipse_at_50%_130%,#4d2f24,#150b07_75%)] sm:h-80">
                  <div className="grid-bg-fine absolute inset-0 opacity-25" />
                  <div className="absolute left-1/2 top-1/2 h-16 w-36 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[#8d939a]/60 bg-[#7A7E83]/70 shadow-[0_0_70px_rgba(255,77,36,0.3)]" />
                  <div className="absolute bottom-10 left-1/2 h-4 w-32 -translate-x-1/2 rounded-full bg-black/60 blur-[8px]" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-lab-950/90 to-transparent p-4 font-mono text-[9px] uppercase tracking-widest2 text-ice-dim">
                    Concept 3D render — interactive version lives on the home page
                  </div>
                </div>
              ) : (
              <SmartImage
                src={img.src}
                alt={`${project.title} gallery — reference`}
                caption="Reference imagery / concept — not project hardware"
                wrapperClassName="h-64 sm:h-80"
                className="h-full w-full object-cover"
              />
              )}
              <div className="panel clip-corner grid h-64 place-items-center bg-lab-900/60 sm:h-80">
                <div className="p-8 text-center font-mono text-[10px] uppercase tracking-widest2 text-ice-dim">
                  <div className="mx-auto mb-4 h-14 w-14 rounded-full border-2 border-accent/40 animate-pulse-slow" />
                  GALLERY SLOT — RESERVED
                  <div className="mt-2 text-[9px] normal-case tracking-normal text-ice-dim/60">
                    Real project photos will be added to this slot as hardware is
                    fabricated. No stock imagery is presented as project work.
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* NEXT PROJECT */}
      <section className="border-t border-white/[0.05] bg-lab-900/40">
        <Link
          to={`/projects/${next.slug}`}
          className="container-lab group flex items-center justify-between py-10"
        >
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest2 text-ice-dim">
              Next case study
            </div>
            <div className="mt-1 font-display text-2xl font-bold text-ice transition-colors group-hover:text-accent-soft">
              {next.title}
            </div>
          </div>
          <ArrowUpRight
            size={28}
            className="text-ice-dim transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
          />
        </Link>
      </section>
    </>
  );
}

const MarsScene = lazy(() =>
  import("../components/three/LabScenes").then((m) => ({ default: m.MarsScene }))
);

function MarsHeroCanvas() {
  return (
    <Suspense fallback={null}>
      <MarsScene />
    </Suspense>
  );
}
