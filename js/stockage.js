// Enregistrement de la progression dans le téléphone (localStorage).
// Ne plante jamais : en cas de souci, on repart d'un état propre et ecrire() renvoie false.
import { reparerEtat } from './logique/progression.js';

const CLE = 'seogi-quest';

export function creerStockage(memoire) {
  return {
    lire() {
      try { return reparerEtat(JSON.parse(memoire.getItem(CLE) ?? 'null')); }
      catch { return reparerEtat(null); }
    },
    ecrire(etat) {
      try { memoire.setItem(CLE, JSON.stringify(etat)); return true; }
      catch { return false; }
    },
  };
}
