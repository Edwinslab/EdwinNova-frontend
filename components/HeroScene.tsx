"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Environment, useTexture } from "@react-three/drei";
import { useScroll, useSpring } from "framer-motion";
import { useRef, useEffect, Suspense } from "react";
import * as THREE from "three";

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const spheresRef = useRef<(THREE.Mesh|null)[]>(new Array(6).fill(null));
  
  // High quality Unsplash images related to Computer Science, Linux, and Dev
  const textures = useTexture([
    "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=800", // Linux / Terminal
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800", // Coding setup
    "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800", // GitHub / Code
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800", // Javascript / HTML
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800", // Laptop terminal
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800"  // Computer desk
  ]);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001
  });

  const mousePos = useRef(new THREE.Vector2(-999, -999));
  const lastHoverTime = useRef(-999);
  const lastSplitTime = useRef(-999);
  const numBallsRef = useRef(1); // 1 to 6
  const repels = useRef(new Array(6).fill(0).map(() => new THREE.Vector2(0, 0)));

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useFrame((state, delta) => {
    const p = smoothProgress.get(); 
    const baseX = 3 - p * 3;
    const centerZ = -2;

    if (groupRef.current) {
      groupRef.current.position.set(baseX, 0, centerZ);
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15 + p * Math.PI * 4;
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.1 + p * Math.PI * 2;
    }

    const target = new THREE.Vector3();
    const aspect = window.innerWidth / window.innerHeight;
    let anyHovered = false;

    for (let i = 0; i < 6; i++) {
      const mesh = spheresRef.current[i];
      if (!mesh) continue;
      if (mesh.scale.x < 0.1) continue; // Skip deeply hidden balls

      mesh.getWorldPosition(target);
      target.project(state.camera);
      const dx = (target.x - mousePos.current.x) * aspect;
      const dy = target.y - mousePos.current.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      
      if (dist < 0.5) {
        anyHovered = true;
      }

      // Evasion repel force calculation
      const isHoverActive = state.clock.elapsedTime - lastHoverTime.current < 4.0;
      if (isHoverActive && dist < 0.8) {
        const force = (0.8 - dist) * 4;
        const len = Math.max(0.01, dist);
        repels.current[i].x += (dx / len) * force * delta;
        repels.current[i].y += (dy / len) * force * delta;
      }

      repels.current[i].clampLength(0, 4);
      repels.current[i].lerp(new THREE.Vector2(0, 0), delta * 2);
    }

    if (anyHovered) {
      lastHoverTime.current = state.clock.elapsedTime;
      // Split cooldown is 0.6 seconds so it feels satisfying
      if (state.clock.elapsedTime - lastSplitTime.current > 0.6 && numBallsRef.current < 6) {
        numBallsRef.current += 1;
        lastSplitTime.current = state.clock.elapsedTime;
      }
    }

    // Join back sequentially if not hovered for a while
    if (state.clock.elapsedTime - lastHoverTime.current > 3.0) {
      if (state.clock.elapsedTime - lastSplitTime.current > 0.3 && numBallsRef.current > 1) {
        numBallsRef.current -= 1;
        lastSplitTime.current = state.clock.elapsedTime;
      }
    }

    const N = numBallsRef.current;
    const baseScale = 1.8 - p * 0.5;

    for (let i = 0; i < 6; i++) {
        const mesh = spheresRef.current[i];
        if (!mesh) continue;

        let tScale = 0;
        let tx = 0, ty = 0, tz = 0;

        if (i < N) {
            // make them smaller when there's more balls
            tScale = baseScale * (1 - (N - 1) * 0.12);
            if (N > 1) {
                const radius = 0.5 + N * 0.25;
                const angle = (i / N) * Math.PI * 2 + state.clock.elapsedTime * 0.3;
                tx = Math.cos(angle) * radius;
                ty = Math.sin(angle) * radius;
            }
            tx += repels.current[i].x;
            ty += repels.current[i].y;
        }

        mesh.scale.lerp(new THREE.Vector3(tScale, tScale, tScale), delta * 5);
        mesh.position.lerp(new THREE.Vector3(tx, ty, tz), delta * 5);
        
        // Let the images spin lightly
        mesh.rotation.y = state.clock.elapsedTime * 0.1 + i;
        mesh.rotation.x = state.clock.elapsedTime * 0.05 + i;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <group ref={groupRef}>
          {textures.map((tex, i) => (
             <Sphere key={i} ref={(el) => { spheresRef.current[i] = el as THREE.Mesh; }} args={[1, 64, 64]}>
               <MeshDistortMaterial
                  map={tex}
                  color={i === 0 ? "#9BE931" : "#ffffff"} 
                  attach="material"
                  distort={0.4}
                  speed={1.5}
                  roughness={0.1}
                  metalness={0.8}
                  envMapIntensity={1}
               />
             </Sphere>
          ))}
        </group>
      </Float>
      <Environment preset="city" />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
