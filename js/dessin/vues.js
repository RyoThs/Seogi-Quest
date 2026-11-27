// Les 4 images d'un mot : principale, pieds vus de dessus (position) ou gros plan (technique),
// miroir, et mouvement (pose de départ en transparence + flèche).
import { JAMBES } from './poses.js';
import { dessinerPersonnage, squelette, DEFS, COULEURS } from './personnage.js';

const FOND = '#ebe6dc', ROUGE = '#b3262e', GRIS = '#7a7368';
const r1 = n => Math.round(n * 10) / 10;
const sol = `<line x1="40" y1="357" x2="360" y2="357" stroke="#1a181422" stroke-width="2"/>`;
const ombre = `<ellipse cx="200" cy="358" rx="120" ry="7" fill="#1a181414"/>`;

const CADRE = '30 40 340 340';
const svg = (vue, contenu, vb = CADRE) =>
  `<svg viewBox="${vb}" data-vue="${vue}" xmlns="http://www.w3.org/2000/svg" role="img" preserveAspectRatio="xMidYMid meet">${DEFS}` +
  `<rect x="-400" y="-400" width="1200" height="1200" fill="${FOND}"/>${contenu}</svg>`;

function fleche(p0, p1) {
  const mx = (p0[0] + p1[0]) / 2, my = (p0[1] + p1[1]) / 2;
  const dx = p1[0] - p0[0], dy = p1[1] - p0[1];
  const cx = mx - dy * 0.3, cy = my + dx * 0.3;
  const ang = Math.atan2(p1[1] - cy, p1[0] - cx);
  const t = (a, l) => `${r1(p1[0] - Math.cos(ang + a) * l)} ${r1(p1[1] - Math.sin(ang + a) * l)}`;
  return `<path d="M${r1(p0[0])} ${r1(p0[1])} Q${r1(cx)} ${r1(cy)} ${r1(p1[0])} ${r1(p1[1])}" fill="none" stroke="${ROUGE}" stroke-width="3" stroke-dasharray="7 6"/>` +
    `<path d="M${t(0.45, 14)} L${r1(p1[0])} ${r1(p1[1])} L${t(-0.45, 14)} Z" fill="${ROUGE}"/>`;
}

function vuePieds(mot) {
  const P = JAMBES[mot.pose.j].pieds;
  const traces = P.traces.map(([x, y, rot, pte], i) => {
    const plein = i === P.traces.length - 1;
    return `<ellipse cx="${x}" cy="${y}" rx="24" ry="${pte ? 24 : 48}" transform="rotate(${rot} ${x} ${y})" fill="${plein ? ROUGE : 'none'}" stroke="${plein ? ROUGE : COULEURS.trait}" stroke-width="3"/>`;
  }).join('');
  const lien = P.traces.length > 1
    ? `<path d="M${P.traces[0][0]} ${P.traces[0][1]} L${P.traces[1][0]} ${P.traces[1][1]}" stroke="${GRIS}" stroke-width="2" stroke-dasharray="6 6"/>` : '';
  return svg('pieds', lien + traces + `<text x="200" y="360" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="22" fill="${GRIS}">${P.texte}</text>`);
}

function vueZoom(mot) {
  const s = squelette(mot.pose);
  const c = s.frappe ? s.jAv.cheville : s.bAv.main;
  const x = Math.min(Math.max(c[0] - 120, 0), 160), y = Math.min(Math.max(c[1] - 120, 0), 160);
  return svg('zoom', sol + dessinerPersonnage(mot.pose), `${r1(x)} ${r1(y)} 240 240`);
}

function vueMouvement(mot) {
  const s1 = squelette(mot.pose);
  const depart = mot.genre === 'position' || s1.frappe
    ? { j: JAMBES[mot.pose.j].vue === 'face' ? 'moa' : (s1.frappe ? 'apseogi' : 'debout'), av: s1.face ? 'colle' : 'hanche', ar: s1.face ? 'colle' : 'hanche' }
    : { j: mot.pose.j, av: 'hanche', ar: mot.pose.ar };
  const s0 = squelette(depart);
  const [a, b] = s1.frappe || mot.genre === 'position' ? [s0.jAv.cheville, s1.jAv.cheville] : [s0.bAv.main, s1.bAv.main];
  const memePoint = Math.hypot(a[0] - b[0], a[1] - b[1]) < 12;
  return svg('mouvement', ombre + dessinerPersonnage(depart, { opacite: 0.22 }) + dessinerPersonnage(mot.pose) +
    (memePoint ? '' : fleche(a, b)));
}

export function quatreVues(mot) {
  const principale = svg('principale', ombre + sol + dessinerPersonnage(mot.pose));
  const deux = mot.genre === 'position' ? vuePieds(mot) : vueZoom(mot);
  // De face, le reflet serait identique : on montre plutôt les jambes de près.
  const miroir = JAMBES[mot.pose.j].vue === 'face'
    ? svg('jambes', ombre + sol + dessinerPersonnage(mot.pose), '90 190 220 180')
    : svg('miroir', ombre + `<g transform="translate(400,0) scale(-1,1)">${sol + dessinerPersonnage(mot.pose)}</g>`);
  return [principale, deux, miroir, vueMouvement(mot)];
}

export const imagePrincipale = mot => quatreVues(mot)[0];
