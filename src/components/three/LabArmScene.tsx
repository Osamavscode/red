import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { RobotArm } from "./RobotArm";
import {
  LabEnvironment,
  MouseLight,
  Particles,
  ScanRing,
  Floor,
} from "./Common";
import type { ArmAngles } from "./RobotArm";

export default function LabArmScene({
  angles,
  idle,
  selected,
  onSelectPart,
}: {
  angles: ArmAngles;
  idle: boolean;
  selected: string | null;
  onSelectPart: (id: string) => void;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      gl={{ antialias: true }}
      camera={{ position: [3.6, 2.6, 4.8], fov: 40 }}
    >
      <color attach="background" args={["#0a0e13"]} />
      <fog attach="fog" args={["#0a0e13", 10, 24]} />
      <ambientLight intensity={0.28} />
      <spotLight
        position={[5, 8, 4]}
        angle={0.55}
        penumbra={0.9}
        intensity={130}
        color="#dde5ec"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-5, 2, -3]} intensity={32} color="#FF4D24" />
      <MouseLight />
      <LabEnvironment />
      <RobotArm
        angles={angles}
        idle={idle}
        selected={selected}
        onSelectPart={onSelectPart}
      />
      <ScanRing radius={2.6} height={3.6} speed={0.28} />
      <Particles count={160} area={[10, 6, 8]} size={0.03} />
      <Floor />
      <OrbitControls
        enablePan={false}
        minDistance={3.5}
        maxDistance={10}
        maxPolarAngle={Math.PI / 1.9}
        target={[0, 0.6, 0]}
      />
    </Canvas>
  );
}
