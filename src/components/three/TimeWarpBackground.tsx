'use client';

import { useRef, useMemo } from 'react';
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
    // Modulate amplitude across screen (taper at edges)
    float envelope = sin(uv.x * 3.14159);
    wave *= envelope;
    
    float dist = abs(uv.y - 0.5 - wave);
    return smoothstep(thickness, 0.0, dist);
  }
  
  void main() {
    vec2 uv = vUv;
    
    // Base phosphor background
    vec3 color = uVoid;
    
    // 1. Subtle CRT coordinate perspective grid
    float gridX = abs(fract(uv.x * 24.0 - 0.5) - 0.5) / fwidth(uv.x * 24.0);
    float gridY = abs(fract(uv.y * 18.0 - 0.5) - 0.5) / fwidth(uv.y * 18.0);
    float gridLine = min(gridX, gridY);
    float gridIntensity = (1.0 - min(gridLine, 1.0)) * 0.04;
    color += uAmber * gridIntensity;
    
    // 2. Canonical Sacred Timeline (Primary Amber Strand)
    float mainWave = drawStrand(uv, 3.5, 0.14, 0.9 * uWarpSpeed, 0.0, 0.008);
    float mainCore = drawStrand(uv, 3.5, 0.14, 0.9 * uWarpSpeed, 0.0, 0.003);
    color += uAmber * mainWave * 0.85;
    color += uAmberHot * mainCore * 1.0;
    
    // 3. Harmonic strands (Quantum telemetry strands)
    float harmonic1 = drawStrand(uv, 5.0, 0.09, -0.6 * uWarpSpeed, 1.2, 0.006);
    float harmonic2 = drawStrand(uv, 2.2, 0.18, 0.4 * uWarpSpeed, 2.8, 0.005);
    color += uAmber * (harmonic1 + harmonic2) * 0.35;
    
    // 4. Nexus Event Branch (Subtle Alert Red strand deviating upwards)
    float nexusMod = smoothstep(0.4, 0.9, uv.x);
    float nexusWave = sin(uv.x * 4.2 + uTime * 1.1) * 0.12 + (uv.x - 0.4) * 0.35 * nexusMod;
    float distNexus = abs(uv.y - 0.5 - nexusWave);
    float nexusStrand = smoothstep(0.007, 0.0, distNexus) * nexusMod;
    color += uNexusRed * nexusStrand * 0.75;
    
    // 5. CRT vignette and phosphor falloff
    float vignette = 1.0 - length((uv - 0.5) * 1.2);
    vignette = clamp(vignette, 0.0, 1.0);
    color *= (0.4 + 0.6 * vignette);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

export function TimeWarpBackground() {
  const meshRef = useRef<THREE.Mesh>(null);
  const warpSpeed = useAppSelector((state) => state.navigation.warpSpeed);

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
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uWarpSpeed.value = 0.8 + warpSpeed * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <planeGeometry args={[20, 12, 1, 1]} />
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
