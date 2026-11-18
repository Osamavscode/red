import { motion } from "framer-motion";
import { DiagramKind } from "../data/projects";

type Node = { id: string; label: string; sub?: string; x: number; y: number; w: number; accent?: boolean };
type Edge = { from: string; to: string; dashed?: boolean; bidir?: boolean; label?: string };

const nodeMap: Record<DiagramKind, { nodes: Node[]; edges: Edge[]; width: number; height: number }> = {
  hardware: {
    width: 760,
    height: 420,
    nodes: [
      { id: "ps", label: "POWER REG.", sub: "battery + supervision", x: 60, y: 170, w: 150, accent: true },
      { id: "esp", label: "ESP32", sub: "mode-manager core", x: 300, y: 160, w: 170, accent: true },
      { id: "dist", label: "DISTANCE SENSORS", x: 570, y: 60, w: 170 },
      { id: "line", label: "LINE ARRAY", x: 570, y: 150, w: 170 },
      { id: "drive", label: "DRIVER + MOTORS", x: 570, y: 240, w: 170 },
      { id: "sig", label: "LED / SIGNAL", x: 570, y: 330, w: 170 },
    ],
    edges: [
      { from: "ps", to: "esp", bidir: false, label: "3V3" },
      { from: "esp", to: "dist" },
      { from: "esp", to: "line" },
      { from: "esp", to: "drive" },
      { from: "esp", to: "sig" },
    ],
  },
  communication: {
    width: 760,
    height: 420,
    nodes: [
      { id: "fw", label: "FIRMWARE", sub: "on-device runtime", x: 60, y: 170, w: 160, accent: true },
      { id: "esp", label: "ESP32 RADIO", sub: "Wi-Fi + BLE", x: 300, y: 160, w: 170, accent: true },
      { id: "cloud", label: "AI API", sub: "online mode only", x: 570, y: 60, w: 160, accent: true },
      { id: "local", label: "LOCAL PEER", sub: "phone / laptop", x: 570, y: 165, w: 160 },
      { id: "bus", label: "DEVICE BUS", sub: "sensors / actuators", x: 570, y: 270, w: 160 },
    ],
    edges: [
      { from: "fw", to: "esp", bidir: true, label: "JSON schema" },
      { from: "esp", to: "cloud", dashed: true, label: "Wi-Fi / online" },
      { from: "esp", to: "local", bidir: true, label: "BLE" },
      { from: "esp", to: "bus" },
    ],
  },
  flow: {
    width: 760,
    height: 430,
    nodes: [
      { id: "sense", label: "SENSE", sub: "sensor loop", x: 60, y: 60, w: 170, accent: true },
      { id: "mode", label: "MODE MANAGER", sub: "offline ⇄ online", x: 295, y: 60, w: 190, accent: true },
      { id: "decide", label: "DECIDE", sub: "on-device / AI", x: 530, y: 60, w: 170 },
      { id: "validate", label: "VALIDATE", sub: "action allowlist", x: 530, y: 250, w: 170 },
      { id: "act", label: "ACT", sub: "motors / LEDs", x: 295, y: 250, w: 190 },
      { id: "report", label: "REPORT", sub: "status + telemetry", x: 60, y: 250, w: 170 },
    ],
    edges: [
      { from: "sense", to: "mode" },
      { from: "mode", to: "decide" },
      { from: "decide", to: "validate" },
      { from: "validate", to: "act" },
      { from: "act", to: "report" },
      { from: "report", to: "sense" },
      { from: "report", to: "mode", dashed: true },
    ],
  },
  generic: {
    width: 760,
    height: 260,
    nodes: [
      { id: "s1", label: "STEP 1", sub: "define", x: 40, y: 90, w: 150, accent: true },
      { id: "s2", label: "STEP 2", sub: "simulate", x: 220, y: 90, w: 150, accent: true },
      { id: "s3", label: "STEP 3", sub: "build", x: 400, y: 90, w: 150 },
      { id: "s4", label: "STEP 4", sub: "verify", x: 580, y: 90, w: 150 },
    ],
    edges: [
      { from: "s1", to: "s2" },
      { from: "s2", to: "s3" },
      { from: "s3", to: "s4" },
      { from: "s4", to: "s1", dashed: true },
    ],
  },
};

const NODE_H = 62;

function pathFor(a: Node, b: Node) {
  const x1 = a.x + a.w;
  const y1 = a.y + NODE_H / 2;
  const x2 = b.x;
  const y2 = b.y + NODE_H / 2;
  if (x2 > x1) {
    const mx = (x1 + x2) / 2;
    return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
  }
  // vertical / feedback connections
  const cy1 = a.y + NODE_H;
  const cy2 = b.y;
  if (cy2 > cy1) {
    const my = (cy1 + cy2) / 2;
    return `M ${a.x + a.w / 2} ${cy1} L ${a.x + a.w / 2} ${my} L ${b.x + b.w / 2} ${my} L ${b.x + b.w / 2} ${cy2}`;
  }
  const cy1b = a.y - 14;
  const my = cy1b - 22;
  return `M ${a.x + a.w / 2} ${a.y} L ${a.x + a.w / 2} ${my} L ${b.x + b.w / 2} ${my} L ${b.x + b.w / 2} ${b.y}`;
}

export default function FlowDiagram({ kind }: { kind: DiagramKind }) {
  const spec = nodeMap[kind];
  const byId = Object.fromEntries(spec.nodes.map((n) => [n.id, n]));

  return (
    <motion.svg
      viewBox={`0 0 ${spec.width} ${spec.height}`}
      className="w-full h-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      <defs>
        <marker id={`arrow-${kind}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#FF4D24" />
        </marker>
      </defs>

      {spec.edges.map((e, i) => {
        const a = byId[e.from];
        const b = byId[e.to];
        if (!a || !b) return null;
        const d = pathFor(a, b);
        return (
          <g key={i}>
            <motion.g
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 0.9 } }}
              transition={{ duration: 0.7, delay: 0.25 + i * 0.18 }}
            >
              <path
                d={d}
                fill="none"
                stroke="#FF4D24"
                strokeWidth="1.6"
                strokeDasharray={e.dashed ? "6 6" : undefined}
                markerEnd={`url(#arrow-${kind})`}
                className={e.dashed ? "animate-dash-flow" : undefined}
              />
            </motion.g>
            {e.label && (
              <text
                x={`${(a.x + a.w + b.x) / 2 + 4}`}
                y={`${(a.y + b.y) / 2 + 16}`}
                fill="#667585"
                fontSize="10"
                fontFamily="JetBrains Mono, monospace"
                textAnchor="middle"
                opacity="0.9"
              >
                {e.label}
              </text>
            )}
          </g>
        );
      })}

      {spec.nodes.map((n, i) => (
        <motion.g
          key={n.id}
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, delay: i * 0.12 }}
        >
          <rect
            x={n.x}
            y={n.y}
            width={n.w}
            height={NODE_H}
            rx="8"
            fill={n.accent ? "rgba(255,77,36,0.08)" : "rgba(18,24,32,0.9)"}
            stroke={n.accent ? "#FF4D24" : "rgba(102,117,133,0.4)"}
            strokeWidth="1.2"
          />
          <text
            x={n.x + n.w / 2}
            y={n.y + (n.sub ? NODE_H / 2 - 4 : NODE_H / 2 + 4)}
            textAnchor="middle"
            fill={n.accent ? "#FF773D" : "#DDE5EC"}
            fontSize="12"
            fontWeight="600"
            fontFamily="JetBrains Mono, monospace"
            letterSpacing="1"
          >
            {n.label}
          </text>
          {n.sub && (
            <text
              x={n.x + n.w / 2}
              y={n.y + NODE_H / 2 + 12}
              textAnchor="middle"
              fill="#667585"
              fontSize="10"
              fontFamily="JetBrains Mono, monospace"
            >
              {n.sub}
            </text>
          )}
        </motion.g>
      ))}
    </motion.svg>
  );
}
