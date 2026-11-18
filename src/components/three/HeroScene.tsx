import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  RobotArm,
  DEFAULT_ANGLES,
} from "./RobotArm";
import {
  LabEnvironment,
  MouseLight,
  Particles,
  ScanRing,
  Floor,
  CameraRig,
} from "./Common";

export default function HeroScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.9, 6.4], fov: 38 }}
      className="!absolute inset-0"
    >
      <color attach="background" args={["#080a0d"]} />
      <fog attach="fog" args={["#080a0d", 8, 22]} />

      <ambientLight intensity={0.25} />
      <spotLight
        position={[6, 8, 4]}
        angle={0.5}
        penumbra={0.9}
        intensity={140}
        color="#dde5ec"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-5, 2, -3]} intensity={40} color="#FF4D24" />
      <pointLight position={[4, 1, -4]} intensity={26} color="#57D7E8" />
      <MouseLight />
      <CameraRig />

      <Suspense fallback={null}>
        <LabEnvironment />
        <group position={[1.6, 0, 0]}>
          <RobotArm angles={DEFAULT_ANGLES} idle />
          <ScanRing radius={2.2} height={3.4} />
        </group>
        <Particles count={260} />
        <Floor />
      </Suspense>
    </Canvas>
  );
}
