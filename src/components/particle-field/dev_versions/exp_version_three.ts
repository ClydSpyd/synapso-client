// FINAL WITH COMMENTED BACKUP STUFF

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleField() {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const drift = useRef({ x: 0.001, y: 0.001 });
  // const zoom = useRef(0);

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

    // const colorOptions = [
    //   new THREE.Color("#ff6b6b"),
    //   new THREE.Color("#feca57"),
    //   new THREE.Color("#1dd1a1"),
    //   new THREE.Color("#54a0ff"),
    //   new THREE.Color("#5f27cd")
    // ];

     const colorOptions = [
      new THREE.Color(" #f87bdf"),
      new THREE.Color("#66ccff"),
      new THREE.Color("#d07ef9"),
      new THREE.Color("#54a0ff"),
      new THREE.Color(" #f87bdf"),
    ];

    // const colorOptions = [
    //   new THREE.Color("#b045aa"),
    //   new THREE.Color("#3388cc"), 
    //   new THREE.Color("#a840d4"),
    //   new THREE.Color("#3a7dd8"),
    //   new THREE.Color("#c35ec0")
    // ];
    
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
      size: 0.13,
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

      drift.current.x = deltaX * 0.5;
      drift.current.y = deltaY * 0.5;

      // zoom.current = 0.1; // trigger subtle zoom in

      mouse.current.x = x;
      mouse.current.y = y;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      // Rotation
      particles.rotation.x += drift.current.y + velocity.current.y;
      particles.rotation.y += drift.current.x + velocity.current.x;

      // Damping
      velocity.current.x *= 0.95;
      velocity.current.y *= 0.95;

      // Smooth zoom effect
      // if (zoom.current > 0) {
      //   camera.position.z = 5 - zoom.current;
      //   zoom.current *= 0.95; // ease out zoom
      // } else {
      //   camera.position.z = 5;
      // }

      renderer.render(scene, camera);
    };

    animate();

    const cleanup = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      mountRef.current?.removeChild(renderer.domElement);
    };

    return cleanup;
  }, []);

  // return <div ref={mountRef} className="fixed inset-0 z-[-1] bg-transparent opacity-55" />;
}
