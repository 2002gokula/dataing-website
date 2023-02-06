import { CubeCamera, OrbitControls, OrthographicCamera, PerspectiveCamera, Preload } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useRef, forwardRef, MutableRefObject, ReactNode, ForwardRefExoticComponent, RefAttributes } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useEffect } from "react";
import { degToRad } from "three/src/math/MathUtils";
import Router, { useRouter } from 'next/router';

const ModelAvatar = ({ ...props }) => {
  const ref = useRef();
  const orbitControls = useRef();

  return (
    <div ref={ref} className=" h-full w-full">
      <Canvas className="pointer-events-none" eventSource={ref} eventPrefix="client" flat>
        <PerspectiveCamera makeDefault  position={[0, 0, 0.42]} />
        <directionalLight intensity={0.8} />
        <ambientLight intensity={0.75} />
        <GlbComponent
        />
        <Preload all />
        <OrbitControls ref={orbitControls} />
      </Canvas>
    </div>
  );
};

const GlbComponent = () => {
  const preamble = useLoader(GLTFLoader, localStorage.getItem("avatarUrl") ?? "https://models.readyplayer.me/63dfc01d5dd77ccae17921cc.glb");
  const { camera } = useThree();
  const { router } = useRouter();

  useEffect(() => {
    if(preamble.scene == null) {
        router.push("/avatar");
        return;
    };
    camera.position.set(0, 0, 0.45);
    camera.rotation.set(degToRad(-30), degToRad(0), 0);
  }, []);

  return (
    <>
      <group
        position={[0, -0.6, 0]}
        // rotation={[0, Math.PI / 2, 0]}
        // onClick={() => setIsAnimated(!isAnimated)}
      >
        <primitive object={preamble.scene} />
      </group>
    </>
  );
};

export default ModelAvatar;
