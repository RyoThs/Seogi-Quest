// Seogi Quest : chef d'orchestre (écrans, actions, enregistrement).
import { NIVEAUX } from './donnees/niveaux.js';
import { MOTS } from './donnees/mots.js';
import { creerPartie, poserLettre, effacer, estComplet, estJuste, donnerIndice } from './logique/partie.js';
import { motsDuNiveau, marquerTrouve, majSerie } from './logique/progression.js';
import { cartesDuJour, repondre } from './logique/revision.js';
import { creerStockage } from './stockage.js';
import { proteger } from './ui/cloison.js';
import { ecranAccueil, idsTrouves } from './ui/accueil.js';
import { ecranNiveaux } from './ui/niveaux.js';
import { ecranJeu } from './ui/jeu.js';
import { ecranRevision } from './ui/revision.js';
import { ecranAPropos } from './ui/apropos.js';

const app = document.getElementById('app');
const boite = document.getElementById('message');
const panne = new URLSearchParams(location.search).get('panne'); // pour les essais « panne volontaire »
let memoire;
try { memoire = window.localStorage; } catch { memoire = { getItem: () => null, setItem: () => { throw new Error('indisponible'); } }; }
const stockage = creerStockage(memoire);
let etat = stockage.lire();
let session = null, rev = null;

const aujourdhui = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };

function prevenir(texte) {
  boite.textContent = texte; boite.hidden = false;
  clearTimeout(prevenir.t); prevenir.t = setTimeout(() => { boite.hidden = true; }, 4000);
}

function sauver(nouvel) {
  etat = nouvel;
  if (!stockage.ecrire(etat)) prevenir('Ta progression n\'a pas pu être enregistrée sur ce téléphone (stockage plein ou navigation privée).');
}

function nouvellePartie() { session.partie = creerPartie(session.liste[session.index].mot); session.statut = 'joue'; }

function ouvrirNiveau(id) {
  if (!NIVEAUX.some(n => n.id === id)) return false;
  if (session?.niveauId !== id) {
    const liste = motsDuNiveau(NIVEAUX, MOTS, id);
    const trouves = etat.niveaux[id] ?? [];
    const i = liste.findIndex(m => !trouves.includes(m.id));
    session = { niveauId: id, liste, index: i < 0 ? 0 : i };
    nouvellePartie();
  }
  return true;
}

function ouvrirRevision() {
  const ids = idsTrouves(etat);
  rev = { file: cartesDuJour(etat.revision, ids, aujourdhui()), total: ids.length, verso: false, sues: 0, aRevoir: 0, remis: new Set() };
}

function afficher() {
  const [, ecran = '', param] = location.hash.replace(/^#/, '').split('/');
  let html;
  if (ecran === 'niveaux') html = proteger('La liste des niveaux', () => ecranNiveaux({ etat, onglet: param }));
  else if (ecran === 'jeu' && ouvrirNiveau(param)) html = proteger('La partie', () => ecranJeu(session));
  else if (ecran === 'apropos') html = proteger('La page À propos', () => ecranAPropos());
  else if (ecran === 'revision') { if (!rev) ouvrirRevision(); html = proteger('La révision', () => ecranRevision(rev)); }
  else html = proteger("L'accueil", () => ecranAccueil({ etat, aujourdhui: aujourdhui(), panne }));
  app.innerHTML = html;
}

const actions = {
  aller: el => { if (el.dataset.vers === '#/revision') rev = null; if (location.hash !== el.dataset.vers) history.pushState(null, '', el.dataset.vers); afficher(); },
  reessayer: () => afficher(),
  lettre: el => {
    if (session.statut === 'faux') return;
    session.partie = poserLettre(session.partie, Number(el.dataset.i));
    verifier();
  },
  effacer: () => { session.partie = effacer(session.partie); session.statut = 'joue'; afficher(); },
  indice: () => { session.partie = donnerIndice(session.partie); session.statut = 'joue'; verifier(); },
  passer: () => { session.index = (session.index + 1) % session.liste.length; nouvellePartie(); afficher(); },
  suivant: () => {
    if (session.index >= session.liste.length - 1) { const n = session.niveauId; session = null; location.hash = `#/niveaux${n.startsWith('d') ? '/dan' : ''}`; return; }
    session.index++; nouvellePartie(); afficher();
  },
  voir: () => { rev.verso = true; afficher(); },
  jesavais: () => noter(true),
  arevoir: () => noter(false),
};

function verifier() {
  const p = session.partie;
  if (!estComplet(p)) return afficher();
  if (estJuste(p)) {
    const mot = session.liste[session.index];
    sauver({ ...marquerTrouve(etat, session.niveauId, mot.id), serie: majSerie(etat.serie, aujourdhui()) });
    session.statut = 'trouve';
    afficher();
    window.scrollTo(0, 0);
  } else {
    session.statut = 'faux';
    afficher();
    setTimeout(() => {
      if (session?.statut !== 'faux') return;
      session.partie = { ...p, reponse: p.reponse.filter(r => r.indice) };
      session.statut = 'joue';
      afficher();
    }, 900);
  }
}

function noter(su) {
  const id = rev.file.shift();
  sauver({ ...etat, revision: repondre(etat.revision, id, su, aujourdhui()), serie: majSerie(etat.serie, aujourdhui()) });
  if (su) rev.sues++; else { rev.aRevoir++; if (!rev.remis.has(id)) { rev.remis.add(id); rev.file.push(id); } }
  rev.verso = false;
  afficher();
}

app.addEventListener('click', e => {
  const el = e.target.closest('[data-action]');
  if (!el || el.disabled) return;
  try { actions[el.dataset.action]?.(el); }
  catch (err) { console.error(err); prevenir('Oups, cette action n\'a pas marché. Réessaie.'); }
});
window.addEventListener('hashchange', afficher);
window.addEventListener('popstate', afficher);
window.addEventListener('error', () => prevenir('Un souci est survenu, mais tu peux continuer.'));
afficher();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => { /* hors ligne indisponible : l'appli marche quand même */ });
}
