import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

/** Offline-safe studio environment (generated locally, no HDR fetch). */
export function LabEnvironment({ intensity = 1 }: { intensity?: number }) {
  return (
    <Environment resolution={128}>
      <Lightformer
        form="rect"
        intensity={2.2 * intensity}
        color="#dde5ec"
        position={[0, 5, -6]}
        scale={[10, 4, 1]}
      />
      <Lightformer
        form="rect"
        intensity={1.6 * intensity}
        color="#FF4D24"
        position={[-5, 2, 2]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[6, 2, 1]}
      />
      <Lightformer
        form="rect"
        intensity={1.2 * intensity}
        color="#57D7E8"
        position={[5, 1, 3]}
        rotation={[0, -Math.PI / 2.4, 0]}
        scale={[4, 2, 1]}
      />
      <Lightformer
        form="circle"
        intensity={1.4 * intensity}
        color="#ffffff"
        position={[0, 6, 2]}
        scale={[3, 3, 1]}
      />
    </Environment>
  );
}

/** Pointer-following light. */
export function MouseLight({
  color = "#FF4D24",
  intensity = 26,
}: {
  color?: string;
  intensity?: number;
}) {
  const ref = useRef<THREE.PointLight>(null);
  const { viewport, pointer } = useThree();
  useFrame(() => {
    if (!ref.current) return;
    const x = pointer.x * viewport.width * 0.5;
    const y = pointer.y * viewport.height * 0.5;
    ref.current.position.x +=
      (x * 0.6 - ref.current.position.x) * 0.06;
    ref.current.position.y +=
      (y * 0.6 + 1.5 - ref.current.position.y) * 0.06;
  });
  return (
    <pointLight
      ref={ref}
      color={color}
      intensity={intensity}
      distance={16}
      position={[2, 2, 3]}
    />
  );
}

export function Particles({
  count = 260,
  area = [12, 8, 10],
  color = "#57D7E8",
  size = 0.035,
}: {
  count?: number;
  area?: [number, number, number];
  color?: string;
  size?: number;
}) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * area[0];
      arr[i * 3 + 1] = (Math.random() - 0.5) * area[1];
      arr[i * 3 + 2] = (Math.random() - 0.5) * area[2];
    }
    return arr;
  }, [count, area]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.y = t * 0.02;
    ref.current.position.y = Math.sin(t * 0.25) * 0.25;
  });

  const mat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color,
        size,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [color, size]
  );

  return (
    <points ref={ref} material={mat}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
    </points>
  );
}

/** Vertical scanning ring that sweeps the robot. */
export function ScanRing({
  radius = 2.4,
  speed = 0.35,
  height = 3.2,
}: {
  radius?: number;
  speed?: number;
  height?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const y = ((clock.elapsedTime * speed) % 1) * height - height * 0.25;
    ref.current.position.y = y;
    const m = (ref.current.material as THREE.MeshBasicMaterial);
    const fade = 1 - Math.abs(y) / (height * 0.8);
    m.opacity = Math.max(0, fade) * 0.6;
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.012, 8, 72]} />
      <meshBasicMaterial color="#57D7E8" transparent opacity={0.4} />
    </mesh>
  );
}

export function Floor() {
  return (
    <>
      <mesh
        position={[0, -1.12, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[9, 48]} />
        <meshStandardMaterial color="#0c1015" metalness={0.4} roughness={0.85} />
      </mesh>
      <ContactShadows
        position={[0, -1.1, 0]}
        opacity={0.7}
        scale={10}
        blur={2.4}
        far={4}
        color="#000000"
      />
    </>
  );
}

/** Slow camera drift + pointer parallax rig. */
export function CameraRig({
  base = [0, 0.9, 6.4],
  tilt = 0.18,
}: {
  base?: [number, number, number];
  tilt?: number;
}) {
  const { camera, pointer } = useThree();
  const target = useMemo(() => new THREE.Vector3(...base), []);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    camera.position.x += (pointer.x * 1.1 - camera.position.x) * 0.03;
    camera.position.y +=
      (base[1] + pointer.y * 0.5 + Math.sin(t * 0.3) * 0.12 - camera.position.y) * 0.03;
    camera.position.z +=
      (base[2] + Math.sin(t * 0.18) * 0.25 - camera.position.z) * 0.03;
    camera.lookAt(target.x + pointer.x * tilt * 0.4, target.y * 0.8, 0);
  });
  return null;
}
