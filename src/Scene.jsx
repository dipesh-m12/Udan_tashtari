import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber"; // Import useFrame for animation

export default function Model(props) {
  const { nodes, materials } = useGLTF("/scene.gltf");
  const group = useRef(); // Create a reference for the group

  // Rotate the group every frame
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.01; // Rotate around the Y-axis
    }
  });

  return (
    <group {...props} ref={group} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.002}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh_0067_Tex_0095_1dds_0.geometry}
              material={materials["Tex_0095_1.dds"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh_0067_Tex_0095_1dds_0_1.geometry}
              material={materials["Tex_0095_1.dds"]}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh_0068_Tex_0095_2dds_0.geometry}
              material={materials["Tex_0095_2.dds"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh_0068_Tex_0095_2dds_0_1.geometry}
              material={materials["Tex_0095_2.dds"]}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh_0067_Tex_0095_2dds_0.geometry}
              material={materials["Tex_0095_2.dds_0"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh_0067_Tex_0095_2dds_0_1.geometry}
              material={materials["Tex_0095_2.dds_0"]}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh_0069_Tex_0095_3dds_0.geometry}
            material={materials["Tex_0095_3.dds"]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh_0546_Tex_5040_1dds_0.geometry}
            material={materials["Tex_5040_1.dds"]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/scene.gltf");
