import * as THREE from "three";


const pointCount = 120;
const maxConnections = 800;
const maxDist = 3.5;

const points = Array.from(
  { length: pointCount },
  () =>
    new THREE.Vector3(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    )
);

export const updateMorphingMatrix = ({
  scene,
  lineMesh,
}: {
  scene: THREE.Scene;
  lineMesh: React.RefObject<THREE.LineSegments | null>;
}) => {
  // Animate point positions slightly for morphing effect
  const time = performance.now() * 0.001;

  for (const p of points) {
    p.x += Math.sin(time + p.y) * 0.005;
    p.y += Math.cos(time + p.x) * 0.005;
    p.z += Math.sin(time + p.z) * 0.005;
  }

  const linePositions: number[] = [];
  let linesAdded = 0;

  for (let i = 0; i < pointCount; i++) {
    for (let j = i + 1; j < pointCount; j++) {
      if (linesAdded >= maxConnections) break;

      const a = points[i];
      const b = points[j];

      const distSq = a.distanceToSquared(b);
      if (distSq < maxDist * maxDist) {
        linePositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
        linesAdded++;
      }
    }
  }

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(linePositions, 3)
  );

  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.2,
  });

  const newLineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);

  // Remove previous mesh if it exists
  if (lineMesh.current) {
    console.log("Removing previous line mesh");

    // Remove and forcefully clean up
    scene.remove(lineMesh.current);

    lineMesh.current.geometry.dispose();

    if (Array.isArray(lineMesh.current.material)) {
      lineMesh.current.material.forEach((m) => m.dispose());
    } else {
      lineMesh.current.material.dispose();
    }

    // 💥 Also ensure it's no longer in memory/render list
    lineMesh.current.visible = false;
    lineMesh.current = null;
  }

  lineMesh.current = newLineMesh;
  scene.add(lineMesh.current);
};
