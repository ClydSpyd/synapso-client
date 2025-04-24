import * as THREE from "three";

export const createRandomSpark = ({
    scene,
    geometry,
    particleCount,
}:{
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
    sparkGeometry.setAttribute("position", new THREE.Float32BufferAttribute([ax, ay, az, bx, by, bz], 3));
  
    const sparkMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 1,
    });
  
    const sparkLine = new THREE.Line(sparkGeometry, sparkMaterial);
    scene.add(sparkLine);
  
    setTimeout(() => {
      scene.remove(sparkLine);
      sparkGeometry.dispose();
      sparkMaterial.dispose();
    }, 50);
  };

  export const updateLineConnections = ({
    scene,
    geometry,
    particleCount,
    lineMeshRef,
  }: {
    scene: THREE.Scene;
    geometry: THREE.BufferGeometry;
    particleCount: number;
    lineMeshRef: React.MutableRefObject<THREE.LineSegments | null>;
  }) => {
    const maxDistance = 1.5;
    const linePositions = [];
    const particlePositions = geometry.getAttribute("position");

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const ix = i * 3,
          jx = j * 3;
        const dx = particlePositions.array[ix] - particlePositions.array[jx];
        const dy =
          particlePositions.array[ix + 1] - particlePositions.array[jx + 1];
        const dz =
          particlePositions.array[ix + 2] - particlePositions.array[jx + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxDistance * maxDistance) {
          linePositions.push(
            particlePositions.array[ix],
            particlePositions.array[ix + 1],
            particlePositions.array[ix + 2],
            particlePositions.array[jx],
            particlePositions.array[jx + 1],
            particlePositions.array[jx + 2]
          );
        }
      }
    }

    const newLineGeometry = new THREE.BufferGeometry();
    newLineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(linePositions), 3)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.1,
    });

    const newLineMesh = new THREE.LineSegments(newLineGeometry, lineMaterial);

    // Remove old lines if present
    if (lineMeshRef.current) {
      scene.remove(lineMeshRef.current);
      lineMeshRef.current.geometry.dispose();
      lineMeshRef.current.material.dispose();
    }

    lineMeshRef.current = newLineMesh;
    scene.add(newLineMesh);
  };
  