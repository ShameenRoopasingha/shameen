'use client';

import { useState } from 'react';

interface TerminalInputProps {
    label: string;
    name: string;
    type?: 'text' | 'email' | 'textarea';
    value: string;
    onChange: (value: string) => void;
    rows?: number;
}

export function TerminalInput({
    label,
    name,
    type = 'text',
    value,
    onChange,
    rows = 3,
}: TerminalInputProps) {
    const [isFocused, setIsFocused] = useState(false);

    const baseStyles = {
        background: 'transparent',
        border: 'none',
        borderBottom: `1px solid ${isFocused ? 'var(--tva-amber)' : 'rgba(255, 153, 0, 0.3)'}`,
        color: 'var(--tva-amber)',
        fontFamily: 'var(--font-mono)',
        fontSize: '1rem',
        padding: '0.5rem 0',
        outline: 'none',
        width: '100%',
        caretColor: 'var(--tva-amber)',
        transition: 'border-color 0.2s ease',
    };

    return (
        <div className="mb-6">
            <label
                htmlFor={name}
                className="block mb-2 text-xs uppercase tracking-widest"
                style={{ color: 'rgba(255, 153, 0, 0.7)' }}
            >
                &gt; {label}:
            </label>
            <div className="relative">
                {type === 'textarea' ? (
                    <textarea
                        id={name}
                        name={name}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        rows={rows}
                        style={{
                            ...baseStyles,
                            resize: 'none',
                        }}
                        className="w-full"
                    />
                ) : (
                    <input
                        id={name}
                        name={name}
                        type={type}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        style={baseStyles}
                    />
                )}
            </div>
        </div>
    );
}

TerminalInput.displayName = 'TerminalInput';
