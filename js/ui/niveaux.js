import { NIVEAUX } from '../donnees/niveaux.js';
import { MOTS } from '../donnees/mots.js';
import { avancement } from '../logique/progression.js';
import { ICONES } from './icones.js';
import { echapper } from './cloison.js';

// Ceinture dessinée en tons d'encre, du clair (8e keup) au noir (dans).
const TEINTES = ['#f1ece2', '#e3dccd', '#d2c8b5', '#bdb19b', '#a39780', '#877b66', '#6a604f', '#4d4539'];

export function ecranNiveaux({ etat, onglet }) {
  const type = onglet === 'dan' ? 'dan' : 'keup';
  const liste = NIVEAUX.filter(n => n.type === type).map((n, i) => {
    const a = avancement(etat, NIVEAUX, MOTS, n.id), fini = a.trouves >= a.total;
    const teinte = type === 'dan' ? '#1a1814' : TEINTES[i];
    return `<button class="niveau${fini ? ' fini' : ''}" data-action="aller" data-vers="#/jeu/${n.id}">
      <span class="ceinture" style="background:${teinte}"></span>
      <span class="nom">${echapper(n.nom)}<small>${echapper(n.poomsae)}</small></span>
      <span class="compte">${fini ? 'Terminé' : `${a.trouves} / ${a.total}`}<span class="barre"><i style="width:${Math.round((100 * a.trouves) / a.total)}%"></i></span></span></button>`;
  }).join('');
  return `<div class="haut"><button class="btn-texte retour" data-action="aller" data-vers="#/">${ICONES.retour}Accueil</button><span>Niveaux</span><span></span></div>
    <div class="onglets" role="tablist">
      <button role="tab" aria-selected="${type === 'keup'}" data-action="aller" data-vers="#/niveaux">Ceintures</button>
      <button role="tab" aria-selected="${type === 'dan'}" data-action="aller" data-vers="#/niveaux/dan">Dans</button>
    </div>${liste}`;
}
