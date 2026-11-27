import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normaliser, lettresDuMot, melangerLettres, creerPartie, poserLettre, effacer, estComplet, estJuste, donnerIndice } from '../js/logique/partie.js';

test('normaliser enlève espaces et met en majuscules', () => {
  assert.equal(normaliser('Ap kubi'), 'APKUBI');
});

test('les cases suivent les mots (espaces gardés pour l\'affichage)', () => {
  assert.deepEqual(lettresDuMot('AP KUBI'), [['A','P'],['K','U','B','I']]);
});

test('melangerLettres donne 12 lettres qui contiennent toutes celles du mot', () => {
  const l = melangerLettres('AP KUBI', 12, () => 0.42);
  assert.equal(l.length, 12);
  const reste = [...l];
  for (const c of 'APKUBI') { const i = reste.indexOf(c); assert.ok(i >= 0, c); reste.splice(i, 1); }
});

test('melangerLettres agrandit la grille par rangées de 6 si le mot est plus long', () => {
  const l = melangerLettres('MOMTONG MAKKI JIREUGI', 12, Math.random); // 19 lettres
  assert.ok(l.length >= 19);
  assert.equal(l.length % 6, 0);
});

test('poser puis effacer une lettre', () => {
  let p = creerPartie('AP KUBI', () => 0.1);
  p = poserLettre(p, p.grille.findIndex(c => c === 'A'));
  assert.equal(p.reponse[0].lettre, 'A');
  p = effacer(p);
  assert.equal(p.reponse.length, 0);
});

test('une case de la grille déjà utilisée ne peut pas resservir', () => {
  let p = creerPartie('AP KUBI', () => 0.1);
  const i = p.grille.findIndex(c => c === 'A');
  p = poserLettre(p, i);
  const p2 = poserLettre(p, i);
  assert.equal(p2.reponse.length, 1);
});

test('on ne peut pas dépasser la longueur du mot', () => {
  let p = creerPartie('AP', () => 0.1);
  for (let i = 0; i < p.grille.length; i++) p = poserLettre(p, i);
  assert.equal(p.reponse.length, 2);
  assert.ok(estComplet(p));
});

test('estJuste reconnaît la bonne réponse', () => {
  let p = creerPartie('AP', () => 0.1);
  p = poserLettre(p, p.grille.indexOf('A'));
  p = poserLettre(p, p.grille.indexOf('P'));
  assert.ok(estJuste(p));
});

test('estJuste refuse une mauvaise réponse complète', () => {
  let p = creerPartie('AP', () => 0.1);
  p = poserLettre(p, p.grille.indexOf('P'));
  p = poserLettre(p, p.grille.indexOf('A'));
  assert.ok(estComplet(p));
  assert.ok(!estJuste(p));
});

test('donnerIndice place la prochaine bonne lettre et la verrouille', () => {
  let p = creerPartie('AP KUBI', () => 0.3);
  p = poserLettre(p, p.grille.indexOf('K')); // mauvaise première lettre
  p = donnerIndice(p);
  assert.equal(p.reponse[0].lettre, 'A');
  assert.ok(p.reponse[0].indice);
  p = effacer(p); // un indice ne s'efface pas
  assert.equal(p.reponse[0].lettre, 'A');
});
