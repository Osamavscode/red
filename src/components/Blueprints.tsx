import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TABS = ["FRONT VIEW", "SIDE VIEW", "TOP VIEW", "EXPLODED VIEW", "CIRCUIT"] as const;
type Tab = (typeof TABS)[number];

const stroke = "#667585";
const hot = "#FF4D24";
const ice = "#DDE5EC";

function DimLine({ x1, y1, x2, y2, label }: { x1: number; y1: number; x2: number; y2: number; label: string }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={hot} strokeWidth="0.7" strokeDasharray="3 2" />
      <line x1={x1} y1={y1 - 4} x2={x1} y2={y1 + 4} stroke={hot} strokeWidth="0.7" />
      <line x1={x2} y1={y2 - 4} x2={x2} y2={y2 + 4} stroke={hot} strokeWidth="0.7" />
      <text x={(x1 + x2) / 2} y={y1 - 6} fill={hot} fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">
        {label}
      </text>
    </g>
  );
}

const center = (cx: number, cy: number) => ({ x: cx, y: cy });

function ArmViewFront() {
  const c = center(240, 230);
  return (
    <g>
      <ellipse cx={c.x} cy={c.y + 90} rx="110" ry="14" fill="none" stroke={stroke} strokeWidth="1" />
      <ellipse cx={c.x} cy={c.y + 80} rx="70" ry="10" fill="none" stroke={stroke} strokeWidth="1" />
      <rect x={c.x - 45} y={c.y - 20} width="90" height="52" rx="8" fill="rgba(57,67,79,0.35)" stroke={ice} strokeWidth="1.2" />
      <circle cx={c.x} cy={c.y} r="16" fill="none" stroke={ice} strokeWidth="1.2" />
      <line x1={c.x} y1={c.y} x2={c.x - 30} y2={c.y - 120} stroke={ice} strokeWidth="10" strokeLinecap="round" />
      <circle cx={c.x - 30} cy={c.y - 120} r="7" fill="none" stroke={hot} strokeWidth="1.2" />
      <line x1={c.x - 30} y1={c.y - 120} x2={c.x + 34} y2={c.y - 196} stroke={ice} strokeWidth="8" strokeLinecap="round" />
      <circle cx={c.x + 34} cy={c.y - 196} r="6" fill="none" stroke={hot} strokeWidth="1.2" />
      <line x1={c.x + 34} y1={c.y - 196} x2={c.x + 10} y2={c.y - 252} stroke={ice} strokeWidth="4" strokeLinecap="round" />
      <DimLine x1={c.x - 110} y1={c.y + 104} x2={c.x + 110} y2={c.y + 104} label="220 mm" />
      <DimLine x1={c.x + 62} y1={c.y - 20} x2={c.x + 62} y2={c.y + 32} label="52" />
      <text x={c.x - 40} y={c.y - 70} fill={stroke} fontSize="9" fontFamily="JetBrains Mono" transform={`rotate(-72 ${c.x - 30} ${c.y - 120})`}>
        L1 = 240
      </text>
      <text x={c.x + 6} y={c.y - 160} fill={stroke} fontSize="9" fontFamily="JetBrains Mono" transform={`rotate(-48 ${c.x + 34} ${c.y - 196})`}>
        L2 = 200
      </text>
    </g>
  );
}

function ArmViewSide() {
  return (
    <g>
      <rect x="150" y="290" width="220" height="26" rx="6" fill="rgba(57,67,79,0.35)" stroke={ice} strokeWidth="1.2" />
      <rect x="210" y="258" width="100" height="34" rx="8" fill="rgba(57,67,79,0.35)" stroke={ice} strokeWidth="1.2" />
      <circle cx="260" cy="252" r="14" fill="none" stroke={ice} strokeWidth="1.2" />
      <line x1="260" y1="252" x2="305" y2="140" stroke={ice} strokeWidth="9" strokeLinecap="round" />
      <circle cx="305" cy="140" r="6.5" fill="none" stroke={hot} strokeWidth="1.2" />
      <line x1="305" y1="140" x2="262" y2="74" stroke={ice} strokeWidth="6.5" strokeLinecap="round" />
      <circle cx="262" cy="74" r="5.5" fill="none" stroke={hot} strokeWidth="1.2" />
      <line x1="262" y1="74" x2="252" y2="34" stroke={ice} strokeWidth="3.5" />
      <path d="M 236 34 L 252 26 L 268 34 L 252 46 Z" fill="none" stroke={ice} strokeWidth="1.2" />
      <DimLine x1={150} y1={330} x2={370} y2={330} label="150 mm" />
      <DimLine x1={404} y1={34} x2={404} y2={316} label="282 mm (max reach)" />
    </g>
  );
}

function ArmViewTop() {
  return (
    <g>
      <circle cx="240" cy="180" r="104" fill="none" stroke={stroke} strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="240" cy="180" r="20" fill="none" stroke={ice} strokeWidth="1.2" />
      <path d="M 240 180 L 240 90 A 90 90 0 0 1 304 118 Z" fill="rgba(255,77,36,0.08)" stroke={hot} strokeWidth="1" />
      <line x1="240" y1="180" x2="308" y2="116" stroke={ice} strokeWidth="5" strokeLinecap="round" />
      <line x1="140" y1="180" x2="340" y2="180" stroke={stroke} strokeWidth="0.6" strokeDasharray="6 4" />
      <line x1="240" y1="80" x2="240" y2="280" stroke={stroke} strokeWidth="0.6" strokeDasharray="6 4" />
      <text x="248" y="140" fill={hot} fontSize="10" fontFamily="JetBrains Mono">±180°</text>
      <text x="150" y="300" fill={stroke} fontSize="9" fontFamily="JetBrains Mono">BASE Ø210 mm</text>
    </g>
  );
}

function Exploded({ t }: { t: number }) {
  const sep = (v: number) => v * t * 4;
  const baseY = 300;
  return (
    <g fontFamily="JetBrains Mono">
      <line x1="240" y1={baseY} x2="240" y2="30" stroke={stroke} strokeWidth="0.6" strokeDasharray="5 5" />
      <g transform={`translate(0, ${-sep(1)})`}>
        <rect x="170" y={baseY} width="140" height="18" rx="4" fill="rgba(57,67,79,0.35)" stroke={ice} strokeWidth="1" />
        <text x="330" y={baseY + 13} fill={ice} fontSize="10">01 — BASE PLATE</text>
      </g>
      <g transform={`translate(0, ${-sep(2) - 40})`}>
        <rect x="196" y="285" width="88" height="34" rx="6" fill="rgba(57,67,79,0.35)" stroke={ice} strokeWidth="1" />
        <text x="300" y="300" fill={ice} fontSize="10">02 — YAW TURRET</text>
      </g>
      <g transform={`translate(0, ${-sep(3) - 96})`}>
        <circle cx="240" cy="262" r="14" fill="none" stroke={ice} strokeWidth="1" />
        <text x="270" y="266" fill={ice} fontSize="10">03 — SHOULDER JOINT</text>
      </g>
      <g transform={`translate(0, ${-sep(4) - 152})`}>
        <rect x="228" y="210" width="24" height="80" rx="5" fill="rgba(57,67,79,0.35)" stroke={ice} strokeWidth="1" />
        <text x="270" y="250" fill={ice} fontSize="10">04 — LINK L1 (240)</text>
      </g>
      <g transform={`translate(0, ${-sep(5) - 216})`}>
        <circle cx="240" cy="184" r="11" fill="none" stroke={hot} strokeWidth="1" />
        <text x="266" y="188" fill={ice} fontSize="10">05 — ELBOW JOINT</text>
      </g>
      <g transform={`translate(0, ${-sep(6) - 272})`}>
        <rect x="231" y="140" width="18" height="54" rx="4" fill="rgba(57,67,79,0.35)" stroke={ice} strokeWidth="1" />
        <text x="266" y="170" fill={ice} fontSize="10">06 — LINK L2 (200)</text>
      </g>
      <g transform={`translate(0, ${-sep(7) - 330})`}>
        <rect x="226" y="108" width="28" height="20" rx="3" fill="rgba(57,67,79,0.35)" stroke={ice} strokeWidth="1" />
        <text x="270" y="116" fill={ice} fontSize="10">07 — WRIST + GRIPPER</text>
      </g>
    </g>
  );
}

function Circuit() {
  return (
    <g fontFamily="JetBrains Mono" fontSize="10">
      <rect x="60" y="120" width="180" height="120" rx="6" fill="rgba(18,74,47,0.25)" stroke={ice} strokeWidth="1.2" />
      <text x="70" y="112" fill={ice}>ESP32 DEV BOARD</text>
      <rect x="84" y="150" width="52" height="34" rx="3" fill="none" stroke={stroke} />
      <text x="90" y="171" fill={stroke}>WROOM</text>
      {["5V", "GND", "D4", "D22", "D21"].map((p, i) => (
        <g key={p}>
          <rect x="52" y={132 + i * 20} width="16" height="10" fill="rgba(255,77,36,0.15)" stroke={hot} strokeWidth="0.8" />
          <text x="38" y={140 + i * 20} fill={hot} fontSize="8" textAnchor="end">{p}</text>
        </g>
      ))}

      <rect x="470" y="60" width="110" height="40" rx="4" fill="rgba(18,24,32,0.9)" stroke={ice} strokeWidth="1" />
      <text x="480" y="84" fill={ice}>TEMP SENSOR</text>
      <line x1="240" y1="150" x2="400" y2="150" stroke={hot} strokeWidth="1.2" className="animate-dash-flow" strokeDasharray="5 4" />
      <line x1="240" y1="190" x2="400" y2="190" stroke="#57D7E8" strokeWidth="1.2" className="animate-dash-flow" strokeDasharray="5 4" />
      <line x1="400" y1="150" x2="470" y2="80" stroke={hot} strokeWidth="1.2" />
      <line x1="400" y1="190" x2="470" y2="90" stroke="#57D7E8" strokeWidth="1.2" />
      <text x="330" y="144" fill={hot}>SCL</text>
      <text x="330" y="184" fill="#57D7E8">SDA</text>

      <rect x="400" y="240" width="90" height="24" rx="4" fill="rgba(18,24,32,0.9)" stroke={ice} strokeWidth="1" />
      <text x="412" y="256" fill={ice}>R 220Ω</text>
      <line x1="150" y1="240" x2="150" y2="252" stroke={hot} strokeWidth="1.2" />
      <line x1="150" y1="252" x2="396" y2="252" stroke={hot} strokeWidth="1.2" className="animate-dash-flow" strokeDasharray="5 4" />
      <line x1="490" y1="264" x2="490" y2="290" stroke={hot} strokeWidth="1.2" />
      <circle cx="490" cy="310" r="20" fill="rgba(255,59,48,0.15)" stroke="#FF3B30" strokeWidth="1.2" />
      <text x="516" y="314" fill="#FF773D">LED</text>

      <line x1="200" y1="240" x2="200" y2="330" stroke="#57D7E8" strokeWidth="1.2" />
      <rect x="180" y="330" width="100" height="34" rx="4" fill="rgba(29,91,172,0.2)" stroke="#3B7BFF" strokeWidth="1" />
      <text x="190" y="351" fill="#7ea8ff">SERVO (PWM)</text>

      <line x1="150" y1="364" x2="60" y2="364" stroke="#57D7E8" strokeWidth="1.2" />
      <line x1="60" y1="364" x2="60" y2="200" stroke="#57D7E8" strokeWidth="1.2" />
      <line x1="60" y1="200" x2="52" y2="200" stroke="#57D7E8" strokeWidth="1.2" />
      <text x="68" y="358" fill="#57D7E8">GND</text>
    </g>
  );
}

const VIEWS: Record<Tab, React.ReactNode> = {
  "FRONT VIEW": <ArmViewFront />,
  "SIDE VIEW": <ArmViewSide />,
  "TOP VIEW": <ArmViewTop />,
  "EXPLODED VIEW": <Exploded t={1} />,
  CIRCUIT: <Circuit />,
};

export default function Blueprints() {
  const [tab, setTab] = useState<Tab>("FRONT VIEW");
  const [explode, setExplode] = useState(0);

  return (
    <div className="panel clip-corner p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-md px-3.5 py-2 font-mono text-[10px] uppercase tracking-widest2 transition-all ${
                tab === t
                  ? "bg-accent text-white shadow-glow-sm"
                  : "border border-white/10 text-ice-dim hover:text-ice"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="font-mono text-[9px] uppercase tracking-widest2 text-ice-dim">
          DWG-RF-0417 · REV A · SCALE 1:8
        </div>
      </div>

      <div className="relative mt-6 overflow-hidden rounded-lg border border-white/[0.06] bg-[#0b1016]">
        <div className="grid-bg-fine absolute inset-0 opacity-70" />
        <svg viewBox="0 0 480 400" className="relative w-full">
          <rect x="10" y="10" width="460" height="380" fill="none" stroke="rgba(102,117,133,0.3)" strokeWidth="0.8" />
          <text x="22" y="34" fill="#667585" fontSize="10" fontFamily="JetBrains Mono">{tab} — 6-AXIS REFERENCE ARM</text>
          <text x="22" y="382" fill="#667585" fontSize="9" fontFamily="JetBrains Mono">TOL ±0.4 mm UNLESS STATED · UNITS mm</text>
          {tab === "EXPLODED VIEW" && explode > 0 ? <Exploded t={explode} /> : VIEWS[tab]}
        </svg>

        {tab === "EXPLODED VIEW" && (
          <div className="absolute bottom-4 left-1/2 z-10 flex w-3/4 -translate-x-1/2 items-center gap-3 rounded-md border border-white/10 bg-lab-950/85 px-4 py-2.5 backdrop-blur">
            <span className="font-mono text-[9px] uppercase tracking-widest2 text-ice-dim whitespace-nowrap">
              Explode
            </span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.02}
              value={explode}
              onChange={(e) => setExplode(parseFloat(e.target.value))}
              className="h-1 w-full accent-[#FF4D24]"
              aria-label="Explode amount"
            />
            <span className="w-10 text-right font-mono text-[10px] text-accent">
              {Math.round(explode * 100)}%
            </span>
          </div>
        )}
      </div>

      <AnimatePresence>
        <motion.p
          key="hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 font-mono text-[10px] uppercase tracking-widest2 text-ice-dim/70"
        >
          {tab === "EXPLODED VIEW"
            ? "Drag the slider to disassemble the arm layer by layer."
            : "Technical drawings are original schematic illustrations of the reference arm."}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
