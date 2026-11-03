'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { TimeWarpBackground } from './TimeWarpBackground';

export function Scene() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setReducedMotion(e.matches);
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-40 md:opacity-50">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 60 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ antialias: false, powerPreference: 'low-power' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <TimeWarpBackground reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}

Scene.displayName = 'Scene';
