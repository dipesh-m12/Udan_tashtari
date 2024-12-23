import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Sky } from "@react-three/drei";
import {
  SpotLightHelper,
  PointLightHelper,
  AxesHelper,
  CameraHelper,
} from "three";
import Scene from "./Scene";

function StaticSpotLight() {
  const lightRef = useRef();
  const { scene, camera } = useThree();

  // Add a light helper when the light is rendered
  useEffect(() => {
    if (lightRef.current) {
      const helper = new SpotLightHelper(lightRef.current, "#e60909");
      helper.color = "#70a3fd";
      scene.add(helper);

      // Update light helper position on camera change
      const updateHelper = () => {
        helper.update();
      };
      camera.addEventListener("change", updateHelper);

      return () => {
        scene.remove(helper);
        helper.dispose();
        camera.removeEventListener("change", updateHelper);
      }; // Cleanup helper
    }
  }, [scene, camera]);

  return (
    <spotLight
      ref={lightRef}
      position={[0, 10, 0]} // Fixed position above the scene
      target-position={[0, 0, 0]} // Always point at the center
      angle={Math.PI / 7} // Wider angle for more coverage
      penumbra={0.5}
      intensity={300}
      castShadow
    />
  );
}
//0, 2, 10
function StaticPointLight() {
  const lightRef = useRef();
  const { scene, camera } = useThree();

  // Add a point light helper
  useEffect(() => {
    if (lightRef.current) {
      const helper = new PointLightHelper(lightRef.current, 0.5);
      scene.add(helper);

      // Update light helper position on camera change
      const updateHelper = () => {
        helper.update();
      };
      camera.addEventListener("change", updateHelper);

      return () => {
        scene.remove(helper);
        helper.dispose();
        camera.removeEventListener("change", updateHelper);
      }; // Cleanup helper
    }
  }, [scene, camera]);

  return (
    <pointLight
      ref={lightRef}
      castShadow
      position={[3, 6, 3]} // Fixed position in world space
      intensity={30}
      color="#ffffff"
    />
  );
}

function SceneHelpers() {
  const { scene, camera } = useThree();

  useEffect(() => {
    // Add Axes Helper
    const axesHelper = new AxesHelper(5); // Size of 5 units
    scene.add(axesHelper);

    // Add Camera Helper
    const cameraHelper = new CameraHelper(camera);
    scene.add(cameraHelper);

    return () => {
      scene.remove(axesHelper);
      scene.remove(cameraHelper);
      axesHelper.dispose();
      cameraHelper.dispose();
    };
  }, [scene, camera]);

  return null;
}

function ShadowPlane() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]} // Rotate to lie flat
      position={[0, -2, 0]} // Slightly below the model
      receiveShadow // Key prop to receive shadows
    >
      <planeGeometry args={[20, 20]} /> // Large plane size
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  );
}

function App() {
  // Example of how to control model properties
  const modelProps = {
    position: [0, 0, 0], // X, Y, Z position
    rotation: [0, 0, 0], // Rotation around X, Y, Z axes
    scale: [1, 1, 1], // Scale X, Y, Z
  };

  return (
    <div style={{ height: "100vh" }}>
      <Canvas
        shadows
        style={{ backgroundColor: "#000000" }}
        camera={{ position: [7, 7, 7], fov: 45 }}
      >
        <Suspense fallback={null}>
          <Scene
            position={modelProps.position}
            rotation={modelProps.rotation}
            scale={modelProps.scale}
            castShadow={true}
          />
        </Suspense>

        <ShadowPlane />

        <StaticSpotLight />
        {/* <StaticPointLight /> */}

        <SceneHelpers />
        <OrbitControls
          enableDamping
          enablePan={false}
          minDistance={5}
          maxDistance={20}
          minPolarAngle={0.5}
          maxPolarAngle={1.5}
        />
      </Canvas>
    </div>
  );
}

export default App;
// apartment, city, dawn, forest, lobby,
// night, park, studio, sunset, warehouse

// - "sunset"
// - "dawn"
// - "night"
// - "warehouse"
// - "forest"
// - "apartment"
// - "studio"
// - "city"
// - "park"
// - "lobby"

{
  /* <Environment preset="warehouse" backgroundRotation={20} background /> */
}
{
  /* <Sky
          sunPosition={[10, 10, 100]} // Sun position
          turbidity={8} // Atmospheric haziness
          rayleigh={3} // Light scattered by atmosphere
          mieCoefficient={0.005} // Mie scattering
          mieDirectionalG={0.7} // Scattering direction
          inclination={0.49} // Sun's height
          azimuth={0.25} // Sun's horizontal rotation
        /> */
}
