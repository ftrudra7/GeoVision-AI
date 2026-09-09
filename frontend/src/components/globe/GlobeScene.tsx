import { Canvas } from '@react-three/fiber';
import { Earth } from './Earth';
import { useEffect, useState } from 'react';

export function GlobeScene() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#06b6d4" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#061019" />
        
        <group rotation={[0.2, 0, 0]}>
           <Earth prefersReducedMotion={prefersReducedMotion} />
        </group>
      </Canvas>
    </div>
  );
}
