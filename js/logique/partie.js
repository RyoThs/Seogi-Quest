// Logique pure d'une partie « 4 images 1 mot » : aucune page, aucun stockage.
// Chaque fonction renvoie un NOUVEL état (on ne modifie jamais l'ancien).

const ALPHABET = 'ABCDEGHIJKLMNOPRSTUY';

export function normaliser(mot) {
  return mot.toUpperCase().replace(/[^A-Z]/g, '');
}

export function lettresDuMot(mot) {
  return mot.toUpperCase().trim().split(/\s+/).map(m => [...normaliser(m)]);
}

// Grille de lettres : celles du mot + des lettres pièges, le tout mélangé.
export function melangerLettres(mot, taille = 12, hasard = Math.random) {
  const lettres = [...normaliser(mot)];
  const total = Math.max(taille, Math.ceil(lettres.length / 6) * 6);
  while (lettres.length < total) lettres.push(ALPHABET[Math.floor(hasard() * ALPHABET.length)]);
  for (let i = lettres.length - 1; i > 0; i--) {
    const j = Math.floor(hasard() * (i + 1));
    [lettres[i], lettres[j]] = [lettres[j], lettres[i]];
  }
  return lettres;
}

export function creerPartie(mot, hasard = Math.random) {
  return { mot, solution: normaliser(mot), grille: melangerLettres(mot, 12, hasard), reponse: [] };
}

const utilisee = (p, i) => p.reponse.some(r => r.case === i);

export function poserLettre(p, indexCase) {
  if (estComplet(p) || indexCase < 0 || indexCase >= p.grille.length || utilisee(p, indexCase)) return p;
  return { ...p, reponse: [...p.reponse, { lettre: p.grille[indexCase], case: indexCase }] };
}

export function effacer(p) {
  const dernier = p.reponse[p.reponse.length - 1];
  if (!dernier || dernier.indice) return p;
  return { ...p, reponse: p.reponse.slice(0, -1) };
}

export const estComplet = p => p.reponse.length >= p.solution.length;
export const estJuste = p => estComplet(p) && p.reponse.map(r => r.lettre).join('') === p.solution;

// Indice : garde les bonnes lettres déjà posées au début, retire le reste,
// puis pose la lettre juste suivante (verrouillée).
export function donnerIndice(p) {
  let n = 0;
  while (n < p.reponse.length && p.reponse[n].lettre === p.solution[n]) n++;
  if (n >= p.solution.length) return p;
  const gardees = p.reponse.slice(0, n);
  const libres = p.grille.map((l, i) => i).filter(i => !gardees.some(r => r.case === i));
  const i = libres.find(k => p.grille[k] === p.solution[n]);
  if (i === undefined) return p;
  return { ...p, reponse: [...gardees, { lettre: p.solution[n], case: i, indice: true }] };
}
