'use client';

import dynamic from 'next/dynamic';
import { ScanlineOverlay } from '@/components/ui/ScanlineOverlay';
import { SectionController } from '@/components/SectionController';
import { DeviceOrientationAdvice } from '@/components/ui/DeviceOrientationAdvice';
import { TempadLandscapeMode } from '@/components/tempad/TempadLandscapeMode';

// Dynamically import the 3D Scene to avoid SSR issues
const Scene = dynamic(
  () => import('@/components/three/Scene').then((mod) => mod.Scene),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050404]">
      {/* 3D Background Canvas */}
      <Scene />

      {/* Section Controller wrapped in Mobile Landscape Device mode */}
      <TempadLandscapeMode>
        <SectionController />
      </TempadLandscapeMode>

      {/* Global Scanline Overlay */}
      <ScanlineOverlay />

      {/* Orientation Advice for Mobile */}
      <DeviceOrientationAdvice />
    </main>
  );
}
