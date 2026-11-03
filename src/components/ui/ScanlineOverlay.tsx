'use client';

export function ScanlineOverlay() {
  return (
    <div
      aria-hidden="true"
      className="crt-composited-screen opacity-40 md:opacity-70 pointer-events-none"
    />
  );
}

ScanlineOverlay.displayName = 'ScanlineOverlay';
