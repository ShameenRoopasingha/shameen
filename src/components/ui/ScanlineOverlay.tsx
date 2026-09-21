'use client';

export function ScanlineOverlay() {
    return (
        <div
            className="scanlines"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9999,
                background: `repeating-linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.15),
          rgba(0, 0, 0, 0.15) 1px,
          transparent 1px,
          transparent 2px
        )`,
            }}
        />
    );
}


ScanlineOverlay.displayName = 'ScanlineOverlay';

