// black rainbow
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleFieldBR() {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    const particleCount = 1000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorOptions = [
      new THREE.Color("#ff6b6b"),
      new THREE.Color("#feca57"),
      new THREE.Color("#1dd1a1"),
      new THREE.Color("#54a0ff"),
      new THREE.Color("#5f27cd")
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

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      alphaTest: 0.5,
      map: new THREE.TextureLoader().load("/circle.png")
    });
    if (material.map) {
      material.map.minFilter = THREE.LinearFilter;
      material.map.magFilter = THREE.LinearFilter;
    }
    material.depthWrite = false;

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;

      velocity.current.x = (x - mouse.current.x) * 0.1;
      velocity.current.y = (y - mouse.current.y) * 0.1;

      mouse.current.x = x;
      mouse.current.y = y;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      // Apply subtle continuous rotation based on velocity
      particles.rotation.x += velocity.current.y;
      particles.rotation.y += velocity.current.x;

      // Dampen the velocity to simulate inertia
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

  return <div ref={mountRef} className="fixed inset-0 z-[-1] bg-transparent" />;
}
