'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppSelector } from '@/store/hooks';

// Sacred Timeline Oscilloscope Wave Shader
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uWarpSpeed;
  uniform vec3 uAmber;
  uniform vec3 uAmberHot;
  uniform vec3 uNexusRed;
  uniform vec3 uVoid;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  
  // Oscilloscope strand generator
  float drawStrand(vec2 uv, float freq, float amp, float speed, float phase, float thickness) {
    float wave = sin(uv.x * freq + uTime * speed + phase) * amp;
    float envelope = sin(uv.x * 3.14159);
    wave *= envelope;
    
    float dist = abs(uv.y - 0.5 - wave);
    return smoothstep(thickness, 0.0, dist);
  }
  
  void main() {
    vec2 uv = vUv;
    vec3 color = uVoid;
    
    // 1. Subtle CRT coordinate grid
    float gridX = abs(fract(uv.x * 20.0 - 0.5) - 0.5) / fwidth(uv.x * 20.0);
    float gridY = abs(fract(uv.y * 14.0 - 0.5) - 0.5) / fwidth(uv.y * 14.0);
    float gridLine = min(gridX, gridY);
    float gridIntensity = (1.0 - min(gridLine, 1.0)) * 0.035;
    color += uAmber * gridIntensity;
    
    // 2. Canonical Sacred Timeline (Primary Amber Strand)
    float mainWave = drawStrand(uv, 3.2, 0.13, 0.8 * uWarpSpeed, 0.0, 0.008);
    float mainCore = drawStrand(uv, 3.2, 0.13, 0.8 * uWarpSpeed, 0.0, 0.003);
    color += uAmber * mainWave * 0.85;
    color += uAmberHot * mainCore * 1.0;
    
    // 3. Harmonic strands
    float harmonic1 = drawStrand(uv, 4.8, 0.08, -0.5 * uWarpSpeed, 1.2, 0.005);
    color += uAmber * harmonic1 * 0.3;
    
    // 4. Nexus Alert Red branch
    float nexusMod = smoothstep(0.45, 0.95, uv.x);
    float nexusWave = sin(uv.x * 4.0 + uTime * 0.9) * 0.11 + (uv.x - 0.45) * 0.3 * nexusMod;
    float distNexus = abs(uv.y - 0.5 - nexusWave);
    float nexusStrand = smoothstep(0.006, 0.0, distNexus) * nexusMod;
    color += uNexusRed * nexusStrand * 0.7;
    
    // 5. Vignette
    float vignette = 1.0 - length((uv - 0.5) * 1.25);
    vignette = clamp(vignette, 0.0, 1.0);
    color *= (0.4 + 0.6 * vignette);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

interface TimeWarpBackgroundProps {
  reducedMotion?: boolean;
}

export function TimeWarpBackground({ reducedMotion = false }: TimeWarpBackgroundProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const warpSpeed = useAppSelector((state) => state.navigation.warpSpeed);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWarpSpeed: { value: 1.0 },
      uAmber: { value: new THREE.Color('#FF8C24') },
      uAmberHot: { value: new THREE.Color('#FFB84D') },
      uNexusRed: { value: new THREE.Color('#FF3B1F') },
      uVoid: { value: new THREE.Color('#120B05') },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      // If prefers-reduced-motion is true, freeze animation or set ultra-slow speed
      material.uniforms.uTime.value = reducedMotion ? 0.5 : state.clock.elapsedTime;
      material.uniforms.uWarpSpeed.value = reducedMotion ? 0 : 0.7 + warpSpeed * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      {/* 50% fewer segments on mobile for maximum GPU efficiency */}
      <planeGeometry args={[20, 12, isMobile ? 1 : 2, isMobile ? 1 : 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

TimeWarpBackground.displayName = 'TimeWarpBackground';
