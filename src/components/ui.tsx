import { ReactNode } from "react";
import { motion } from "framer-motion";

export function SectionShell({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden py-20 sm:py-28 ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  index,
  kicker,
  title,
  sub,
  align = "left",
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  sub?: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-12 sm:mb-16 ${align === "center" ? "text-center" : ""}`}
    >
      <div
        className={`flex items-center gap-3 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-10 bg-accent" />
        <span className="kicker">
          {index} / {kicker}
        </span>
      </div>
      <h2 className="mt-4 font-display text-3xl font-bold leading-[1.05] tracking-tight text-ice sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {sub && (
        <p
          className={`mt-4 max-w-2xl text-sm leading-relaxed text-ice-dim sm:text-base ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {sub}
        </p>
      )}
    </motion.div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ice-dim">
      {children}
    </span>
  );
}

export function StatusLabel({ items }: { items: [string, string][] }) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.06] font-mono text-[10px] uppercase tracking-[0.15em]">
      {items.map(([k, v]) => (
        <div key={k} className="bg-lab-900/90 px-4 py-3">
          <div className="text-ice-dim/80">{k}</div>
          <div className="mt-1 text-ice">
            {v === "ONLINE" || v === "ACTIVE" ? (
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-blink-dot align-middle" />
            ) : null}
            {v}
          </div>
        </div>
      ))}
    </div>
  );
}
