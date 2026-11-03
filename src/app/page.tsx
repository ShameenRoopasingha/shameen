'use client';

import dynamic from 'next/dynamic';
import { ScanlineOverlay } from '@/components/ui/ScanlineOverlay';
import { SectionController } from '@/components/SectionController';

// Dynamically import 3D Scene to ensure SSR safety
const Scene = dynamic(
  () => import('@/components/three/Scene').then((mod) => mod.Scene),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#120B05]">
      {/* 3D Sacred Timeline Oscilloscope Wave */}
      <Scene />

      {/* TVA TemPad Split-Bezel OS Shell */}
      <SectionController />

      {/* Single Composited CRT Scanline + Radial Vignette Overlay */}
      <ScanlineOverlay />
    </main>
  );
}
