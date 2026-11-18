import { useMemo, useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import {
  LabEnvironment,
  Particles,
} from "./Common";

/* ---------------------------------- PC BOARD TEXTURE ---------------------------------- */

function makeBoardTexture() {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 128;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#0E4A2F";
  ctx.fillRect(0, 0, 256, 128);
  ctx.strokeStyle = "#7B8794";
  ctx.lineWidth = 1;
  for (let i = 0; i < 40; i++) {
    ctx.beginPath();
    let x = Math.random() * 256;
    let y = Math.random() * 128;
    ctx.moveTo(x, y);
    for (let s = 0; s < 3; s++) {
      x += (Math.random() - 0.5) * 60;
      y += (Math.random() - 0.5) * 40;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.fillStyle = "rgba(255,215,120,0.8)";
  for (let i = 0; i < 60; i++) {
    ctx.fillRect(Math.random() * 250, Math.random() * 120, 2, 2);
  }
  const tex = new THREE.CanvasTexture(c);
  return tex;
}

/* ---------------------------------- ELECTRONICS WORKBENCH ---------------------------------- */

const COMPONENT_INFO: Record<
  string,
  { name: string; desc: string; role: string }
> = {
  esp32: {
    name: "ESP32 DEV BOARD",
    role: "Wi-Fi + BLE microcontroller",
    desc: "Dual-core 240 MHz MCU with integrated Wi-Fi and Bluetooth — the primary controller candidate for the RED DUAL MODE concept.",
  },
  breadboard: {
    name: "BREADBOARD",
    role: "Solderless prototyping",
    desc: "Standard 830-point solderless board. Every experiment in the ESP32 series is simulated in Wokwi before being wired here.",
  },
  led: {
    name: "INDICATOR LEDs",
    role: "Status signaling",
    desc: "Used for firmware state signaling: LED patterns form the first debugging layer before serial consoles are attached.",
  },
  servo: {
    name: "MICRO SERVO",
    role: "Actuator",
    desc: "SG90-class hobby servo. One PWM channel gives an arm joint or sensor mount its first motion in early prototypes.",
  },
  sensor: {
    name: "TEMPERATURE SENSOR",
    role: "Environmental input",
    desc: "The classic first sensor: temperature monitoring demonstrated in the ESP32 experiments with I²C or 1-wire style readouts.",
  },
};

function EmissivePulse({
  color,
  position,
  speed = 1.6,
}: {
  color: string;
  position: [number, number, number];
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const emissive = useMemo(() => new THREE.Color(color), [color]);
  useFrame(({ clock }) => {
    const m = ref.current?.material as THREE.MeshStandardMaterial | undefined;
    if (m) m.emissiveIntensity = 0.4 + (Math.sin(clock.elapsedTime * speed) + 1) * 1.4;
  });
  return (
    <mesh ref={ref} position={position}>
      <cylinderGeometry args={[0.035, 0.035, 0.06, 16]} />
      <meshStandardMaterial
        color={emissive}
        emissive={emissive}
        emissiveIntensity={0.6}
      />
    </mesh>
  );
}

function Wire({
  from,
  to,
  color,
  arc = 0.5,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
  arc?: number;
}) {
  const geom = useMemo(() => {
    const mid = [
      (from[0] + to[0]) / 2,
      Math.max(from[1], to[1]) + arc,
      (from[2] + to[2]) / 2,
    ];
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...from),
      new THREE.Vector3(...(mid as [number, number, number])),
      new THREE.Vector3(...to)
    );
    return new THREE.TubeGeometry(curve, 20, 0.014, 8, false);
  }, [from, to, arc]);
  return (
    <mesh geometry={geom}>
      <meshStandardMaterial color={color} roughness={0.7} />
    </mesh>
  );
}

function BenchItem({
  id,
  selected,
  onSelect,
  children,
  bounding = 0.6,
}: {
  id: string;
  selected: string | null;
  onSelect: (id: string) => void;
  children: React.ReactNode;
  bounding?: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {children}
      {(hovered || selected === id) && (
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[bounding, 0.005, bounding * 0.8]} />
          <meshBasicMaterial color={selected === id ? "#FF4D24" : "#57D7E8"} transparent opacity={0.85} />
        </mesh>
      )}
    </group>
  );
}

function WorkbenchContents({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  const boardTex = useMemo(() => makeBoardTexture(), []);
  const holeTex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#E8E4D8";
    ctx.fillRect(0, 0, 128, 128);
    ctx.fillStyle = "#b9b4a6";
    for (let x = 4; x < 128; x += 8)
      for (let y = 4; y < 128; y += 8) {
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    return new THREE.CanvasTexture(c);
  }, []);

  return (
    <group position={[0, -0.6, 0]}>
      {/* table */}
      <mesh position={[0, -0.06, 0]} receiveShadow>
        <boxGeometry args={[6.4, 0.12, 4]} />
        <meshStandardMaterial color="#1a222c" metalness={0.35} roughness={0.7} />
      </mesh>
      <mesh position={[0, -0.125, 0]} receiveShadow>
        <boxGeometry args={[6.6, 0.03, 4.2]} />
        <meshStandardMaterial color="#0e1319" roughness={0.9} />
      </mesh>

      {/* BREADBOARD */}
      <BenchItem id="breadboard" selected={selected} onSelect={onSelect} bounding={2.4}>
        <mesh position={[-0.5, 0.03, 0.3]} castShadow receiveShadow>
          <boxGeometry args={[2.3, 0.06, 1.4]} />
          <meshStandardMaterial map={holeTex} />
        </mesh>
      </BenchItem>

      {/* ESP32 on breadboard */}
      <BenchItem id="esp32" selected={selected} onSelect={onSelect} bounding={1}>
        <group position={[-0.5, 0.09, 0.1]}>
          <mesh castShadow>
            <boxGeometry args={[1.15, 0.035, 0.62]} />
            <meshStandardMaterial map={boardTex} metalness={0.2} roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.055, 0]} castShadow>
            <boxGeometry args={[0.42, 0.07, 0.42]} />
            <meshStandardMaterial color="#151515" metalness={0.7} roughness={0.35} />
          </mesh>
          {/* pins */}
          {Array.from({ length: 10 }).map((_, i) => (
            <mesh key={`l${i}`} position={[-0.52 + i * 0.11, 0.015, -0.24]}>
              <boxGeometry args={[0.03, 0.12, 0.03]} />
              <meshStandardMaterial color="#d8b504" metalness={0.9} roughness={0.3} />
            </mesh>
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <mesh key={`r${i}`} position={[-0.52 + i * 0.11, 0.015, 0.24]}>
              <boxGeometry args={[0.03, 0.12, 0.03]} />
              <meshStandardMaterial color="#d8b504" metalness={0.9} roughness={0.3} />
            </mesh>
          ))}
          <mesh position={[0.44, 0.04, 0]} castShadow>
            <boxGeometry args={[0.18, 0.04, 0.14]} />
            <meshStandardMaterial color="#9aa4ad" metalness={0.9} roughness={0.25} />
          </mesh>
        </group>
      </BenchItem>

      {/* LEDs */}
      <BenchItem id="led" selected={selected} onSelect={onSelect} bounding={0.5}>
        <group position={[0.55, 0.075, 0.55]}>
          <EmissivePulse color="#FF3B30" position={[-0.06, 0, 0]} />
          <EmissivePulse color="#3AF03A" position={[0.06, 0, 0]} speed={2.3} />
        </group>
      </BenchItem>

      {/* SERVO */}
      <BenchItem id="servo" selected={selected} onSelect={onSelect} bounding={0.6}>
        <group position={[0.6, 0.09, -0.35]}>
          <mesh castShadow>
            <boxGeometry args={[0.42, 0.2, 0.3]} />
            <meshStandardMaterial color="#1D5BAC" metalness={0.4} roughness={0.4} />
          </mesh>
          <mesh position={[0.03, 0.16, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.1, 20]} />
            <meshStandardMaterial color="#274a80" metalness={0.5} roughness={0.4} />
          </mesh>
          <ServoHorn />
        </group>
      </BenchItem>

      {/* TEMP SENSOR */}
      <BenchItem id="sensor" selected={selected} onSelect={onSelect} bounding={0.5}>
        <group position={[-1.5, 0.09, -0.4]}>
          <mesh castShadow>
            <boxGeometry args={[0.4, 0.035, 0.3]} />
            <meshStandardMaterial color="#0E4A2F" metalness={0.2} roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.12, 0]} castShadow>
            <cylinderGeometry args={[0.07, 0.07, 0.2, 16]} />
            <meshStandardMaterial color="#2c3540" metalness={0.4} roughness={0.5} />
          </mesh>
        </group>
      </BenchItem>

      {/* WIRES */}
      <Wire from={[-1.05, 0.08, 0.12]} to={[0.42, 0.08, 0.44]} color="#FF4D24" />
      <Wire from={[0.2, 0.08, 0.55]} to={[0.5, 0.08, 0.55]} color="#3AF03A" arc={0.25} />
      <Wire from={[0.55, 0.08, -0.2]} to={[0.62, 0.08, -0.2]} color="#3B7BFF" arc={0.35} />
      <Wire from={[-1.4, 0.08, -0.25]} to={[-1.05, 0.08, 0.2]} color="#DDE5EC" arc={0.3} />

      <ContactShadows position={[0, 0.01, 0]} opacity={0.55} scale={8} blur={2.2} far={3} />
    </group>
  );
}

function ServoHorn() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current)
      ref.current.rotation.y =
        Math.PI + Math.sin(clock.elapsedTime * 1.1) * 1.1;
  });
  return (
    <mesh ref={ref} position={[0.03, 0.24, 0]} castShadow>
      <boxGeometry args={[0.3, 0.02, 0.06]} />
      <meshStandardMaterial color="#E8E4D8" roughness={0.6} />
    </mesh>
  );
}

export function WorkbenchScene({
  onSelect,
  selected,
}: {
  selected: string | null;
  onSelect: (id: string | null) => void;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      camera={{ position: [2.6, 2.4, 3.4], fov: 42 }}
      onPointerMissed={() => onSelect(null)}
    >
      <color attach="background" args={["#0a0e13"]} />
      <fog attach="fog" args={["#0a0e13", 9, 20]} />
      <ambientLight intensity={0.3} />
      <spotLight position={[4, 6, 3]} intensity={90} angle={0.6} penumbra={0.8} color="#dde5ec" castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-4, 3, -2]} intensity={22} color="#57D7E8" />
      <Suspense fallback={null}>
        <LabEnvironment intensity={0.8} />
        <WorkbenchContents selected={selected} onSelect={onSelect} />
        <Particles count={120} area={[8, 5, 6]} size={0.03} />
      </Suspense>
      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={9}
        maxPolarAngle={Math.PI / 2.1}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}

/* ---------------------------------- MARS ROVER (FUTURE SCENE) ---------------------------------- */

function Rover() {
  const wheelRefs = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (wheelRefs.current) {
      wheelRefs.current.children.forEach((w, i) => {
        w.rotation.x = clock.elapsedTime * 1.2 + i;
      });
    }
  });
  const wheelMat = new THREE.MeshStandardMaterial({
    color: "#2a323d",
    metalness: 0.5,
    roughness: 0.7,
  });
  const bodyMat = new THREE.MeshStandardMaterial({
    color: "#7A7E83",
    metalness: 0.75,
    roughness: 0.45,
  });
  return (
    <group position={[0, -0.4, 0]}>
      <group rotation={[0, -0.5, 0]}>
        <mesh position={[0, 0.5, 0]} material={bodyMat} castShadow>
          <boxGeometry args={[1.7, 0.5, 1.1]} />
        </mesh>
        <mesh position={[0, 0.92, -0.1]} material={bodyMat} castShadow>
          <boxGeometry args={[0.9, 0.3, 0.7]} />
        </mesh>
        {/* camera head */}
        <mesh position={[0, 1.0, 0.22]} castShadow>
          <cylinderGeometry args={[0.14, 0.14, 0.16, 16]} />
          <meshStandardMaterial color="#141a22" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0.18, 1.0, 0.25]}>
          <sphereGeometry args={[0.03, 10, 10]} />
          <meshStandardMaterial emissive="#57D7E8" emissiveIntensity={2.4} color="#57D7E8" />
        </mesh>
        {/* mast */}
        <mesh position={[0.55, 0.95, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.9, 10]} />
          <meshStandardMaterial color="#8d939a" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0.55, 1.42, 0]}>
          <boxGeometry args={[0.26, 0.18, 0.02]} />
          <meshStandardMaterial color="#141a22" metalness={0.5} roughness={0.3} />
        </mesh>
        {/* wheels */}
        <group>
          {[
            [-0.75, 0.28, 0.72],
            [0, 0.28, 0.72],
            [0.75, 0.28, 0.72],
            [-0.75, 0.28, -0.72],
            [0, 0.28, -0.72],
            [0.75, 0.28, -0.72],
          ].map((p, i) => (
            <mesh key={i} position={p as [number, number, number]} material={wheelMat} castShadow>
              <cylinderGeometry args={[0.3, 0.3, 0.24, 18]} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

function MarsTerrain() {
  const geom = useMemo(() => {
    const g = new THREE.PlaneGeometry(26, 26, 64, 64);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      pos.setZ(
        i,
        Math.sin(x * 0.4) * 0.22 + Math.cos(y * 0.35) * 0.25 + (Math.random() - 0.5) * 0.06
      );
    }
    g.computeVertexNormals();
    return g;
  }, []);
  return (
    <mesh geometry={geom} position={[0, -0.9, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <meshStandardMaterial color="#4d2f24" roughness={0.95} metalness={0.05} />
    </mesh>
  );
}

export function MarsScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [3.4, 1.4, 4.6], fov: 42 }}
    >
      <color attach="background" args={["#150b07"]} />
      <fog attach="fog" args={["#150b07", 7, 18]} />
      <ambientLight intensity={0.35} color="#ffb28a" />
      <directionalLight position={[-6, 5, 3]} intensity={3.2} color="#ffd2a8" castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[2, 1, 2]} intensity={12} color="#FF4D24" />
      <Suspense fallback={null}>
        <LabEnvironment intensity={0.35} />
        <Rover />
        <MarsTerrain />
        <Particles count={140} area={[16, 4, 16]} color="#ff9d6b" size={0.03} />
      </Suspense>
    </Canvas>
  );
}
