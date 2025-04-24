import * as THREE from "three";

export const createRandomSpark = ({
  scene,
  geometry,
  particleCount,
}: {
  scene: THREE.Scene;
  geometry: THREE.BufferGeometry;
  particleCount: number;
}) => {
  const pos = geometry.getAttribute("position");
  let tries = 10; // limit attempts to avoid infinite loops
  let ax, ay, az, bx, by, bz;

  while (tries-- > 0) {
    const indexA = Math.floor(Math.random() * particleCount);
    const indexB = Math.floor(Math.random() * particleCount);
    ax = pos.getX(indexA);
    ay = pos.getY(indexA);
    az = pos.getZ(indexA);
    bx = pos.getX(indexB);
    by = pos.getY(indexB);
    bz = pos.getZ(indexB);

    const dx = ax - bx,
      dy = ay - by,
      dz = az - bz;
    const distSq = dx * dx + dy * dy + dz * dz;

    if (distSq <= 0.02) break; // max distance squared (e.g. √2 = ~1.41 units)
  }
  if (!ax || !ay || !az || !bx || !by || !bz) return; // no valid points found, exit

  const sparkGeometry = new THREE.BufferGeometry();
  sparkGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute([ax, ay, az, bx, by, bz], 3)
  );

  const sparkMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.75,
  });

  const sparkLine = new THREE.Line(sparkGeometry, sparkMaterial);
  scene.add(sparkLine);

  setTimeout(() => {
    scene.remove(sparkLine);
    sparkGeometry.dispose();
    sparkMaterial.dispose();
  }, 50);
};
// Configuration
const pointCount = 120;
const maxConnections = 500;
const maxDist = 3.2;
const morphOffset = 0.3; // how far each point oscillates from its base
const morphSpeed = 0.3;  // speed of oscillation

// Store base points and phase offsets
const points = Array.from({ length: pointCount }, () => ({
  base: new THREE.Vector3(
    (Math.random() - 0.5) * 12, // Wider spread
    (Math.random() - 0.5) * 12,
    (Math.random() - 0.5) * 12
  ),
  phase: Math.random() * Math.PI * 2,
}));

export const updateMorphingMatrix = ({
  scene,
  lineMesh,
}: {
  scene: THREE.Scene;
  lineMesh: React.RefObject<THREE.LineSegments | null>;
}) => {
  const time = performance.now() * 0.001;
  const animatedPositions: THREE.Vector3[] = [];

  // Animate each point smoothly around its base position
  for (const p of points) {
    const animated = new THREE.Vector3(
      p.base.x + Math.sin(time * morphSpeed + p.phase) * morphOffset,
      p.base.y + Math.cos(time * morphSpeed + p.phase * 1.2) * morphOffset,
      p.base.z + Math.sin(time * morphSpeed + p.phase * 0.8) * morphOffset
    );
    animatedPositions.push(animated);
  }

  // Build new line geometry
  const linePositions: number[] = [];
  let linesAdded = 0;

  for (let i = 0; i < pointCount; i++) {
    for (let j = i + 1; j < pointCount; j++) {
      if (linesAdded >= maxConnections) break;

      const a = animatedPositions[i];
      const b = animatedPositions[j];
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

  // Clean up previous mesh
  if (lineMesh.current) {
    scene.remove(lineMesh.current);
    lineMesh.current.geometry.dispose();
    if (Array.isArray(lineMesh.current.material)) {
      lineMesh.current.material.forEach((m) => m.dispose());
    } else {
      lineMesh.current.material.dispose();
    }
    lineMesh.current.visible = false;
    lineMesh.current = null;
  }

  // Add new mesh
  lineMesh.current = newLineMesh;
  scene.add(lineMesh.current);
};