import type { LineBuilder } from "./lineBuilder";

// Building generators. Local frame: facade on z = 0 facing +z, width along +x
// (0…w), depth back to z = -d, ground at y = 0. Place them with lb.setTransform().

const DEPTH = 8;

export function terrace(lb: LineBuilder, w: number, rand: () => number) {
  const h = 5.4 + rand() * 1.0;
  const ridge = h + 2 + rand() * 0.6;
  const d = DEPTH;

  lb.box(0, 0, -d, w, h, 0);
  // Pitched roof, ridge parallel to the street
  lb.seg(0, h, 0, 0, ridge, -d / 2).seg(0, ridge, -d / 2, 0, h, -d);
  lb.seg(w, h, 0, w, ridge, -d / 2).seg(w, ridge, -d / 2, w, h, -d);
  lb.seg(0, ridge, -d / 2, w, ridge, -d / 2);
  // Chimney on the party wall
  const cx = w - 0.9;
  lb.box(cx, ridge - 0.6, -d / 2 - 0.35, cx + 0.7, ridge + 0.9, -d / 2 + 0.35);

  // Door + fanlight
  const dx = rand() > 0.5 ? 0.5 : w - 1.6;
  lb.rect(dx, 0, dx + 1.1, 2.2, 0.02).rect(dx, 2.3, dx + 1.1, 2.6, 0.02);

  // Ground floor: bay window or flat window
  const gx0 = dx < w / 2 ? dx + 1.7 : 0.6;
  const gx1 = gx0 + Math.min(2.4, w - 3.2);
  withGlow(lb, rand() < 0.18, () => {
    if (rand() > 0.4) {
      lb.box(gx0, 0.5, 0, gx1, 2.7, 0.6);
      lb.window(gx0 + 0.15, 0.8, gx1 - 0.15, 2.5, 0.62);
    } else {
      lb.window(gx0, 0.8, gx1, 2.5);
    }
  });

  // Upper floor windows
  const n = w > 5.5 ? 2 : 1;
  for (let i = 0; i < n; i++) {
    const ww = 1.2;
    const x = n === 1 ? w / 2 - ww / 2 : 0.8 + i * (w - 1.6 - ww);
    withGlow(lb, rand() < 0.12, () => lb.window(x, h - 2.4, x + ww, h - 0.6));
  }
  return h;
}

export function shopfront(lb: LineBuilder, w: number, rand: () => number) {
  const h = 6.8 + rand() * 1.6;
  const d = DEPTH;
  lb.box(0, 0, -d, w, h, 0);
  // Parapet
  lb.seg(0, h + 0.5, 0, w, h + 0.5, 0).seg(0, h, 0, 0, h + 0.5, 0).seg(w, h, 0, w, h + 0.5, 0);

  // Shop window, door, sign band
  const door = 1.1;
  withGlow(lb, rand() < 0.2, () => lb.rect(0.35, 0.4, w - door - 0.7, 2.9, 0.02));
  lb.seg(0.35, 2.2, 0.02, w - door - 0.7, 2.2, 0.02);
  lb.rect(w - door - 0.4, 0, w - 0.4, 2.9, 0.02);
  lb.rect(0.2, 3.1, w - 0.2, 3.8, 0.04);

  // Awning on some
  if (rand() > 0.55) {
    lb.seg(0.3, 3.05, 0.02, 0.3, 2.6, 1.3).seg(w - 0.3, 3.05, 0.02, w - 0.3, 2.6, 1.3);
    lb.seg(0.3, 2.6, 1.3, w - 0.3, 2.6, 1.3);
  }

  // Upper windows
  const n = Math.max(2, Math.floor(w / 2.2));
  const gap = w / n;
  for (let i = 0; i < n; i++) {
    const x = i * gap + gap / 2 - 0.55;
    withGlow(lb, rand() < 0.1, () => lb.window(x, 4.6, x + 1.1, 6.2));
  }
  return h;
}

/** The client's shopfront: bigger, more detailed, with a workspace inside. */
export function heroShop(lb: LineBuilder) {
  const w = 10;
  const h = 8.5;
  const d = 12;

  lb.box(0, 0, -d, w, h, 0);
  // Stepped parapet
  lb.rect(0, h, w, h + 0.6, 0);
  lb.rect(3, h + 0.6, w - 3, h + 1.3, 0);

  // Big shop window with mullions (the camera flies through this)
  lb.rect(0.6, 0.5, 6.8, 3.6, 0.02);
  lb.seg(2.67, 0.5, 0.02, 2.67, 3.6, 0.02).seg(4.73, 0.5, 0.02, 4.73, 3.6, 0.02);
  lb.seg(0.6, 2.9, 0.02, 6.8, 2.9, 0.02);
  // Door
  lb.rect(7.4, 0, 9.2, 3.2, 0.02).seg(8.3, 0, 0.02, 8.3, 3.2, 0.02);
  // Sign board with "lettering" strokes
  lb.rect(0.4, 4.0, w - 0.4, 5.0, 0.06);
  for (let i = 0; i < 9; i++) {
    const x = 1.6 + i * 0.75;
    lb.seg(x, 4.25, 0.07, x + 0.45, 4.75, 0.07);
  }
  // Upper floor
  for (let i = 0; i < 3; i++) {
    const x = 0.9 + i * 3.1;
    lb.window(x, 5.7, x + 2.0, 7.7);
  }
  // Rooftop "signal" mast
  lb.seg(w / 2, h + 1.3, -1, w / 2, h + 4, -1);
  lb.seg(w / 2 - 0.6, h + 3.2, -1, w / 2 + 0.6, h + 3.2, -1);

  // Interior workspace: grid floor + ceiling, desk, laptop
  const z0 = -0.6;
  const z1 = -d + 0.4;
  for (let x = 1; x < w; x += 1) {
    lb.seg(x, 0.01, z0, x, 0.01, z1);
    lb.seg(x, 3.6, z0, x, 3.6, z1);
  }
  for (let z = z0; z > z1; z -= 1) {
    lb.seg(0.3, 0.01, z, w - 0.3, 0.01, z);
    lb.seg(0.3, 3.6, z, w - 0.3, 3.6, z);
  }
  // Desk
  lb.box(2.5, 0.75, -7.2, 7.5, 0.8, -5.8);
  for (const [x, z] of [[2.6, -7.1], [7.4, -7.1], [2.6, -5.9], [7.4, -5.9]]) {
    lb.seg(x, 0, z, x, 0.75, z);
  }
  // Laptop: base outline + open screen
  lb.seg(4.3, 0.8, -6.6, 5.7, 0.8, -6.6).seg(4.3, 0.8, -6.6, 4.3, 0.8, -6.0).seg(5.7, 0.8, -6.6, 5.7, 0.8, -6.0);
  lb.seg(4.3, 0.8, -6.0, 5.7, 0.8, -6.0);
  lb.rect(4.3, 0.8, 5.7, 1.75, -6.65);
  return { w, h, d };
}

export function van(lb: LineBuilder) {
  // Local: length along -z (front at z = -5.4), width x -1…1
  const L = 5.4;
  lb.box(-1, 0.45, -3.9, 1, 2.5, 0); // cargo
  // Cab with sloped windscreen
  for (const x of [-1, 1]) {
    lb.seg(x, 0.45, -3.9, x, 0.45, -L)
      .seg(x, 0.45, -L, x, 1.2, -L)
      .seg(x, 1.2, -L, x, 2.1, -4.6)
      .seg(x, 2.1, -4.6, x, 2.5, -3.9);
  }
  lb.seg(-1, 0.45, -L, 1, 0.45, -L).seg(-1, 1.2, -L, 1, 1.2, -L).seg(-1, 2.1, -4.6, 1, 2.1, -4.6);
  // Side door
  lb.seg(1.01, 0.6, -1.2, 1.01, 2.3, -1.2).seg(-1.01, 0.6, -1.2, -1.01, 2.3, -1.2);
  // Wheels
  for (const x of [-1.02, 1.02]) {
    lb.circleYZ(x, 0.45, -0.9, 0.42).circleYZ(x, 0.45, -4.4, 0.42);
  }
  // Livery stripe
  lb.seg(1.02, 1.5, -0.2, 1.02, 1.5, -3.7).seg(-1.02, 1.5, -0.2, -1.02, 1.5, -3.7);
}

export function lampPost(lb: LineBuilder, dir: 1 | -1) {
  lb.seg(0, 0, 0, 0, 5.6, 0);
  lb.seg(0, 5.6, 0, dir * 1.2, 5.8, 0);
  const g = lb.glow;
  lb.glow = 1;
  lb.rect(dir * 1.0, 5.5, dir * 1.45, 5.7, 0);
  lb.glow = g;
}

function withGlow(lb: LineBuilder, on: boolean, draw: () => void) {
  const g = lb.glow;
  if (on) lb.glow = 1;
  draw();
  lb.glow = g;
}
