import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { COMPACT_MEDIA_QUERY } from './systemChoreography';
import type { SectionId } from '../sections';

type SystemCanvasProps = {
  blueprint: boolean;
  // activeSection is still passed by App; the bird now follows raw scroll progress,
  // so it is intentionally unused here.
  activeSection: SectionId;
  onStatusChange?: (status: CanvasStatus) => void;
};

export type CanvasStatus = 'loading' | 'ready' | 'unavailable' | 'lost';
type DisposableResource = THREE.BufferGeometry | THREE.Material;
type RegisterDisposable = <T extends DisposableResource>(resource: T) => T;

const COBALT = new THREE.Color('#1746e0');
const ORANGE = new THREE.Color('#ff4d00');
const INK = new THREE.Color('#10100f');
const PAPER = new THREE.Color('#f4f0e7');

const damp = (current: number, target: number, lambda: number, delta: number) =>
  THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * delta));

function makeWingGeometry(direction: 1 | -1, registerDisposable: RegisterDisposable) {
  const geometry = registerDisposable(new THREE.BufferGeometry());
  geometry.setAttribute('position', new THREE.Float32BufferAttribute([
    -0.05, 0, 0,
    -0.48, 0.58 * direction, 0,
    0.24, 0.24 * direction, 0.02,
    0.08, 0.06 * direction, 0.08,
  ], 3));
  geometry.setIndex([0, 1, 2, 0, 2, 3]);
  geometry.computeVertexNormals();
  return geometry;
}

function createHummingbird(registerDisposable: RegisterDisposable) {
  const bird = new THREE.Group();
  bird.name = 'scroll-hummingbird';

  const cobalt = registerDisposable(new THREE.MeshStandardMaterial({
    color: COBALT,
    emissive: COBALT,
    emissiveIntensity: 0.22,
    roughness: 0.3,
    metalness: 0.08,
    flatShading: true,
  }));
  const orange = registerDisposable(new THREE.MeshStandardMaterial({
    color: ORANGE,
    emissive: ORANGE,
    emissiveIntensity: 0.28,
    roughness: 0.4,
    flatShading: true,
  }));
  const dark = registerDisposable(new THREE.MeshStandardMaterial({ color: INK, roughness: 0.5, flatShading: true }));
  const wingMaterial = registerDisposable(new THREE.MeshStandardMaterial({
    color: '#2f63ff',
    emissive: COBALT,
    emissiveIntensity: 0.16,
    roughness: 0.36,
    metalness: 0.05,
    flatShading: true,
    side: THREE.DoubleSide,
  }));

  const body = new THREE.Mesh(registerDisposable(new THREE.IcosahedronGeometry(0.36, 1)), cobalt);
  body.scale.set(1.45, 0.72, 0.7);
  bird.add(body);

  const head = new THREE.Mesh(registerDisposable(new THREE.IcosahedronGeometry(0.25, 1)), cobalt);
  head.position.set(0.38, 0.09, 0);
  bird.add(head);

  const throat = new THREE.Mesh(registerDisposable(new THREE.IcosahedronGeometry(0.16, 1)), orange);
  throat.position.set(0.3, -0.1, 0.13);
  throat.scale.set(1.1, 0.82, 0.45);
  bird.add(throat);

  const beak = new THREE.Mesh(registerDisposable(new THREE.ConeGeometry(0.042, 0.58, 5)), dark);
  beak.rotation.z = -Math.PI / 2;
  beak.position.set(0.75, 0.11, 0);
  bird.add(beak);

  const eye = new THREE.Mesh(registerDisposable(new THREE.SphereGeometry(0.032, 6, 6)), dark);
  eye.position.set(0.48, 0.16, 0.18);
  bird.add(eye);

  const upperWing = new THREE.Group();
  const upperWingMesh = new THREE.Mesh(makeWingGeometry(1, registerDisposable), wingMaterial);
  upperWingMesh.position.set(-0.02, 0.08, 0.02);
  upperWing.add(upperWingMesh);
  bird.add(upperWing);

  const lowerWing = new THREE.Group();
  const lowerWingMesh = new THREE.Mesh(makeWingGeometry(-1, registerDisposable), wingMaterial);
  lowerWingMesh.position.set(-0.02, -0.06, -0.02);
  lowerWing.add(lowerWingMesh);
  bird.add(lowerWing);

  const tailGeometry = registerDisposable(new THREE.BufferGeometry());
  tailGeometry.setAttribute('position', new THREE.Float32BufferAttribute([
    -0.2, 0.08, 0, -0.82, 0.23, 0, -0.56, 0, 0.08,
    -0.2, -0.08, 0, -0.82, -0.23, 0, -0.56, 0, -0.08,
  ], 3));
  tailGeometry.setIndex([0, 1, 2, 3, 4, 5]);
  tailGeometry.computeVertexNormals();
  const tail = new THREE.Mesh(tailGeometry, orange);
  bird.add(tail);

  const haloMaterial = registerDisposable(new THREE.MeshBasicMaterial({
    color: ORANGE,
    transparent: true,
    opacity: 0.34,
    side: THREE.DoubleSide,
    depthWrite: false,
  }));
  const flightHalo = new THREE.Mesh(
    registerDisposable(new THREE.TorusGeometry(0.62, 0.018, 6, 48)),
    haloMaterial,
  );
  flightHalo.name = 'flight-signature';
  flightHalo.position.z = -0.22;
  flightHalo.rotation.z = 0.14;
  bird.add(flightHalo);

  return { bird, bodyMaterial: cobalt, upperWing, lowerWing, flightHalo, haloMaterial };
}

export default function SystemCanvas({ blueprint, onStatusChange }: SystemCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blueprintRef = useRef(blueprint);
  const renderStaticRef = useRef<() => void>(() => undefined);

  useEffect(() => {
    blueprintRef.current = blueprint;
    renderStaticRef.current();
  }, [blueprint]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    canvas.dataset.webgl = 'loading';
    onStatusChange?.('loading');

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compactQuery = window.matchMedia(COMPACT_MEDIA_QUERY);
    let reducedMotion = motionQuery.matches;
    let compact = compactQuery.matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(compact ? 48 : 38, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, compact ? 9.5 : 10.5);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !compact, powerPreference: 'high-performance' });
    } catch {
      canvas.dataset.webgl = 'unavailable';
      canvas.hidden = true;
      onStatusChange?.('unavailable');
      return undefined;
    }

    const resourceRegistry = new Set<DisposableResource>();
    const registerDisposable: RegisterDisposable = (resource) => {
      resourceRegistry.add(resource);
      return resource;
    };
    let resourcesDisposed = false;
    const disposeResources = () => {
      if (resourcesDisposed) return;
      resourcesDisposed = true;
      const disposed = new Set<DisposableResource>();
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry && !disposed.has(mesh.geometry)) {
          mesh.geometry.dispose();
          disposed.add(mesh.geometry);
        }
        if (mesh.material) {
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          materials.forEach((material) => {
            if (!disposed.has(material)) {
              material.dispose();
              disposed.add(material);
            }
          });
        }
      });
      resourceRegistry.forEach((resource) => {
        if (!disposed.has(resource)) {
          resource.dispose();
          disposed.add(resource);
        }
      });
      // ponytail: dispose() frees GPU resources; do NOT forceContextLoss() — it
      // permanently kills the canvas context, so the StrictMode remount gets a
      // dead context and the whole scene fails to render. Context is GC'd anyway.
      renderer.dispose();
    };

    try {
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 1.35 : 1.8));
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.setClearColor(PAPER, 0);

      const { bird, bodyMaterial, upperWing, lowerWing, flightHalo, haloMaterial } = createHummingbird(registerDisposable);
      scene.add(bird);

      const ambient = new THREE.HemisphereLight(0xffffff, 0xe7ded0, 2.1);
      const key = new THREE.DirectionalLight(0xffffff, 3.2);
      key.position.set(4, 6, 8);
      const accent = new THREE.PointLight(ORANGE, 24, 12, 2);
      accent.position.set(-3, -2, 3);
      scene.add(ambient, key, accent);

      let frameId = 0;
      let lastTime = performance.now();
      let running = false;
      let contextLost = false;
      let scrollVelocity = 0;
      let lastScrollY = window.scrollY;
      let lastScrollTime = performance.now();

      // Smoothed progress (0 top → 1 bottom) of the left scroll-meter fill.
      let progress = 0;
      const readProgress = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        return max > 0 ? THREE.MathUtils.clamp(window.scrollY / max, 0, 1) : 0;
      };
      progress = readProgress();

      // Bird depth stays slightly in front so it reads as a small companion.
      const birdZ = compact ? 0.4 : 0.8;
      const loopRadiusX = compact ? 0.42 : 0.62;
      const loopRadiusY = compact ? 0.5 : 0.72;
      const birdScale = compact ? 0.42 : 0.56;

      const onScroll = () => {
        const now = performance.now();
        const elapsed = Math.max(16, now - lastScrollTime);
        const nextScrollY = window.scrollY;
        scrollVelocity = THREE.MathUtils.clamp((nextScrollY - lastScrollY) / elapsed, -2.5, 2.5);
        lastScrollY = nextScrollY;
        lastScrollTime = now;
        if (reducedMotion) renderStaticRef.current();
      };
      const onResize = () => {
        compact = compactQuery.matches;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.fov = compact ? 48 : 38;
        camera.position.z = compact ? 9.5 : 10.5;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 1.35 : 1.8));
        renderer.setSize(window.innerWidth, window.innerHeight, false);
        if (reducedMotion) renderStaticRef.current();
      };

      const renderFrame = (time: number, immediate = false) => {
        const delta = immediate ? 1 : Math.min((time - lastTime) / 1000, 0.05);
        lastTime = time;
        const approach = (current: number, target: number, lambda: number) => (
          immediate ? target : damp(current, target, lambda, delta)
        );

        progress = approach(progress, readProgress(), 6);

        // Left edge of the frustum at the bird's depth, plus a small inset so the
        // bird hugs the orange meter without clipping off-screen.
        const vHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) * (camera.position.z - birdZ);
        const hHalf = vHalf * camera.aspect;
        const edgeX = -hHalf * 0.9;
        // Loop center sits just right of the edge so the leftmost arc grazes the line.
        const centerX = edgeX + loopRadiusX * 1.1;
        const centerY = vHalf * 0.86 * (1 - 2 * progress);

        const loop = immediate ? Math.PI / 2 : time * 0.0016;
        const scrollEnergy = reducedMotion ? 0 : Math.min(Math.abs(scrollVelocity), 1.6);
        const direction = Math.sign(scrollVelocity);
        const cos = Math.cos(loop);
        const sin = Math.sin(loop);

        bird.position.x = approach(bird.position.x, centerX + cos * loopRadiusX, 6.5);
        bird.position.y = approach(bird.position.y, centerY + sin * loopRadiusY, 6.5);
        bird.position.z = birdZ;

        // Face the tangent of the loop so the beak leads the flight.
        const travel = Math.atan2(cos * loopRadiusY, -sin * loopRadiusX);
        bird.rotation.z = approach(bird.rotation.z, travel + direction * scrollEnergy * 0.08, 7);
        bird.rotation.y = approach(bird.rotation.y, -0.2, 6);
        bird.rotation.x = approach(bird.rotation.x, 0.08, 6);
        bird.scale.setScalar(approach(bird.scale.x || birdScale, birdScale, 6));

        const wingAmplitude = reducedMotion ? 0.12 : 0.24 + scrollEnergy * 0.34;
        const wingSpeed = reducedMotion ? 0 : 0.02 + scrollEnergy * 0.012;
        const wingBeat = reducedMotion ? 0 : Math.sin(time * wingSpeed) * wingAmplitude;
        upperWing.rotation.z = approach(upperWing.rotation.z, wingBeat, 16);
        lowerWing.rotation.z = approach(lowerWing.rotation.z, -wingBeat, 16);

        const haloPulse = reducedMotion ? 1 : 1 + Math.sin(time * 0.0045) * 0.07 + scrollEnergy * 0.035;
        flightHalo.scale.setScalar(approach(flightHalo.scale.x, haloPulse, 8));
        flightHalo.rotation.z += reducedMotion ? 0 : delta * (0.34 + scrollEnergy * 0.16);

        const isBlueprint = blueprintRef.current;
        bodyMaterial.color.lerp(isBlueprint ? ORANGE : COBALT, immediate ? 1 : 1 - Math.exp(-5 * delta));
        bodyMaterial.emissive.lerp(isBlueprint ? ORANGE : COBALT, immediate ? 1 : 1 - Math.exp(-5 * delta));
        haloMaterial.opacity = approach(haloMaterial.opacity, isBlueprint ? 0.6 : 0.34 + scrollEnergy * 0.08, 6);

        scrollVelocity = immediate ? 0 : damp(scrollVelocity, 0, 3.4, delta);

        renderer.render(scene, camera);
      };

      const animate = (time: number) => {
        if (!running || contextLost) return;
        renderFrame(time);
        frameId = requestAnimationFrame(animate);
      };
      const stopLoop = () => {
        running = false;
        cancelAnimationFrame(frameId);
      };
      const startLoop = () => {
        if (running || reducedMotion || document.hidden || contextLost) return;
        running = true;
        lastTime = performance.now();
        frameId = requestAnimationFrame(animate);
      };
      renderStaticRef.current = () => {
        if (reducedMotion && !contextLost) renderFrame(performance.now(), true);
      };

      const onVisibilityChange = () => {
        if (document.hidden) stopLoop();
        else if (reducedMotion) renderStaticRef.current();
        else startLoop();
      };
      const onMotionChange = (event: MediaQueryListEvent) => {
        reducedMotion = event.matches;
        if (reducedMotion) {
          stopLoop();
          renderStaticRef.current();
        } else {
          startLoop();
        }
      };
      const onCompactChange = () => onResize();
      const onContextLost = (event: Event) => {
        event.preventDefault();
        contextLost = true;
        canvas.dataset.webgl = 'lost';
        onStatusChange?.('lost');
        stopLoop();
      };
      const onContextRestored = () => {
        contextLost = false;
        canvas.dataset.webgl = 'ready';
        onStatusChange?.('ready');
        renderer.resetState();
        onResize();
        if (reducedMotion) renderStaticRef.current();
        else startLoop();
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize);
      document.addEventListener('visibilitychange', onVisibilityChange);
      motionQuery.addEventListener('change', onMotionChange);
      compactQuery.addEventListener('change', onCompactChange);
      canvas.addEventListener('webglcontextlost', onContextLost);
      canvas.addEventListener('webglcontextrestored', onContextRestored);
      canvas.dataset.webgl = 'ready';
      onStatusChange?.('ready');
      if (reducedMotion) renderStaticRef.current();
      else startLoop();

      return () => {
        stopLoop();
        renderStaticRef.current = () => undefined;
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
        document.removeEventListener('visibilitychange', onVisibilityChange);
        motionQuery.removeEventListener('change', onMotionChange);
        compactQuery.removeEventListener('change', onCompactChange);
        canvas.removeEventListener('webglcontextlost', onContextLost);
        canvas.removeEventListener('webglcontextrestored', onContextRestored);
        disposeResources();
      };
    } catch {
      renderStaticRef.current = () => undefined;
      try {
        disposeResources();
      } finally {
        canvas.dataset.webgl = 'unavailable';
        canvas.hidden = true;
        onStatusChange?.('unavailable');
      }
      return undefined;
    }
  }, []);

  return <canvas ref={canvasRef} className="system-canvas" aria-hidden="true" />;
}
