import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { SectionShell, SectionHeading } from "./ui";
import SmartImage from "./SmartImage";
import { projects, getProject } from "../data/projects";
import { IMG } from "../lib/images";

const STATUS_COLOR: Record<string, string> = {
  CONCEPT: "text-ice-cyan",
  DESIGNED: "text-accent-soft",
  "PROTOTYPE / IN DEVELOPMENT": "text-amber-400",
  "EXPERIMENTS COMPLETE": "text-emerald-400",
};

export default function Archive() {
  return (
    <SectionShell id="archive" className="border-t border-white/[0.05] bg-lab-900/30">
      <div className="container-lab">
        <SectionHeading
          index="02"
          kicker="Project Archive"
          title={
            <>
              THE <span className="text-accent">ARCHIVE</span> IS OPEN.
            </>
          }
          sub="Four engineering projects with full case studies — honest about what is designed, what is implemented, and what may never leave the drawing board."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => {
            const img = IMG[p.imgKey];
            return (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, delay: 0.06 * i }}
              >
                <Link
                  to={`/projects/${p.slug}`}
                  className="panel clip-corner group block overflow-hidden transition-all duration-500 hover:border-accent/40 hover:shadow-panel"
                >
                  {p.marsHero ? (
                    <div className="relative h-52 overflow-hidden bg-[radial-gradient(ellipse_at_50%_120%,#4d2f24,#150b07_75%)] sm:h-60">
                      <div className="grid-bg-fine absolute inset-0 opacity-20" />
                      <div className="absolute left-1/2 top-1/2 h-14 w-28 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-[#8d939a]/60 bg-[#7A7E83]/70 shadow-[0_0_50px_rgba(255,77,36,0.25)]" />
                      <div className="absolute bottom-8 left-1/2 h-3 w-24 -translate-x-1/2 rounded-full bg-black/60 blur-[6px]" />
                      <div className="absolute right-5 top-5 rounded border border-amber-500/50 bg-amber-500/10 px-2 py-1 font-mono text-[9px] uppercase tracking-widest2 text-amber-400">
                        Game concept render
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-lab-950/90 to-transparent p-3 font-mono text-[9px] uppercase tracking-widest2 text-ice-dim">
                        Mars operation scene — conceptual render
                      </div>
                    </div>
                  ) : (
                  <SmartImage
                    src={img.src}
                    alt={p.title}
                    caption="Reference imagery"
                    wrapperClassName="h-52 sm:h-60"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  )}
                  <div className="p-6 sm:p-7">
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest2">
                      <span className="text-ice-dim">PROJECT {p.index}</span>
                      <span className={`flex items-center gap-1.5 ${STATUS_COLOR[p.status] ?? "text-ice-dim"}`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current animate-blink-dot" />
                        {p.status}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-bold text-ice transition-colors group-hover:text-accent-soft">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-ice-dim">{p.subtitle}</p>
                    <div className="mt-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-accent">
                      Open case study
                      <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}

export function ArchiveStrip() {
  void getProject;
  return null;
}
