import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Copy, Check, MessageSquare } from "lucide-react";
import { SectionShell, SectionHeading } from "./ui";

/**
 * EDITABLE PLACEHOLDERS — swap these with real profiles/emails when available.
 */
const LINKS = [
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/[EDITABLE-USERNAME]",
    href: "#EDITABLE-GITHUB",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/[EDITABLE-HANDLE]",
    href: "#EDITABLE-LINKEDIN",
  },
  {
    icon: Mail,
    label: "Email",
    value: "[EDITABLE]@example.com",
    href: "#EDITABLE-EMAIL",
  },
  {
    icon: MessageSquare,
    label: "Collaboration",
    value: "Open to robotics / AI collabs — reach out via email",
    href: "#EDITABLE-COLLAB",
  },
];

export default function Contact() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text).then(
      () => {
        setCopied(key);
        setTimeout(() => setCopied(null), 1500);
      },
      () => undefined
    );
  };

  return (
    <SectionShell id="contact" className="border-t border-white/[0.05] bg-lab-900/30">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="container-lab relative">
        <SectionHeading
          index="08"
          kicker="Contact & Collaboration"
          title={
            <>
              LET'S BUILD SOMETHING
              <br />
              <span className="text-accent">THAT DOESN'T EXIST YET.</span>
            </>
          }
          sub="Links below are clearly marked editable placeholders and will be replaced with real profiles. Collaboration inquiries are welcome — especially robotics, embedded systems, and applied AI."
        />

        <div className="grid gap-3 sm:grid-cols-2">
          {LINKS.map((l, i) => {
            const Icon = l.icon;
            return (
              <motion.a
                key={l.label}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  copy(l.value, l.label);
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i }}
                className="panel clip-corner group flex items-center gap-4 p-5 transition-all hover:border-accent/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-md border border-white/10 text-ice-dim transition-colors group-hover:border-accent/50 group-hover:text-accent">
                  <Icon size={18} />
                </span>
                <span className="flex-1">
                  <span className="block font-mono text-[10px] uppercase tracking-widest2 text-ice-dim">
                    {l.label} — EDITABLE PLACEHOLDER
                  </span>
                  <span className="mt-1 block break-all text-sm text-ice">
                    {l.value}
                  </span>
                </span>
                {copied === l.label ? (
                  <Check size={16} className="text-emerald-400" />
                ) : (
                  <Copy size={16} className="text-ice-dim opacity-0 transition-opacity group-hover:opacity-100" />
                )}
              </motion.a>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center font-mono text-[10px] uppercase tracking-widest2 text-ice-dim/70"
        >
          Click a card to copy the placeholder — replace with real channels when published.
        </motion.p>
      </div>
    </SectionShell>
  );
}
