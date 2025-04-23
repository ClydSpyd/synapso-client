import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleField() {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const drift = useRef({ x: 0.001, y: 0.001 });

  useEffect(() => {
    console.log(drift.current);
  }, [drift.current]);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    const particleCount = 400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

     const colorOptions = [
      new THREE.Color(" #f87bdf"),
      new THREE.Color("#66ccff"),
      new THREE.Color("#d07ef9"),
      new THREE.Color("#54a0ff"),
      new THREE.Color(" #f87bdf"),
    ];
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const texture = new THREE.TextureLoader().load("/circle_sm.png");
    const material = new THREE.PointsMaterial({
      size: 0.1,
      map: texture,
      transparent: true,
      vertexColors: true,
      // blending: THREE.AdditiveBlending,
      blending: THREE.NormalBlending,

      depthWrite: false
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

      const deltaX = (x - mouse.current.x) * 0.1;
      const deltaY = (y - mouse.current.y) * 0.1;

      velocity.current.x = deltaX;
      velocity.current.y = deltaY;

      const baseDriftX = deltaX * 0.5;
      const baseDriftY = deltaY * 0.5;

      // minimum drift to always preserve a little momentum
      drift.current.x = Math.abs(baseDriftX) < 0.0005 ? Math.sign(baseDriftX || 1) * 0.0005 : baseDriftX;
      drift.current.y = Math.abs(baseDriftY) < 0.0005 ? Math.sign(baseDriftY || 1) * 0.0005 : baseDriftY;

      mouse.current.x = x;
      mouse.current.y = y;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      // Rotation
      particles.rotation.x += drift.current.y + velocity.current.y;
      particles.rotation.y += drift.current.x + velocity.current.x;

      velocity.current.x *= 0.95;
      velocity.current.y *= 0.95;

      renderer.render(scene, camera);
    };

    animate();

    const cleanup = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      mountRef.current?.removeChild(renderer.domElement);
    };

    return cleanup;
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-[-1] bg-transparent opacity-55" />;
}
