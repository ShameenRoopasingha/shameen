'use client';

import { forwardRef } from 'react';

export const WarpFlash = forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <div
            ref={ref}
            className="warp-flash"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#FF9900',
                pointerEvents: 'none',
                zIndex: 100,
                opacity: 0,
            }}
        />
    );
});

WarpFlash.displayName = 'WarpFlash';


WarpFlash.displayName = 'WarpFlash';

