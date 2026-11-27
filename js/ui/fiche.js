// Fiche d'un mot (bonne réponse et verso des cartes de révision) : un seul composant commun.
import { imagePrincipale } from '../dessin/vues.js';
import { echapper } from './cloison.js';

export const ficheMot = mot => `<div class="mot-trouve">${echapper(mot.mot)}</div>
  <div class="traduction"><span lang="ko">${echapper(mot.hangul)}</span> · ${echapper(mot.fr)}</div>
  <div class="carte fiche"><div class="illus">${imagePrincipale(mot)}</div><div class="texte">
    <h3>Comment la faire</h3><p>${echapper(mot.comment)}</p>
    <h3>Où on la trouve</h3><p>${echapper(mot.ou)}</p></div></div>`;
