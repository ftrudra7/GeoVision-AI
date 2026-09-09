import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface EarthProps {
  prefersReducedMotion: boolean;
}

export function Earth({ prefersReducedMotion }: EarthProps) {
  const earthRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (earthRef.current && !prefersReducedMotion) {
      // Extremely slow rotation: 90-180 seconds per revolution
      earthRef.current.rotation.y += 0.0005;
      
      // Subtle parallax response to mouse
      earthRef.current.rotation.x = THREE.MathUtils.lerp(
        earthRef.current.rotation.x,
        (state.mouse.y * Math.PI) / 40,
        0.02
      );
      earthRef.current.rotation.z = THREE.MathUtils.lerp(
        earthRef.current.rotation.z,
        -(state.mouse.x * Math.PI) / 40,
        0.02
      );
    }
  });

  return (
    <group>
      {/* Main globe core */}
      <Sphere ref={earthRef} args={[2.5, 64, 64]}>
        <meshStandardMaterial
          color="#061019"
          emissive="#02060a"
          roughness={0.7}
          metalness={0.3}
          wireframe={true}
          transparent
          opacity={0.15}
        />
      </Sphere>

      {/* Atmospheric glow */}
      <Sphere args={[2.55, 64, 64]}>
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
      
      {/* Outer subtle glow */}
      <Sphere args={[2.7, 32, 32]}>
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.015}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
    </group>
  );
}
