// Proceduralt sprickmönster för crazing-bilden. Fast seed gör att mönstret är stabilt mellan renderingar.
// Mönstret är ett Voronoi-nät: slumpade punkter ger celler, och cellkanterna blir hårsprickorna.

type Pt = [number, number]

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Klipper en polygon mot halvplanet "närmare p än q" (Sutherland–Hodgman). */
function clipToCloser(poly: Pt[], p: Pt, q: Pt): Pt[] {
  // Punkter x där |x-p| <= |x-q|  <=>  (q-p)·x <= (|q|²-|p|²)/2
  const nx = q[0] - p[0]
  const ny = q[1] - p[1]
  const c = (q[0] * q[0] + q[1] * q[1] - p[0] * p[0] - p[1] * p[1]) / 2
  const side = (x: Pt) => nx * x[0] + ny * x[1] - c // <= 0 är innanför
  const out: Pt[] = []
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i]
    const b = poly[(i + 1) % poly.length]
    const sa = side(a)
    const sb = side(b)
    if (sa <= 0) out.push(a)
    if (sa <= 0 !== sb <= 0) {
      const t = sa / (sa - sb)
      out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t])
    }
  }
  return out
}

/** Bygger ett nät av hårsprickor som en SVG-path. */
export function crackPath(size = 400, seed = 7): string {
  const rnd = mulberry32(seed)
  const n = 9
  const cell = size / n
  const pts: Pt[] = []
  for (let gy = -1; gy <= n; gy++) {
    for (let gx = -1; gx <= n; gx++) {
      pts.push([(gx + 0.1 + rnd() * 0.8) * cell, (gy + 0.1 + rnd() * 0.8) * cell])
    }
  }

  const f = (v: number) => v.toFixed(1)
  const d: string[] = []

  for (const p of pts) {
    if (p[0] < 0 || p[0] > size || p[1] < 0 || p[1] > size) continue
    let poly: Pt[] = [
      [-size, -size],
      [size * 2, -size],
      [size * 2, size * 2],
      [-size, size * 2],
    ]
    for (const q of pts) {
      if (q === p) continue
      if (Math.hypot(q[0] - p[0], q[1] - p[1]) > cell * 2.6) continue
      poly = clipToCloser(poly, p, q)
      if (poly.length < 3) break
    }
    if (poly.length < 3) continue

    // Rundade hörn: kurva genom kantmittpunkter med hörnen som styrpunkter
    const mids = poly.map((a, i) => {
      const b = poly[(i + 1) % poly.length]
      return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2] as Pt
    })
    let s = `M${f(mids[poly.length - 1][0])} ${f(mids[poly.length - 1][1])}`
    for (let i = 0; i < poly.length; i++) {
      s += ` Q${f(poly[i][0])} ${f(poly[i][1])} ${f(mids[i][0])} ${f(mids[i][1])}`
    }
    d.push(s)
  }
  return d.join(' ')
}
