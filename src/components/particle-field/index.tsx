import { useEffect, useRef } from "react";
import * as THREE from "three";
import { createRandomSpark, updateMorphingMatrix } from "./utils";

export default function ParticleField() {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const drift = useRef({ x: 0.001, y: 0.001 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const lineMeshRef = useRef<THREE.LineSegments | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    const particleCount = 500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorOptions = [
      new THREE.Color("#66ccff"),
      new THREE.Color("#54a0ff"),
      new THREE.Color("#d07ef9"),
      new THREE.Color("#66ccff"),
      new THREE.Color("#f97fdb"),
      new THREE.Color("#FCA5E7"),
      new THREE.Color(" #f87bdf"),
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      const color =
        colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const texture = new THREE.TextureLoader().load("/circle_sm.png");
    const material = new THREE.PointsMaterial({
      size: 0.13,
      map: texture,
      transparent: true,
      vertexColors: true,
      // blending: THREE.AdditiveBlending,
      blending: THREE.NormalBlending,

      depthWrite: false,
    });
    if (material.map) {
      material.map.minFilter = THREE.LinearFilter;
      material.map.magFilter = THREE.LinearFilter;
    }

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;

      const deltaX = (x - mouse.current.x) * 0.2;
      const deltaY = (y - mouse.current.y) * 0.2;

      velocity.current.x = deltaX;
      velocity.current.y = deltaY;
      const minDrift = 0.0005;
      const maxDrift = 0.005;

      // raw values based on mouse movement
      // 0.5 scaling factor to keep movement subtle
      const baseDriftX = deltaX * 0.5;
      const baseDriftY = deltaY * 0.5;

      const clamp = (val: number) => {
        const abs = Math.abs(val); // -0.12 === 0.12 scale only, regardless of sign
        const clamped = Math.min(Math.max(abs, minDrift), maxDrift); // clamp to min/max drift values
        return Math.sign(val || 1) * clamped; // sign of initial input reassigned to calculate clamped value
      };

      drift.current.x = clamp(baseDriftX);
      drift.current.y = clamp(baseDriftY);

      mouse.current.x = x;
      mouse.current.y = y;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      updateMorphingMatrix({
        scene,
        lineMesh: lineMeshRef,  // Pass the lineMeshRef to the function
      });

      // Update the target rotation based on current motion
      targetRotation.current.x += drift.current.y + velocity.current.y;
      targetRotation.current.y += drift.current.x + velocity.current.x;

      // Easing: lerp current rotation toward the target
      particles.rotation.x +=
        (targetRotation.current.x - particles.rotation.x) * 0.05;
      particles.rotation.y +=
        (targetRotation.current.y - particles.rotation.y) * 0.05;

      velocity.current.x *= 0.95;
      velocity.current.y *= 0.95;

      if (Math.random() < 0.03) {
        // Adjust frequency (3% chance per frame)
        createRandomSpark({
          scene,
          geometry,
          particleCount,
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    const cleanup = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      mountRef.current?.removeChild(renderer.domElement);
      // clearInterval(linesInterval);
    };

    return cleanup;
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-[-1] bg-transparent opacity-55"
    />
  );
}
