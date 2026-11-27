// Dessine le pratiquant (SVG) à partir d'une pose { j, av, ar }.
// Style « encre » détaillé : membres en volume, plis du dobok, mains, pieds nus et visage.
import { JAMBES, BRAS } from './poses.js';

export const COULEURS = { trait: '#1a1814', dob1: '#ffffff', dob2: '#e6e0d4', peau: '#ecd2b8', peauOmbre: '#d9b596', ceinture: '#1a1814', cheveux: '#2a241e' };
const BUSTE = 92;
const r1 = n => Math.round(n * 10) / 10;
const pt = p => `${r1(p[0])} ${r1(p[1])}`;
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const mul = (a, k) => [a[0] * k, a[1] * k];
const lon = a => Math.hypot(a[0], a[1]) || 1;
const nor = a => mul(a, 1 / lon(a));
const perp = a => [-a[1], a[0]];
const unite = (a, b) => nor(sub(b, a));
const deg = d => [Math.cos(d), Math.sin(d)];
const rot = (p, c, a) => { const d = sub(p, c), co = Math.cos(a), si = Math.sin(a); return add(c, [d[0] * co - d[1] * si, d[0] * si + d[1] * co]); };

export function squelette(pose) {
  const J = JAMBES[pose.j];
  if (!J) throw new Error(`Jambes inconnues : ${pose.j}`);
  const face = J.vue === 'face';
  const incl = ((J.incl ?? 0) * Math.PI) / 180;
  const H = J.h;
  const axe = [Math.sin(incl), -Math.cos(incl)];
  const S = add(H, mul(axe, BUSTE));
  const ecH = face ? 14 : 6, ecS = face ? 24 : 6;
  const bras = (nom, cote) => {
    const B = BRAS[nom];
    if (!B) throw new Error(`Bras inconnu : ${nom}`);
    const sx = face ? cote : 1;
    const epaule = add(S, [cote * ecS, 0]);
    return { epaule, coude: add(epaule, [B.coude[0] * sx, B.coude[1]]), main: add(epaule, [B.main[0] * sx, B.main[1]]), m: B.m, cote };
  };
  return {
    face, H, S, axe, incl,
    jAr: { hanche: add(H, [-ecH, 0]), genou: J.ar[0], cheville: J.ar[1], pied: J.pAr, cote: -1 },
    jAv: { hanche: add(H, [ecH, 0]), genou: J.av[0], cheville: J.av[1], pied: J.pAv, cote: 1 },
    bAr: bras(pose.ar, -1), bAv: bras(pose.av, 1),
    frappe: !!J.frappe, saut: !!J.saut,
  };
}

// Contour lisse autour d'une ligne brisée, avec une largeur par articulation.
function contour(points, demi) {
  const n = points.length, G = [], D = [];
  for (let i = 0; i < n; i++) {
    const a = points[Math.max(0, i - 1)], b = points[Math.min(n - 1, i + 1)];
    const no = perp(nor(sub(b, a)));
    G.push(add(points[i], mul(no, demi[i]))); D.push(add(points[i], mul(no, -demi[i])));
  }
  const lisse = pts => { // Catmull-Rom → courbes de Bézier
    let d = '';
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
      const c1 = add(p1, mul(sub(p2, p0), 1 / 6)), c2 = sub(p2, mul(sub(p3, p1), 1 / 6));
      d += ` C${pt(c1)} ${pt(c2)} ${pt(p2)}`;
    }
    return d;
  };
  const Dr = [...D].reverse();
  return `M${pt(G[0])}${lisse(G)} L${pt(Dr[0])}${lisse(Dr)} Z`;
}

// Petits plis de tissu du côté intérieur d'une articulation pliée.
function plis(a, b, c, larg, couleur) {
  const u1 = unite(a, b), u2 = unite(b, c);
  const croix = u1[0] * u2[1] - u1[1] * u2[0];
  if (Math.abs(croix) < 0.15) return '';
  const bis = nor(sub(u2, u1)), cote = croix > 0 ? 1 : -1;
  let s = '';
  for (const k of [-0.9, 0, 0.9]) {
    const o = add(b, add(mul(bis, larg * 0.08), mul(perp(bis), k * larg * 0.22 * cote)));
    const e = add(o, mul(bis, larg * 0.32));
    s += `M${pt(o)} Q${pt(add(o, mul(perp(bis), 4 * cote)))} ${pt(e)} `;
  }
  return `<path d="${s}" fill="none" stroke="${couleur}" stroke-width="1.1" opacity=".55"/>`;
}

function jambe(j, s, c, w) {
  const pts = [j.hanche, j.genou, j.cheville];
  const demi = s.face ? [17, 14.5, 13] : [18, 15, 13.5];
  let out = `<path d="${contour(pts, demi)}" fill="url(#sq-dob)" stroke="${c.trait}" stroke-width="${w}"/>`;
  out += plis(...pts, 30, c.trait);
  // ourlet du pantalon
  const u = unite(j.genou, j.cheville), p = perp(u), o = add(j.cheville, mul(u, -3));
  out += `<path d="M${pt(add(o, mul(p, 13)))} L${pt(add(o, mul(p, -13)))}" stroke="${c.trait}" stroke-width="1" opacity=".5"/>`;
  return pied(j, s, c, w) + out;
}

function pied(j, s, c, w) {
  const A = j.cheville;
  if (s.face && j.pied.a === 0) {
    return `<path d="M${pt(add(A, [-9, 0]))} Q${pt(add(A, [-12, 10]))} ${pt(add(A, [-4, 12]))} L${pt(add(A, [7, 12]))} Q${pt(add(A, [13, 10]))} ${pt(add(A, [9, 0]))} Z" fill="${c.peau}" stroke="${c.trait}" stroke-width="${w}"/>`;
  }
  const a = (j.pied.a * Math.PI) / 180, d = deg(a), n = perp(d);
  const L = j.pied.pointe ? 30 : 38;
  // profil : talon arrondi, voûte, orteils
  const talon = add(A, add(mul(d, -7), mul(n, 6)));
  const dessous = add(talon, mul(d, L));
  const orteil = add(dessous, mul(n, -4));
  const cou = add(A, mul(d, 10));
  return `<path d="M${pt(add(A, mul(d, -6)))} Q${pt(add(talon, mul(d, -4)))} ${pt(talon)} Q${pt(add(talon, add(mul(d, L * 0.5), mul(n, -2))))} ${pt(dessous)} Q${pt(add(dessous, mul(d, 4)))} ${pt(orteil)} Q${pt(add(cou, mul(d, 14)))} ${pt(cou)} Z" fill="${c.peau}" stroke="${c.trait}" stroke-width="${w}" stroke-linejoin="round"/>`;
}

function bras(b, s, c, w) {
  const pts = [b.epaule, b.coude, b.main];
  const u = unite(b.coude, b.main);
  const poignet = add(b.main, mul(u, -9));
  let out = `<path d="${contour([b.epaule, b.coude, poignet], [13, 11, 10])}" fill="url(#sq-dob)" stroke="${c.trait}" stroke-width="${w}"/>`;
  out += plis(...pts, 22, c.trait);
  const p = perp(u), m = add(poignet, mul(u, -2));
  out += `<path d="M${pt(add(m, mul(p, 10)))} L${pt(add(m, mul(p, -10)))}" stroke="${c.trait}" stroke-width="1" opacity=".5"/>`;
  return out + main(b, c, w);
}

function main(b, c, w) {
  const u = unite(b.coude, b.main), n = perp(u), M = b.main;
  const ang = r1((Math.atan2(u[1], u[0]) * 180) / Math.PI);
  if (b.m === 'ouverte') {
    // paume + doigts serrés + pouce
    const base = add(M, mul(u, -6)), bout = add(M, mul(u, 22));
    const d = `M${pt(add(base, mul(n, 7)))} L${pt(add(bout, mul(n, 4.5)))} Q${pt(add(bout, mul(u, 4)))} ${pt(add(bout, mul(n, -4.5)))} L${pt(add(base, mul(n, -7)))} Z`;
    const pouce = `M${pt(add(base, add(mul(n, -6), mul(u, 2))))} Q${pt(add(M, add(mul(n, -12), mul(u, 2))))} ${pt(add(M, add(mul(n, -7), mul(u, 9))))}`;
    const doigts = [0.33, -0.33].map(k => `M${pt(add(M, add(mul(n, k * 8), mul(u, 7))))} L${pt(add(bout, mul(n, k * 8)))}`).join(' ');
    return `<path d="${d}" fill="${c.peau}" stroke="${c.trait}" stroke-width="${w}" stroke-linejoin="round"/>` +
      `<path d="${pouce}" fill="${c.peau}" stroke="${c.trait}" stroke-width="${w}"/>` +
      `<path d="${doigts}" stroke="${c.trait}" stroke-width=".9" opacity=".6"/>`;
  }
  // poing : bloc arrondi, phalanges et pouce replié
  const ctr = add(M, mul(u, 3));
  return `<g transform="rotate(${ang} ${r1(ctr[0])} ${r1(ctr[1])})">` +
    `<rect x="${r1(ctr[0] - 10)}" y="${r1(ctr[1] - 9)}" width="20" height="18" rx="7" fill="${c.peau}" stroke="${c.trait}" stroke-width="${w}"/>` +
    `<path d="M${r1(ctr[0] + 3)} ${r1(ctr[1] - 8)} L${r1(ctr[0] + 3)} ${r1(ctr[1] + 8)} M${r1(ctr[0] + 3)} ${r1(ctr[1] - 3)} L${r1(ctr[0] + 9)} ${r1(ctr[1] - 3)} M${r1(ctr[0] + 3)} ${r1(ctr[1] + 3)} L${r1(ctr[0] + 9)} ${r1(ctr[1] + 3)}" stroke="${c.trait}" stroke-width=".9" opacity=".6"/>` +
    `<path d="M${r1(ctr[0] - 6)} ${r1(ctr[1] + 7)} Q${r1(ctr[0] + 1)} ${r1(ctr[1] + 3)} ${r1(ctr[0] + 4)} ${r1(ctr[1] + 8)}" fill="none" stroke="${c.trait}" stroke-width="1"/></g>`;
}

function veste(s, c, w) {
  const { H, S, axe, face } = s, n = perp(axe);
  const lS = face ? 34 : 21, lT = face ? 27 : 22, lB = face ? 30 : 25;
  const bas = add(H, mul(axe, -20));
  const P = [add(bas, mul(n, -lB)), add(bas, mul(n, lB)), add(H, mul(n, lT)), add(S, mul(n, lS)), add(S, mul(n, -lS))];
  let out = `<path d="M${pt(P[0])} L${pt(P[1])} Q${pt(add(H, mul(n, lT + 2)))} ${pt(P[2])} L${pt(P[3])} Q${pt(add(S, mul(axe, 6)))} ${pt(P[4])} Q${pt(add(H, mul(n, -lT - 2)))} ${pt(P[0])} Z" fill="url(#sq-dob)" stroke="${c.trait}" stroke-width="${w}" stroke-linejoin="round"/>`;
  // revers croisés (veste portefeuille) et col
  const col = add(S, mul(axe, -46));
  out += `<path d="M${pt(add(S, mul(n, -11)))} L${pt(col)} L${pt(add(H, add(mul(n, face ? 16 : 10), mul(axe, 14))))}" fill="none" stroke="${c.trait}" stroke-width="${w}"/>`;
  out += `<path d="M${pt(add(S, mul(n, -6)))} L${pt(add(col, mul(n, 5)))} L${pt(add(H, add(mul(n, face ? 20 : 14), mul(axe, 15))))}" fill="none" stroke="${c.trait}" stroke-width="1" opacity=".55"/>`;
  out += `<path d="M${pt(add(S, mul(n, 11)))} L${pt(add(col, mul(n, 2)))}" fill="none" stroke="${c.trait}" stroke-width="${w}"/>`;
  // plis de la veste
  out += `<path d="M${pt(add(H, add(mul(n, -14), mul(axe, 24))))} q${pt(mul(add(axe, mul(n, .3)), 14))} ${pt(mul(add(axe, mul(n, .2)), 26))} M${pt(add(H, add(mul(n, 16), mul(axe, 22))))} q${pt(mul(add(axe, mul(n, -.2)), 10))} ${pt(mul(axe, 20))}" fill="none" stroke="${c.trait}" stroke-width="1" opacity=".45"/>`;
  // ceinture nouée
  const b0 = add(H, mul(axe, 4)), b1 = add(H, mul(axe, 13)), l = lT + 1;
  out += `<path d="M${pt(add(b0, mul(n, -l)))} L${pt(add(b0, mul(n, l)))} L${pt(add(b1, mul(n, l)))} L${pt(add(b1, mul(n, -l)))} Z" fill="${c.ceinture}"/>`;
  const k = add(add(b0, mul(axe, 4.5)), mul(n, face ? 0 : 8));
  out += `<rect x="${r1(k[0] - 5)}" y="${r1(k[1] - 5)}" width="10" height="10" rx="2" fill="${c.ceinture}"/>`;
  out += `<path d="M${pt(k)} l${pt(add(mul(axe, -24), mul(n, -6)))} M${pt(k)} l${pt(add(mul(axe, -22), mul(n, 7)))}" stroke="${c.ceinture}" stroke-width="5.5" stroke-linecap="butt"/>`;
  return out;
}

function tete(s, c, w) {
  const { S, axe, incl, face } = s;
  const C = add(S, mul(axe, 27));
  const cou = `<path d="${contour([add(S, mul(axe, 2)), add(S, mul(axe, 15))], [6.5, 6])}" fill="${c.peauOmbre}" stroke="${c.trait}" stroke-width="${w * 0.8}"/>`;
  const R = p => rot(add(C, p), C, incl);
  if (face) {
    const visage = `M${pt(R([-12, -4]))} Q${pt(R([-13, 12]))} ${pt(R([0, 17]))} Q${pt(R([13, 12]))} ${pt(R([12, -4]))} Q${pt(R([12, -17]))} ${pt(R([0, -17]))} Q${pt(R([-12, -17]))} ${pt(R([-12, -4]))} Z`;
    const cheveux = `M${pt(R([-13, -2]))} Q${pt(R([-15, -21]))} ${pt(R([0, -20]))} Q${pt(R([15, -21]))} ${pt(R([13, -2]))} Q${pt(R([9, -12]))} ${pt(R([0, -11]))} Q${pt(R([-9, -12]))} ${pt(R([-13, -2]))} Z`;
    const traits = `M${pt(R([-7, -1]))} L${pt(R([-3, -1]))} M${pt(R([3, -1]))} L${pt(R([7, -1]))} M${pt(R([0, 1]))} L${pt(R([-1, 7]))} L${pt(R([1, 7]))} M${pt(R([-3, 11]))} Q${pt(R([0, 12]))} ${pt(R([3, 11]))}`;
    const oreilles = `M${pt(R([-12, -2]))} q-3 2 0 7 M${pt(R([12, -2]))} q3 2 0 7`;
    return cou + `<path d="${visage}" fill="${c.peau}" stroke="${c.trait}" stroke-width="${w}"/>` +
      `<path d="${oreilles}" fill="${c.peau}" stroke="${c.trait}" stroke-width="${w * 0.8}"/>` +
      `<path d="${cheveux}" fill="${c.cheveux}"/><path d="${traits}" fill="none" stroke="${c.trait}" stroke-width="1.1"/>`;
  }
  // profil tourné vers la droite : crâne, front, nez, menton, oreille
  const prof = `M${pt(R([-13, -2]))} Q${pt(R([-14, -18]))} ${pt(R([0, -18]))} Q${pt(R([11, -18]))} ${pt(R([12, -6]))} L${pt(R([16, 1]))} L${pt(R([12, 3]))} Q${pt(R([13, 10]))} ${pt(R([9, 14]))} Q${pt(R([2, 17]))} ${pt(R([-4, 13]))} Q${pt(R([-12, 9]))} ${pt(R([-13, -2]))} Z`;
  const cheveux = `M${pt(R([-14, 4]))} Q${pt(R([-17, -19]))} ${pt(R([1, -19]))} Q${pt(R([12, -19]))} ${pt(R([12, -9]))} Q${pt(R([2, -12]))} ${pt(R([-3, -6]))} Q${pt(R([-6, 2]))} ${pt(R([-14, 4]))} Z`;
  const oreille = `M${pt(R([-3, -2]))} q-5 1 -4 6 q1 4 4 3`;
  const traits = `M${pt(R([5, -4]))} L${pt(R([9, -4]))} M${pt(R([7, -1]))} L${pt(R([9, -1]))} M${pt(R([8, 8]))} L${pt(R([11, 8]))}`;
  return cou + `<path d="${prof}" fill="${c.peau}" stroke="${c.trait}" stroke-width="${w}" stroke-linejoin="round"/>` +
    `<path d="${cheveux}" fill="${c.cheveux}"/>` +
    `<path d="${oreille}" fill="${c.peau}" stroke="${c.trait}" stroke-width="${w * 0.8}"/>` +
    `<path d="${traits}" fill="none" stroke="${c.trait}" stroke-width="1.1"/>`;
}

export const DEFS = `<defs><linearGradient id="sq-dob" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${COULEURS.dob1}"/><stop offset=".6" stop-color="#f6f3ee"/><stop offset="1" stop-color="${COULEURS.dob2}"/></linearGradient></defs>`;

export function dessinerPersonnage(pose, { opacite = 1, c = COULEURS, w = 1.8 } = {}) {
  const s = squelette(pose);
  const ordre = s.face
    ? [jambe(s.jAr, s, c, w), jambe(s.jAv, s, c, w), veste(s, c, w), bras(s.bAr, s, c, w), bras(s.bAv, s, c, w), tete(s, c, w)]
    : [jambe(s.jAr, s, c, w), bras(s.bAr, s, c, w), veste(s, c, w), jambe(s.jAv, s, c, w), tete(s, c, w), bras(s.bAv, s, c, w)];
  return `<g stroke-linecap="round" opacity="${opacite}">${ordre.join('')}</g>`;
}
