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
