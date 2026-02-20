
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform float uWarpStrength;
  uniform float uWarpFrequency;
  uniform float uWarpSpeed;
  uniform float uWarpAmplitude;
  uniform float uNoiseScale;
  uniform float uContrast;
  varying vec2 vUv;

  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 p = vUv * uNoiseScale;
    float t = uTime * uWarpSpeed;
    
    vec2 warp = vec2(
      sin(p.y * uWarpFrequency + t),
      cos(p.x * uWarpFrequency + t)
    ) * uWarpStrength * (uWarpAmplitude / 100.0);
    
    p += warp;
    
    float n = noise(p);
    vec3 color = mix(uColor1, uColor2, n);
    color = mix(color, uColor3, sin(uTime + length(p)) * 0.5 + 0.5);
    
    vec3 finalColor = (color - 0.5) * uContrast + 0.5;
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

interface GrainientProps {
    color1?: string;
    color2?: string;
    color3?: string;
    timeSpeed?: number;
    warpStrength?: number;
    warpFrequency?: number;
    warpSpeed?: number;
    warpAmplitude?: number;
    noiseScale?: number;
    contrast?: number;
    style?: React.CSSProperties;
    className?: string; // Add className prop for flexibility
}

const Grainient: React.FC<GrainientProps> = ({
    color1 = '#140b0b',
    color2 = '#000000',
    color3 = '#6f56c2',
    timeSpeed = 0.25,
    warpStrength = 1,
    warpFrequency = 5,
    warpSpeed = 2,
    warpAmplitude = 50,
    noiseScale = 2,
    contrast = 1.5,
    className,
    ...props
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        const container = containerRef.current;
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        const geometry = new THREE.PlaneGeometry(2, 2);
        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uColor1: { value: new THREE.Color(color1) },
                uColor2: { value: new THREE.Color(color2) },
                uColor3: { value: new THREE.Color(color3) },
                uWarpStrength: { value: warpStrength },
                uWarpFrequency: { value: warpFrequency },
                uWarpSpeed: { value: warpSpeed },
                uWarpAmplitude: { value: warpAmplitude },
                uNoiseScale: { value: noiseScale },
                uContrast: { value: contrast },
            }
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        let animationId: number;
        const animate = (time: number) => {
            material.uniforms.uTime.value = time * 0.001 * timeSpeed;
            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        };

        animate(0);

        const handleResize = () => {
            if (!container) return;
            // Update camera aspect if needed (not for Orthographic setup covering full rect)
            // Wait, standard resize logic for WebGLRenderer:
            renderer.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
            cancelAnimationFrame(animationId);
        };
    }, [color1, color2, color3, timeSpeed, warpStrength, warpFrequency, warpSpeed, warpAmplitude, noiseScale, contrast]);

    return <div ref={containerRef} className={className} style={{ width: '100%', height: '100%', overflow: 'hidden', ...props.style }} {...props} />;
};

export default Grainient;
