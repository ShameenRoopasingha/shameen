'use client';

import { useEffect, useState } from 'react';

interface ToastProps {
  message: string | null;
  onClear: () => void;
}

export function ToastNotification({ message, onClear }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClear, 200);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [message, onClear]);

  if (!message || !visible) return null;

  return (
    <div className="fixed bottom-14 md:bottom-6 right-3 md:right-6 z-50 pointer-events-none animate-[fadeIn_0.15s_steps(2)]">
      <div className="border border-[#FF8C24] bg-[#120B05] px-4 py-2.5 shadow-[0_0_18px_rgba(255,140,36,0.4)] flex items-center gap-3">
        <span className="w-2 h-2 bg-[#00FF66] shadow-[0_0_8px_#00FF66] animate-pulse" />
        <span className="text-xs font-mono font-bold text-[#FFB84D] tracking-wider">
          {message}
        </span>
      </div>
    </div>
  );
}
