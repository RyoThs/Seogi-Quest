import { NIVEAUX } from '../donnees/niveaux.js';
import { MOTS } from '../donnees/mots.js';
import { avancement, totalTrouves } from '../logique/progression.js';
import { cartesDuJour } from '../logique/revision.js';
import { imagePrincipale } from '../dessin/vues.js';
import { proteger, echapper } from './cloison.js';

export function niveauCourant(etat) {
  return NIVEAUX.find(n => { const a = avancement(etat, NIVEAUX, MOTS, n.id); return a.trouves < a.total; }) ?? NIVEAUX[NIVEAUX.length - 1];
}
export const idsTrouves = etat => [...new Set(Object.values(etat.niveaux).flat())].filter(id => MOTS.some(m => m.id === id));
const pluriel = (n, mot) => `${n} ${mot}${n > 1 ? 's' : ''}`;

export function ecranAccueil({ etat, aujourdhui, panne }) {
  const niv = niveauCourant(etat);
  const a = avancement(etat, NIVEAUX, MOTS, niv.id);
  const premier = MOTS.find(m => m.niveau === niv.id);
  const aReviser = cartesDuJour(etat.revision, idsTrouves(etat), aujourdhui).length;
  const finis = t => NIVEAUX.filter(n => n.type === t && (() => { const x = avancement(etat, NIVEAUX, MOTS, n.id); return x.trouves >= x.total; })()).length;
  const reprise = proteger('La carte de reprise', () => {
    if (panne === 'reprise') throw new Error('panne volontaire');
    return `<div class="carte reprise"><div class="illus">${imagePrincipale(premier)}</div><div class="infos">
      <div class="ligne-niv"><div>${echapper(niv.nom)}<small>${echapper(niv.poomsae)}</small></div><span>${a.trouves} / ${a.total}</span></div>
      <div class="barre"><i style="width:${Math.round((100 * a.trouves) / a.total)}%"></i></div></div></div>`;
  });
  const stats = proteger('Tes chiffres', () => {
    if (panne === 'stats') throw new Error('panne volontaire');
    const n = totalTrouves(etat);
    return `<div class="stats"><div><b>${n}</b>${n === 1 ? 'mot' : 'mots'}</div><div><b>${finis('keup')}/8</b>ceintures</div><div><b>${etat.serie.jours} j</b>de suite</div></div>`;
  }, { pluriel: true });
  return `<p class="surtitre">Taekwondo · Poomsae</p><h1>Seogi Quest<span class="sceau" lang="ko">서기</span></h1>
    ${reprise}
    <button class="btn" data-action="aller" data-vers="#/jeu/${niv.id}">Reprendre</button>
    <button class="btn btn-second" data-action="aller" data-vers="#/revision">Réviser${aReviser ? ` · ${pluriel(aReviser, 'carte')}` : ''}</button>
    ${stats}
    <button class="btn-texte" style="margin:14px auto 0;display:flex" data-action="aller" data-vers="#/niveaux">Tous les niveaux</button>`;
}
