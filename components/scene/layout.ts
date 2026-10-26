// Shared world layout (1 unit ≈ 1 m). The street runs along -z.

export const ROAD = 4; // kerbs at x = ±4
export const FACADE = 6.5; // building line at x = ±6.5

/** The client's shopfront on the right-hand side: occupies z ∈ [z, z + w] */
export const HERO_SLOT = { z: -46, w: 10 };
