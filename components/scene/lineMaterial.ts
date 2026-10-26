import { Color, NormalBlending, ShaderMaterial } from "three";

export const palette = {
  bg: new Color("#020617"),
  line: new Color("#f8fafc"),
  slate: new Color("#94a3b8"),
  accent: new Color("#d4af37"),
  accent2: new Color("#f59e0b"),
};

type Opts = {
  opacity: number;
  color?: Color;
  fogNear?: number;
  fogFar?: number;
};

// Edge-line material: base slate/white lines that light up gold as uLit sweeps past
// each vertex's aSeed. Fog is computed by view depth so lines fade into --bg.
export function createLineMaterial({ opacity, color = palette.line, fogNear = 25, fogFar = 150 }: Opts) {
  return new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    // Normal (not additive) blending: overlapping lines at the vanishing point
    // can't stack past their own colour and blow out.
    blending: NormalBlending,
    toneMapped: false,
    uniforms: {
      uBase: { value: color.clone() },
      uAccent: { value: palette.accent.clone() },
      uAccent2: { value: palette.accent2.clone() },
      uOpacity: { value: opacity },
      uLit: { value: 0 },
      uDim: { value: 0 },
      uGlow: { value: 0.55 },
      uFogNear: { value: fogNear },
      uFogFar: { value: fogFar },
    },
    vertexShader: /* glsl */ `
      attribute float aSeed;
      attribute float aH;
      attribute float aGlow;
      varying float vSeed;
      varying float vH;
      varying float vGlow;
      varying float vDepth;
      void main() {
        vSeed = aSeed;
        vH = aH;
        vGlow = aGlow;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uBase;
      uniform vec3 uAccent;
      uniform vec3 uAccent2;
      uniform float uOpacity;
      uniform float uLit;
      uniform float uDim;
      uniform float uGlow;
      uniform float uFogNear;
      uniform float uFogFar;
      varying float vSeed;
      varying float vH;
      varying float vGlow;
      varying float vDepth;
      void main() {
        float lit = smoothstep(vSeed, vSeed + 0.04, uLit);
        vec3 gold = mix(uAccent, uAccent2, vH * 0.7);
        float glow = vGlow * uGlow * (1.0 - lit);
        vec3 col = mix(uBase, gold, max(lit, step(0.001, vGlow)));
        float a = mix(uOpacity, 1.0, lit);
        a = max(a, glow);
        float fog = smoothstep(uFogNear, uFogFar, vDepth);
        float near = smoothstep(2.0, 12.0, vDepth); // fade lines right in front of the lens
        a *= (1.0 - fog) * near * (1.0 - uDim * 0.6);
        gl_FragColor = vec4(col, a);
      }
    `,
  });
}
