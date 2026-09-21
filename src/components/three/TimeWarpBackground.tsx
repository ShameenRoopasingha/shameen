'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppSelector } from '@/store/hooks';

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
  uniform vec3 uGridColor;
  uniform vec3 uBackgroundColor;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    // Grid parameters
    float gridSize = 2.0;
    float lineWidth = 0.02;
    
    // Scroll the grid based on warp speed
    vec2 scrolledUV = vUv;
    scrolledUV.y += uTime * uWarpSpeed * 0.1;
    
    // Create grid lines
    vec2 grid = abs(fract(scrolledUV * gridSize - 0.5) - 0.5) / fwidth(scrolledUV * gridSize);
    float line = min(grid.x, grid.y);
    
    // Calculate line intensity with distance fade
    float lineIntensity = 1.0 - min(line, 1.0);
    lineIntensity *= 0.15; // 15% opacity as specified
    
    // Add subtle glow effect based on warp speed
    float glow = lineIntensity * (1.0 + uWarpSpeed * 0.05);
    
    // Mix background with grid
    vec3 color = mix(uBackgroundColor, uGridColor, glow);
    
    // Add slight vignette
    float vignette = 1.0 - length(vUv - 0.5) * 0.5;
    color *= vignette;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

export function TimeWarpBackground() {
  const meshRef = useRef<THREE.Mesh>(null);
  const warpSpeed = useAppSelector((state) => state.navigation.warpSpeed);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWarpSpeed: { value: 0.5 },
      uGridColor: { value: new THREE.Color('#FF9900') },
      uBackgroundColor: { value: new THREE.Color('#050404') },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uWarpSpeed.value = warpSpeed;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]} rotation={[-Math.PI / 4, 0, 0]}>
      <planeGeometry args={[50, 100, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

TimeWarpBackground.displayName = 'TimeWarpBackground';

