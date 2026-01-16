'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { TimeWarpBackground } from './TimeWarpBackground';

export function Scene() {
    return (
        <div className="fixed inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                gl={{ antialias: true, alpha: false }}
                style={{ background: '#050404' }}
            >
                <Suspense fallback={null}>
                    <TimeWarpBackground />
                    <ambientLight intensity={0.1} />
                </Suspense>
            </Canvas>
        </div>
    );
}

Scene.displayName = 'Scene';

