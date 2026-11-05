"use client";
/* eslint-disable react-hooks/immutability -- Three.js/R3F: Szene, Uniforms und Materialien werden bewusst imperativ pro Frame mutiert (außerhalb des React-Renders). */

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/* ──────────────────────────────────────────────────────────────────────────
   Prozedurale Liquid-Metal-Skulptur
   MeshPhysicalMaterial (PBR) + Vertex-Displacement per 3D-Simplex-Noise.
   Normalen werden im Shader über Nachbarpunkte neu berechnet, damit die
   Lichtreflexe der verformten Oberfläche korrekt folgen.
   ────────────────────────────────────────────────────────────────────────── */

const NOISE_GLSL = /* glsl */ `
uniform float uTime;
uniform float uAmp;
uniform float uScroll;

vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

// Geschichtete, langsam fließende Verformung: große Masse + feine Wellen
float seDisplace(vec3 p){
  float t=uTime;
  vec3 q=p*0.62+vec3(t*0.09,t*0.06,-t*0.04);
  float warp=snoise(q*0.7+vec3(0.0,t*0.07,0.0));
  float big=snoise(q+warp*0.45);
  float mid=snoise(p*1.35+vec3(-t*0.14,t*0.1,t*0.08)+warp*0.5)*0.26;
  float ripple=sin((p.y+warp*0.5)*3.2+t*0.7)*0.035;
  return (big*0.75+mid+ripple)*uAmp*(1.0-uScroll*0.45);
}

vec3 seOrthogonal(vec3 v){
  return normalize(abs(v.x)>abs(v.z)?vec3(-v.y,v.x,0.0):vec3(0.0,-v.z,v.y));
}
`;

function useLiquidMaterial(uniforms: { uTime: { value: number }; uAmp: { value: number }; uScroll: { value: number } }) {
  return useMemo(() => {
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#6e1830"),
      metalness: 0.72,
      roughness: 0.2,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      sheen: 0.6,
      sheenColor: new THREE.Color("#ff5c84"),
      sheenRoughness: 0.4,
      envMapIntensity: 1.05,
    });
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = uniforms.uTime;
      shader.uniforms.uAmp = uniforms.uAmp;
      shader.uniforms.uScroll = uniforms.uScroll;
      shader.vertexShader = shader.vertexShader
        .replace("#include <common>", `#include <common>\n${NOISE_GLSL}`)
        .replace(
          "#include <beginnormal_vertex>",
          /* glsl */ `
          vec3 seN = normalize(normal);
          vec3 seT = seOrthogonal(seN);
          vec3 seB = normalize(cross(seN, seT));
          float seEps = 0.012;
          vec3 seP0 = position + seN * seDisplace(position);
          vec3 sePt = position + seT * seEps;
          vec3 sePb = position + seB * seEps;
          sePt += normalize(sePt) * seDisplace(sePt);
          sePb += normalize(sePb) * seDisplace(sePb);
          vec3 objectNormal = normalize(cross(sePt - seP0, sePb - seP0));
          #ifdef USE_TANGENT
            vec3 objectTangent = vec3( tangent.xyz );
          #endif
          `,
        )
        .replace("#include <begin_vertex>", "vec3 transformed = seP0;");
    };
    mat.customProgramCacheKey = () => "se-liquid-v1";
    return mat;
  }, [uniforms]);
}

type SceneProps = { detail: number; pointer: boolean };

function Environment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const env = pmrem.fromScene(room, 0.035).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.55;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
      room.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
        }
      });
    };
  }, [gl, scene]);
  return null;
}

function Sculpture({ detail, pointer }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Group>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uAmp: { value: 0.0 }, uScroll: { value: 0 } }), []);
  const material = useLiquidMaterial(uniforms);
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.35, detail), [detail]);
  const target = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  useEffect(() => () => {
    material.dispose();
    geometry.dispose();
  }, [material, geometry]);

  useEffect(() => {
    if (!pointer) return;
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [pointer]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 30);
    uniforms.uTime.value += dt;
    // Sanftes Einblenden der Verformung
    uniforms.uAmp.value = THREE.MathUtils.damp(uniforms.uAmp.value, 0.5, 0.9, dt);

    // Scroll: Skulptur weicht zurück, beruhigt sich und dunkelt ab
    const heroH = window.innerHeight || 1;
    const s = THREE.MathUtils.clamp(window.scrollY / heroH, 0, 1);
    uniforms.uScroll.value = s;

    if (group.current) {
      const g = group.current;
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, target.current.x * 0.35, 2.2, dt);
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, target.current.y * 0.22, 2.2, dt);
      g.position.y = THREE.MathUtils.damp(g.position.y, s * 1.4, 4, dt);
      const scale = 1 - s * 0.28;
      g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, scale, 4, dt));
    }
    if (mesh.current) {
      mesh.current.rotation.y += dt * 0.06;
      mesh.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.15) * 0.15;
    }
    if (ring.current) {
      ring.current.rotation.z += dt * 0.08;
    }
  });

  // Komposition: auf breiten Screens rechts versetzt, mobil zentriert/oben
  const wide = viewport.aspect > 1.1;
  const x = wide ? Math.min(viewport.width * 0.27, 3) : 0.35;
  const y = wide ? 0.05 : viewport.height * 0.25;
  const base = wide ? 0.92 : Math.min(0.52, viewport.width / 3.2);

  return (
    <group position={[x, y, 0]} scale={base}>
      <group ref={group}>
        <mesh ref={mesh} geometry={geometry} material={material} />
        {/* Architektonischer Orbit: Feinlinie + Lime-Puls */}
        <group ref={ring} rotation={[1.15, 0.2, 0]}>
          <mesh>
            <torusGeometry args={[2.25, 0.0045, 8, 220]} />
            <meshBasicMaterial color="#f4f1eb" transparent opacity={0.22} />
          </mesh>
          <mesh position={[2.25, 0, 0]}>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshBasicMaterial color="#c8ff33" toneMapped={false} />
          </mesh>
        </group>
        <mesh rotation={[1.4, -0.5, 0.3]}>
          <torusGeometry args={[2.9, 0.003, 6, 220]} />
          <meshBasicMaterial color="#8c2240" transparent opacity={0.45} />
        </mesh>
      </group>
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.08} />
      {/* Key: warmes Studiolicht oben rechts */}
      <directionalLight position={[4, 5, 3]} intensity={2.2} color="#fff1e6" />
      {/* Rim: Bordeaux von hinten links */}
      <spotLight position={[-6, 2, -4]} intensity={60} angle={0.6} penumbra={1} color="#ff2a5a" />
      {/* Kühle Kante unten */}
      <pointLight position={[0, -4, 2]} intensity={6} color="#6d6a8a" />
      {/* Hauch Lime als Akzent */}
      <pointLight position={[3, -2, 3]} intensity={1.4} color="#c8ff33" distance={7} />
    </>
  );
}

type Props = {
  quality: "high" | "low";
  active: boolean;
  onReady?: () => void;
};

export default function HeroScene({ quality, active, onReady }: Props) {
  const dpr: [number, number] = quality === "high" ? [1, 1.75] : [1, 1.25];
  return (
    <Canvas
      dpr={dpr}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 6.2], fov: 35, near: 0.1, far: 50 }}
      gl={{ antialias: quality === "high", alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        onReady?.();
      }}
      aria-hidden="true"
    >
      <Environment />
      <Lights />
      <Sculpture detail={quality === "high" ? 64 : 28} pointer={quality === "high"} />
    </Canvas>
  );
}
