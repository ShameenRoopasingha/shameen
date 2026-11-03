'use client';

import { useState } from 'react';
import { tvaSound } from '@/lib/tvaSound';

interface TerminalInputProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'textarea';
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  required?: boolean;
}

export function TerminalInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  rows = 3,
  placeholder,
  required = false,
}: TerminalInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="mb-4 font-mono">
      <label
        htmlFor={name}
        className="block mb-1 text-[10px] sm:text-[11px] uppercase tracking-widest text-[#FF8C24] opacity-80"
      >
        <span className="text-[#FFB84D]">&gt;&gt;</span> {label}
        {required && <span className="text-[#FF3B1F] ml-1">*</span>}
      </label>
      <div
        className={`relative border bg-[#120B05] transition-all duration-75 ${
          isFocused
            ? 'border-[#FF8C24] shadow-[0_0_10px_rgba(255,140,36,0.3)]'
            : 'border-[#7A4210] hover:border-[#FF8C24]/60'
        }`}
      >
        {type === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('tva-input-active'));
              }
            }}
            onKeyDown={() => {
              tvaSound.playKeystroke();
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows={rows}
            placeholder={placeholder}
            required={required}
            /* Enforce text-base (16px minimum) on mobile so iOS Safari NEVER auto-zooms on focus */
            className="w-full bg-transparent px-3 py-2.5 text-base sm:text-sm text-[#FF8C24] placeholder-[#7A4210] focus:outline-hidden resize-none font-mono"
            style={{ caretColor: '#FF8C24' }}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('tva-input-active'));
              }
            }}
            onKeyDown={() => {
              tvaSound.playKeystroke();
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            required={required}
            /* Enforce text-base (16px minimum) on mobile so iOS Safari NEVER auto-zooms on focus */
            className="w-full bg-transparent px-3 py-2.5 text-base sm:text-sm text-[#FF8C24] placeholder-[#7A4210] focus:outline-hidden font-mono"
            style={{ caretColor: '#FF8C24' }}
          />
        )}
        {isFocused && (
          <span className="absolute right-2 top-2 text-[9px] text-[#FF8C24] opacity-40 select-none hidden sm:inline">
            [INPUT_ACTIVE]
          </span>
        )}
      </div>
    </div>
  );
}

TerminalInput.displayName = 'TerminalInput';
