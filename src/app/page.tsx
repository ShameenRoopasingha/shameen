'use client';

import dynamic from 'next/dynamic';
import { ScanlineOverlay } from '@/components/ui/ScanlineOverlay';
import { SectionController } from '@/components/SectionController';

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

      {/* Section Controller with all sections */}
      <SectionController />

      {/* Global Scanline Overlay */}
      <ScanlineOverlay />
    </main>
  );
}
