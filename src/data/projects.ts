export type ProjectStatus =
  | "CONCEPT"
  | "DESIGNED"
  | "PROTOTYPE / IN DEVELOPMENT"
  | "EXPERIMENTS COMPLETE";

export type DiagramKind = "hardware" | "communication" | "flow" | "generic";

export type Project = {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  status: ProjectStatus;
  statusNote: string;
  imgKey: "humanoid" | "asimo" | "trackedRobot" | "circuit" | "code" | "lab";
  heroCaption: string;
  year: string;
  marsHero?: boolean;
  overview: string;
  problem: string;
  solution: string;
  technologies: string[];
  hardware: string[];
  software: string[];
  decisions: { title: string; body: string }[];
  diagrams: DiagramKind[];
  diagramSections: {
    title: string;
    kind: DiagramKind;
    caption: string;
  }[];
  currentStatus: string;
  future: string[];
  scope: { implemented: string[]; designed: string[] };
  gallery: { src: string; caption: string; alt: string }[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "red-dual-mode",
    index: "01",
    title: "RED DUAL MODE",
    subtitle: "An AI-powered robotics architecture concept",
    status: "DESIGNED",
    statusNote:
      "Architecture design phase. Nothing on this page has been fabricated or field-tested.",
    imgKey: "circuit",
    heroCaption:
      "Reference imagery — embedded electronics macro (Unsplash). Concept visualization only.",
    year: "STATUS: DESIGN PHASE",
    overview:
      "RED DUAL MODE is a robotics architecture concept for a small autonomous robot built around an ESP32 microcontroller. The core idea: a machine that keeps a basic level of autonomy when completely offline, and unlocks a much richer AI capability set when connected — two operating modes, one modular brain.",
    problem:
      "Small robots that rely purely on cloud AI become useless the moment connectivity drops, while purely offline robots of this size cannot run competitive intelligence. There is no cheap, modular middle ground that gracefully switching between both regimes.",
    solution:
      "A dual-mode runtime layer:  an OFFLINE MODE that handles sensor loops (obstacle handling, line following, LED signaling) entirely on-device, and an ONLINE MODE that streams context to cloud AI services for dialogue, reasoning, and vision. A mode-manager arbitrates the switch automatically based on link quality.",
    technologies: [
      "ESP32 / C++",
      "Python bridge service",
      "AI API integration",
      "Wi-Fi + Bluetooth LE",
      "MQTT-style message bus (planned)",
      "Modular firmware architecture",
    ],
    hardware: [
      "ESP32 development board (proposed)",
      "Ultrasonic distance sensor (proposed)",
      "Line-following sensor array (proposed)",
      "Chassis with DC drive and encoder feedback (proposed)",
      "Onboard power regulation module (proposed)",
    ],
    software: [
      "Firmware: dual-mode state machine (designed)",
      "Mode manager with link-quality arbitration (designed)",
      "Python companion service for AI calls (sketched)",
      "JSON-based command/message schema (drafted)",
    ],
    decisions: [
      {
        title: "Why ESP32",
        body: "Integrated Wi-Fi + BLE at low cost and with a large maker ecosystem makes it the natural controller for a dual-connectivity experiment.",
      },
      {
        title: "Why a mode manager instead of hard failover",
        body: "Abruptly switching modes destabilized the state draft on paper; a managed transition with a degraded-but-defined offline behavior keeps the robot predictable.",
      },
      {
        title: "Why modular message schema",
        body: "Keeping firmware modules and the AI service decoupled through a typed message schema means either side can be replaced without redesign.",
      },
    ],
    diagrams: ["hardware", "communication", "flow"],
    diagramSections: [
      {
        title: "Hardware Architecture",
        kind: "hardware",
        caption:
          "Proposed component topology — designed, not yet fabricated.",
      },
      {
        title: "Communication Architecture",
        kind: "communication",
        caption:
          "Dual-path connectivity: on-device bus and cloud AI channel.",
      },
      {
        title: "System Flow",
        kind: "flow",
        caption:
          "Runtime decision loop: mode arbitration and degraded-mode handling.",
      },
    ],
    currentStatus:
      "Architecture documents and component studies are complete. Prototype fabrication has not started. Simulations of the offline sensor loop exist at the concept level.",
    future: [
      "Fabricate a first prototype on standard modules (no custom PCB yet)",
      "Implement and test the offline sensor loop on real hardware",
      "Build the Python AI bridge with strict timeouts",
      "Add a battery + power supervision layer",
      "Document failed transitions and edge cases honestly in this log",
    ],
    scope: {
      implemented: [
        "Component selection research",
        "Message schema draft",
        "State machine paper design",
      ],
      designed: [
        "Dual-mode arbitration logic",
        "Hardware topology",
        "Communication paths",
        "Power concept",
      ],
    },
    gallery: [],
    featured: true,
  },
  {
    slug: "ai-robotics",
    index: "02",
    title: "AI ROBOTICS",
    subtitle: "Experimental AI-powered robotics project",
    status: "PROTOTYPE / IN DEVELOPMENT",
    statusNote:
      "Early experiments with Python, AI APIs, and hardware/software communication.",
    imgKey: "code",
    heroCaption: "Reference imagery — source code (Unsplash). Concept visualization only.",
    year: "STATUS: EXPERIMENT",
    overview:
      "AI ROBOTICS is an ongoing experimental project exploring what happens when a conventional robot program is given an AI brain: natural language intent, reasoning, and context awareness delivered through AI APIs and forwarded to hardware-level actions.",
    problem:
      "Textbook robotics programs execute fixed routines. The experiment asks: can a low-cost setup translate unstructured human intent (quoted natural language) into concrete actuator commands, safely and within latency limits?",
    solution:
      "A Python bridge: it captures user intent, structures it into an action prompt for an AI API, validates the returned plan against a hard-coded allowlist of safe actions, then forwards the plan over serial/Wi-Fi to the controller.",
    technologies: [
      "Python",
      "AI API integration",
      "Serial / WebSocket communication",
      "JSON action schema",
    ],
    hardware: [
      "ESP32 / microcontroller target (reference)",
      "LED + sensor test rig (reference)",
    ],
    software: [
      "Python intent bridge",
      "Action allowlist validator",
      "Controller-side command interpreter",
    ],
    decisions: [
      {
        title: "Validation before actuation",
        body: "AI output is never executed directly. A deterministic allowlist guards the hardware boundary.",
      },
      {
        title: "Latency-first prompt design",
        body: "Short structured prompts with an explicit action grammar keep round-trips predictable.",
      },
    ],
    diagrams: ["flow"],
    diagramSections: [
      {
        title: "System Architecture",
        kind: "flow",
        caption: "Intent → AI API → validated plan → hardware action.",
      },
    ],
    currentStatus:
      "Working communication sketches and prompt format studies. Interaction quality and edge-case handling are not production-validated.",
    future: [
      "Richer action grammar",
      "Voice input experiments",
      "State memory across interactions",
    ],
    scope: {
      implemented: ["Communication sketches", "Prompt grammar draft"],
      designed: ["Validation layer", "Full interaction loop"],
    },
    gallery: [],
  },
  {
    slug: "esp32-experiments",
    index: "03",
    title: "ESP32 EXPERIMENTS",
    subtitle: "A collection of embedded systems experiments",
    status: "EXPERIMENTS COMPLETE",
    statusNote:
      "Breadboard-level experiments and Wokwi simulations — documentation in progress.",
    imgKey: "circuit",
    heroCaption: "Reference imagery — PCB macro (Unsplash / A. Debiève). Concept visualization only.",
    year: "STATUS: ONGOING",
    overview:
      "A growing lab notebook of ESP32 experiments: reading temperature sensors, driving LEDs, counting events with sensors, and validating every circuit in Wokwi simulations before touching physical hardware.",
    problem:
      "Embedded skills decay without deliberate practice, and jumping to physical hardware without simulation wastes components and time. The fix: a structured experiment series — simulate, wire, verify, document.",
    solution:
      "Each experiment follows the same protocol: define the goal, simulate in Wokwi, wire the breadboard, run firmware, record observed behavior and limitations.",
    technologies: [
      "ESP32",
      "C++ / Arduino framework",
      "Wokwi simulator",
      "I²C sensors",
      "GPIO / interrupts",
    ],
    hardware: [
      "ESP32 dev board",
      "Temperature & humidity sensor",
      "LEDs, resistors, breadboard wiring",
      "Passive IR / counter sensor",
    ],
    software: [
      "Sensor-read firmware",
      "Debounced interrupt counters",
      "LED state patterns & PWM",
    ],
    decisions: [
      {
        title: "Simulate first",
        body: "Wokwi catches wiring logic errors cheaply; physical wiring is reserved for validated designs.",
      },
      {
        title: "One experiment, one commit",
        body: "Each experiment is versioned separately so regressions are traceable.",
      },
    ],
    diagrams: ["generic"],
    diagramSections: [
      {
        title: "Experiment Protocol",
        kind: "generic",
        caption: "Simulation → wiring → firmware → verification loop.",
      },
    ],
    currentStatus:
      "Core experiments functional at breadboard level. Wokwi sims accompany each. Organized write-ups are being published progressively.",
    future: [
      "DHT22 logging to serial dashboard",
      "Web dashboard served from ESP32",
      "Low-power deep-sleep experiments",
    ],
    scope: {
      implemented: [
        "Temperature monitoring",
        "LED control",
        "Sensor counter",
        "Wokwi simulations",
      ],
      designed: ["Dashboard", "Low-power mode"],
    },
    gallery: [],
  },
  {
    slug: "missionforge",
    index: "04",
    title: "MISSIONFORGE",
    subtitle:
      "A space mission design game concept — NASA Space Apps participation",
    status: "CONCEPT",
    statusNote:
      "A game concept and design challenge submission. This is NOT a real space mission, a simulator product, or a deployed system.",
    imgKey: "lab",
    marsHero: true,
    heroCaption:
      "Live 3D concept render — Mars rover scene. GAME CONCEPT, not a real mission.",
    year: "STATUS: CONCEPT — NASA SPACE APPS",
    overview:
      "MISSIONFORGE is a game concept where players become mission architects: budgeting, designing, and operating a Mars surface mission. Built for the NASA Space Apps Challenge as a design exploration of engineering trade-offs in space mission planning.",
    problem:
      "Public-facing space apps rarely expose the actual engineering tension — every gram, watt, and watt-second of a real mission design competes with every other. How can a game teach that tension honestly?",
    solution:
      "A decision-driven game loop: players design the rover within mass/power budgets, choose instruments, then operate it across a simulated Mars region where every engineering choice already made shows up as an operational constraint during play.",
    technologies: [
      "Game design",
      "Simulation logic",
      "Mission budgeting systems",
      "Scientific data visualization",
    ],
    hardware: ["Not applicable — pure game concept"],
    software: [
      "Mission editor (concept)",
      "Rover operations sim (concept)",
      "Telemetry & science UI (concept)",
    ],
    decisions: [
      {
        title: "Trade-offs over spectacle",
        body: "Every upgrade costs something — mass, power, or redundancy. The fun IS the budget.",
      },
      {
        title: "Honest science",
        body: "Instrument behavior modeled on published mission literature (concept-level).",
      },
    ],
    diagrams: ["generic"],
    diagramSections: [
      {
        title: "Game Loop Architecture",
        kind: "generic",
        caption: "Design → budget → operate → learn → iterate.",
      },
    ],
    currentStatus:
      "Concept, mechanics paper, and interface sketches. Submitted for NASA Space Apps participation. No game engine build exists.",
    future: [
      "Playable vertical slice of the operations loop",
      "Instrument science mini-mechanics",
      "Cooperative mission control mode",
    ],
    scope: {
      implemented: ["Concept", "Mechanics paper", "Interface sketches"],
      designed: ["Game engine implementation", "Mars terrain sim"],
    },
    gallery: [],
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
