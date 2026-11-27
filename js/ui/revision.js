import { motParId } from '../donnees/mots.js';
import { imagePrincipale } from '../dessin/vues.js';
import { ICONES } from './icones.js';
import { ficheMot } from './fiche.js';

export function ecranRevision(rev) {
  const haut = `<div class="haut"><button class="btn-texte retour" data-action="aller" data-vers="#/">${ICONES.retour}Accueil</button><span>Révision</span><span class="compteur">${rev.file.length ? `${rev.file.length} restante${rev.file.length > 1 ? 's' : ''}` : ''}</span></div>`;
  if (rev.total === 0) return haut + `<p class="vide">Trouve d'abord des mots en jouant : ils arriveront ici pour que tu les révises au bon moment.</p>
    <button class="btn" data-action="aller" data-vers="#/niveaux">Choisir un niveau</button>`;
  if (!rev.file.length) return haut + `<p class="vide"><b>Révision terminée.</b><br>${rev.sues} sue${rev.sues > 1 ? 's' : ''} · ${rev.aRevoir} à revoir.<br>Reviens demain : les cartes reviennent quand il faut.</p>
    <button class="btn" data-action="aller" data-vers="#/">Retour à l'accueil</button>`;
  const mot = motParId(rev.file[0]);
  if (!rev.verso) return haut + `<div class="carte carte-rev"><div class="illus">${imagePrincipale(mot)}</div><div class="question">Comment s'appelle cette ${mot.genre} ?</div></div>
    <button class="btn" data-action="voir">Voir la réponse</button>`;
  return haut + ficheMot(mot) + `<div class="deux"><button class="btn btn-second" data-action="arevoir">À revoir</button><button class="btn" data-action="jesavais">Je savais</button></div>`;
}
