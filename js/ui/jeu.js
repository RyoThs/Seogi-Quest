import { niveauParId } from '../donnees/niveaux.js';
import { lettresDuMot } from '../logique/partie.js';
import { quatreVues } from '../dessin/vues.js';
import { ICONES } from './icones.js';
import { ficheMot } from './fiche.js';
import { proteger, echapper } from './cloison.js';

export function ecranJeu(session) {
  const niv = niveauParId(session.niveauId);
  const mot = session.liste[session.index];
  const haut = `<div class="haut"><button class="btn-texte retour" data-action="aller" data-vers="#/niveaux${niv.type === 'dan' ? '/dan' : ''}">${ICONES.retour}${echapper(niv.nom)}</button><span>${session.index + 1} / ${session.liste.length}</span></div>`;
  if (session.statut === 'trouve') {
    const dernier = session.index >= session.liste.length - 1;
    return haut + `<span class="trouve">${ICONES.coche}Trouvé</span>${ficheMot(mot)}
      <button class="btn" data-action="suivant">${dernier ? 'Niveau terminé · Voir les niveaux' : 'Mot suivant'}</button>`;
  }
  const p = session.partie;
  const images = proteger('Les images', () => `<div class="images">${quatreVues(mot).map(s => `<div class="illus">${s}</div>`).join('')}</div>`, { pluriel: true });
  let k = 0;
  const mots = lettresDuMot(mot.mot);
  const long = mots.flat().length > 10;
  const cases = mots.map(m => '<span class="mot">' + m.map(() => {
    const r = p.reponse[k++];
    return `<span class="case${r ? ' pleine' : ''}${r?.indice ? ' indice' : ''}">${r ? r.lettre : ''}</span>`;
  }).join('') + '</span>').join('');
  const tuiles = p.grille.map((l, i) => `<button class="tuile" data-action="lettre" data-i="${i}" data-lettre="${l}"${p.reponse.some(r => r.case === i) ? ' disabled' : ''} aria-label="Lettre ${l}">${l}</button>`).join('');
  return haut + images +
    `<div class="cases${long ? ' long' : ''}${session.statut === 'faux' ? ' faux' : ''}" data-solution="${echapper(mot.mot)}" aria-label="Réponse">${cases}</div>
    <div class="avis">${session.statut === 'faux' ? 'Pas tout à fait, réessaie !' : ''}</div>
    <div class="tuiles">${tuiles}</div>
    <div class="outils">
      <button class="btn-texte" data-action="indice">${ICONES.ampoule}Indice</button>
      <button class="btn-texte" data-action="effacer">${ICONES.effacer}Effacer</button>
      <button class="btn-texte" data-action="passer">Passer${ICONES.passer}</button>
    </div>`;
}
