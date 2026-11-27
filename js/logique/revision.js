// Mode Révision : cartes recto (image) / verso (mot), méthode des 5 boîtes (Leitner).
// Boîte 1 = à revoir tout de suite … boîte 5 = bien sue, revue dans 14 jours.
export const INTERVALLES = [0, 0, 1, 3, 7, 14]; // jours d'attente par boîte (index 1 à 5)
export const MAX_PAR_JOUR = 20;

export function ajouterJours(dateISO, jours) {
  const d = new Date(dateISO + 'T12:00:00Z');
  d.setUTCDate(d.getUTCDate() + jours);
  return d.toISOString().slice(0, 10);
}

export function cartesDuJour(etat, ids, aujourdhui) {
  return ids
    .map((id, ordre) => ({ id, ordre, c: etat[id] }))
    .filter(x => !x.c || x.c.prochaine <= aujourdhui)
    // D'abord les cartes déjà vues (les moins sues en tête), puis les nouvelles.
    .sort((a, b) => ((a.c?.boite ?? 6) - (b.c?.boite ?? 6)) || (a.ordre - b.ordre))
    .slice(0, MAX_PAR_JOUR)
    .map(x => x.id);
}

export function repondre(etat, id, su, aujourdhui) {
  const avant = etat[id]?.boite ?? 1;
  const boite = su ? Math.min(5, avant + 1) : 1;
  return { ...etat, [id]: { boite, prochaine: ajouterJours(aujourdhui, INTERVALLES[boite]) } };
}
