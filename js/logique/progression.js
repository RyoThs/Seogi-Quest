// Progression du joueur : logique pure (le stockage est dans js/stockage.js).
import { ajouterJours } from './revision.js';

export const PAR_NIVEAU = 8;

export const etatVide = () => ({ niveaux: {}, revision: {}, serie: { jours: 0, dernier: null } });

// Nouveaux mots du niveau d'abord, puis des mots des niveaux d'avant (révision).
export function motsDuNiveau(niveaux, mots, id, hasard = Math.random) {
  const rang = niveaux.findIndex(n => n.id === id);
  const nouveaux = mots.filter(x => x.niveau === id);
  const avant = new Set(niveaux.slice(0, Math.max(rang, 0)).map(n => n.id));
  const anciens = mots.filter(x => avant.has(x.niveau));
  for (let i = anciens.length - 1; i > 0; i--) {
    const j = Math.floor(hasard() * (i + 1));
    [anciens[i], anciens[j]] = [anciens[j], anciens[i]];
  }
  return [...nouveaux, ...anciens].slice(0, Math.max(PAR_NIVEAU, nouveaux.length));
}

export function marquerTrouve(etat, niveauId, motId) {
  const deja = etat.niveaux[niveauId] ?? [];
  if (deja.includes(motId)) return etat;
  return { ...etat, niveaux: { ...etat.niveaux, [niveauId]: [...deja, motId] } };
}

export function avancement(etat, niveaux, mots, id) {
  const total = motsDuNiveau(niveaux, mots, id, () => 0).length;
  return { trouves: Math.min((etat.niveaux[id] ?? []).length, total), total };
}

export const totalTrouves = etat => new Set(Object.values(etat.niveaux).flat()).size;

export function majSerie(serie, aujourdhui) {
  if (serie.dernier === aujourdhui) return serie;
  const suite = serie.dernier && ajouterJours(serie.dernier, 1) === aujourdhui;
  return { jours: suite ? serie.jours + 1 : 1, dernier: aujourdhui };
}

// Données lues dans le téléphone : on ne leur fait pas confiance.
export function reparerEtat(brut) {
  const e = etatVide();
  if (!brut || typeof brut !== 'object') return e;
  if (brut.niveaux && typeof brut.niveaux === 'object' && !Array.isArray(brut.niveaux))
    for (const [k, v] of Object.entries(brut.niveaux))
      if (Array.isArray(v)) e.niveaux[k] = v.filter(x => typeof x === 'string');
  if (brut.revision && typeof brut.revision === 'object' && !Array.isArray(brut.revision))
    for (const [k, v] of Object.entries(brut.revision))
      if (v && Number.isInteger(v.boite) && typeof v.prochaine === 'string') e.revision[k] = { boite: v.boite, prochaine: v.prochaine };
  if (brut.serie && Number.isInteger(brut.serie.jours)) e.serie = { jours: brut.serie.jours, dernier: typeof brut.serie.dernier === 'string' ? brut.serie.dernier : null };
  return e;
}
