import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const ROBOT_PARTS = [
  {
    id: "base",
    name: "BASE PLATFORM",
    spec: "Mounting plate",
    desc: "Rigid foundation anchoring the arm to the workbench. In the proposed RED DUAL MODE robot this would host power regulation and the mode-manager controller.",
  },
  {
    id: "turret",
    name: "TURRET — YAW JOINT (J1)",
    spec: "±180° rotation",
    desc: "Rotates the whole arm horizontally around its vertical axis, letting the end effector cover a work area without moving the base.",
  },
  {
    id: "shoulder",
    name: "SHOULDER — PITCH JOINT (J2)",
    spec: "Main lift axis",
    desc: "Heavy-duty pivot that raises and lowers the boom. Carries the torque load of everything above it, so its gearbox and bearings dominate the mechanical design.",
  },
  {
    id: "elbow",
    name: "ELBOW — PITCH JOINT (J3)",
    spec: "Reach extension",
    desc: "Second pitch axis. Combined with the shoulder it forms a 2-link planar arm — the geometry that defines the robot's reach envelope.",
  },
  {
    id: "wrist",
    name: "WRIST — PITCH JOINT (J4)",
    spec: "Orientation",
    desc: "Orients the end effector and compensates for payload angle so the gripper approaches parts from the intended direction.",
  },
  {
    id: "gripper",
    name: "END EFFECTOR / GRIPPER",
    spec: "Parallel jaws",
    desc: "Actuated two-finger gripper. In the the concept this is where a small camera or proximity sensor would add feedback for pick-and-place tasks.",
  },
] as const;

export type ArmAngles = {
  turret: number;
  shoulder: number;
  elbow: number;
  wrist: number;
  gripper: number;
};

export const DEFAULT_ANGLES: ArmAngles = {
  turret: 0,
  shoulder: 0.5,
  elbow: 0.9,
  wrist: -0.4,
  gripper: 0.35,
};

const bodyMat = new THREE.MeshStandardMaterial({
  color: "#242c38",
  metalness: 0.85,
  roughness: 0.38,
});
const steelMat = new THREE.MeshStandardMaterial({
  color: "#39434f",
  metalness: 0.9,
  roughness: 0.3,
});
const darkMat = new THREE.MeshStandardMaterial({
  color: "#12181f",
  metalness: 0.6,
  roughness: 0.55,
});
const accentMat = new THREE.MeshStandardMaterial({
  color: "#FF4D24",
  emissive: "#FF4D24",
  emissiveIntensity: 1.4,
  metalness: 0.2,
  roughness: 0.4,
});

function AccentRing({
  radius,
  position,
  rotation,
}: {
  radius: number;
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <mesh position={position} rotation={rotation} material={accentMat}>
      <torusGeometry args={[radius, 0.015, 8, 40]} />
    </mesh>
  );
}

function Bolt({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} material={steelMat}>
      <cylinderGeometry args={[0.03, 0.03, 0.05, 6]} />
    </mesh>
  );
}

export function RobotArm({
  angles = DEFAULT_ANGLES,
  idle = true,
  selected,
  onSelectPart,
}: {
  angles?: ArmAngles;
  idle?: boolean;
  selected?: string | null;
  onSelectPart?: (id: string) => void;
}) {
  const turretRef = useRef<THREE.Group>(null);
  const shoulderRef = useRef<THREE.Group>(null);
  const elbowRef = useRef<THREE.Group>(null);
  const wristRef = useRef<THREE.Group>(null);
  const fingerL = useRef<THREE.Mesh>(null);
  const fingerR = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = idle ? clock.elapsedTime : 0;
    const breathe = idle ? Math.sin(t * 0.6) * 0.06 : 0;
    if (turretRef.current)
      turretRef.current.rotation.y = THREE.MathUtils.lerp(
        turretRef.current.rotation.y,
        angles.turret + (idle ? Math.sin(t * 0.25) * 0.35 : 0),
        0.12
      );
    if (shoulderRef.current)
      shoulderRef.current.rotation.z = THREE.MathUtils.lerp(
        shoulderRef.current.rotation.z,
        angles.shoulder + (idle ? Math.sin(t * 0.4) * 0.12 : 0) + breathe,
        0.12
      );
    if (elbowRef.current)
      elbowRef.current.rotation.z = THREE.MathUtils.lerp(
        elbowRef.current.rotation.z,
        angles.elbow + (idle ? Math.sin(t * 0.55 + 1) * 0.18 : 0),
        0.12
      );
    if (wristRef.current)
      wristRef.current.rotation.z = THREE.MathUtils.lerp(
        wristRef.current.rotation.z,
        angles.wrist + (idle ? Math.sin(t * 0.7 + 2) * 0.22 : 0),
        0.12
      );
    if (fingerL.current)
      fingerL.current.position.x = -0.11 - angles.gripper * 0.12;
    if (fingerR.current)
      fingerR.current.position.x = 0.11 + angles.gripper * 0.12;
  });

  const selectHandler = (id: string) => (e: { stopPropagation: () => void }) => {
    if (onSelectPart) {
      e.stopPropagation();
      onSelectPart(id);
    }
  };

  const haloMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#FF773D",
        transparent: true,
        opacity: 0.22,
      }),
    []
  );

  const partHalo = (id: string, elem: React.ReactNode, extraProps?: object) => (
    <group
      onClick={selectHandler(id)}
      onPointerOver={() => onSelectPart && (document.body.style.cursor = "pointer")}
      onPointerOut={() => onSelectPart && (document.body.style.cursor = "auto")}
      {...extraProps}
    >
      {selected === id && (
        <mesh material={haloMat} scale={1.05}>
          <sphereGeometry args={[0.5, 12, 12]} />
        </mesh>
      )}
      {elem}
    </group>
  );

  return (
    <group position={[0, -1.1, 0]} scale={1.08}>
      {/* BASE */}
      <group>
        <mesh position={[0, 0.07, 0]} material={darkMat} castShadow receiveShadow>
          <cylinderGeometry args={[1.05, 1.15, 0.14, 40]} />
        </mesh>
        <mesh position={[0, 0.16, 0]} material={bodyMat} castShadow>
          <cylinderGeometry args={[0.85, 0.85, 0.06, 40]} />
        </mesh>
        {[-0.6, 0, 0.6].map((x) =>
          [-0.6, 0.6].map((z) => (
            <Bolt key={`${x}-${z}`} position={[x, 0.05, z]} />
          ))
        )}
        <AccentRing radius={0.94} position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]} />
      </group>

      {/* TURRET */}
      {partHalo(
        "turret",
        <group ref={turretRef} position={[0, 0.2, 0]}>
          <mesh position={[0, 0.3, 0]} material={bodyMat} castShadow receiveShadow>
            <cylinderGeometry args={[0.62, 0.7, 0.6, 28]} />
          </mesh>
          <mesh position={[0, 0.62, 0]} material={steelMat} castShadow>
            <cylinderGeometry args={[0.4, 0.5, 0.14, 28]} />
          </mesh>
          <AccentRing radius={0.66} position={[0, 0.32, 0]} rotation={[Math.PI / 2, 0, 0]} />
        </group>
      )}

      {/* SHOULDER + BOOM */}
      {partHalo(
        "shoulder",
        <group ref={shoulderRef} position={[0, 0.85, 0]}>
          <mesh material={steelMat} castShadow>
            <sphereGeometry args={[0.21, 20, 20]} />
          </mesh>
          <mesh position={[0, -0.12, 0.3]} material={darkMat} castShadow>
            <boxGeometry args={[0.34, 0.42, 0.34]} />
          </mesh>
          <mesh position={[0, 0.85, 0]} material={bodyMat} castShadow>
            <boxGeometry args={[0.3, 1.7, 0.34]} />
          </mesh>
          <mesh position={[0.17, 0.85, 0]} material={steelMat} castShadow>
            <boxGeometry args={[0.05, 1.4, 0.24]} />
          </mesh>
          <mesh position={[-0.17, 0.85, 0]} material={steelMat} castShadow>
            <boxGeometry args={[0.05, 1.4, 0.24]} />
          </mesh>
          <AccentRing radius={0.3} position={[0, 1.15, 0]} rotation={[Math.PI / 2, 0, 0]} />
          {/* ELBOW */}
          <group ref={elbowRef} position={[0, 1.7, 0]}>
            <mesh material={steelMat} castShadow>
              <sphereGeometry args={[0.17, 20, 20]} />
            </mesh>
            <mesh position={[0, 0.62, 0]} material={bodyMat} castShadow>
              <boxGeometry args={[0.24, 1.3, 0.24]} />
            </mesh>
            <mesh position={[0, 0.1, 0.17]} material={darkMat} castShadow>
              <boxGeometry args={[0.18, 0.3, 0.08]} />
            </mesh>
            <AccentRing radius={0.24} position={[0, 0.75, 0]} rotation={[Math.PI / 2, 0, 0]} />
            {/* WRIST */}
            <group ref={wristRef} position={[0, 1.28, 0]}>
              <mesh material={steelMat} castShadow>
                <cylinderGeometry args={[0.11, 0.13, 0.24, 18]} />
              </mesh>
              {partHalo(
                "gripper",
                <group position={[0, 0.35, 0]}>
                  <mesh material={bodyMat} castShadow>
                    <boxGeometry args={[0.3, 0.24, 0.22]} />
                  </mesh>
                  <mesh ref={fingerL} position={[-0.13, -0.16, 0]} material={steelMat} castShadow>
                    <boxGeometry args={[0.07, 0.4, 0.14]} />
                  </mesh>
                  <mesh ref={fingerR} position={[0.13, -0.16, 0]} material={steelMat} castShadow>
                    <boxGeometry args={[0.07, 0.4, 0.14]} />
                  </mesh>
                  <mesh position={[0, 0.13, 0]} material={accentMat}>
                    <boxGeometry args={[0.32, 0.02, 0.02]} />
                  </mesh>
                </group>
              )}
            </group>
          </group>
        </group>
      )}

      {/* BASE select halo */}
      <group onClick={selectHandler("base")}>
        {selected === "base" && (
          <mesh material={haloMat}>
            <cylinderGeometry args={[1.2, 1.2, 0.3, 40]} />
          </mesh>
        )}
        <mesh position={[0, 0.2, 0]} material={darkMat}>
          <cylinderGeometry args={[0.5, 0.5, 0.04, 28]} />
        </mesh>
      </group>
    </group>
  );
}
