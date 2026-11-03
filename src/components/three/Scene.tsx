'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { TimeWarpBackground } from './TimeWarpBackground';

export function Scene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-45">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 60 }}
        gl={{ antialias: false, powerPreference: 'low-power' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <TimeWarpBackground />
        </Suspense>
      </Canvas>
    </div>
  );
}

Scene.displayName = 'Scene';
