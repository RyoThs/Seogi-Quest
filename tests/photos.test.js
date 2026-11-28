import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { PHOTOS, aDesPhotos } from '../js/donnees/photos.js';
import { vuesDuMot, imagePrincipaleDuMot } from '../js/dessin/images.js';
import { MOTS } from '../js/donnees/mots.js';
import { NIVEAUX } from '../js/donnees/niveaux.js';

const jusquA1erDan = new Set(NIVEAUX.slice(0, NIVEAUX.findIndex(n => n.id === 'd1') + 1).map(n => n.id));

test('tous les mots jusqu\'au 1er dan ont des photos du mannequin', () => {
  for (const m of MOTS.filter(m => jusquA1erDan.has(m.niveau))) assert.ok(aDesPhotos(m.id), m.id);
  assert.equal(PHOTOS.length, 31);
});

test('chaque mot avec photos a bien ses 4 fichiers', () => {
  for (const id of PHOTOS) for (let n = 1; n <= 4; n++)
    assert.ok(existsSync(new URL(`../images/mots/${id}-${n}.jpg`, import.meta.url)), `${id}-${n}.jpg manquant`);
});

test('la liste pour le mode hors ligne correspond aux photos', () => {
  const liste = JSON.parse(readFileSync(new URL('../images/mots/liste.json', import.meta.url), 'utf8'));
  assert.deepEqual(liste, PHOTOS.flatMap(id => [1, 2, 3, 4].map(n => `images/mots/${id}-${n}.jpg`)));
});

test('un mot avec photos donne 4 images <img>', () => {
  const v = vuesDuMot(MOTS.find(m => m.id === 'apkubi'));
  assert.equal(v.length, 4);
  v.forEach((s, i) => assert.match(s, new RegExp(`<img src="images/mots/apkubi-${i + 1}\\.jpg"`)));
});

test('le texte des images ne donne pas la réponse', () => {
  for (const id of PHOTOS) {
    const m = MOTS.find(x => x.id === id);
    for (const s of vuesDuMot(m)) {
      const alt = s.match(/alt="([^"]*)"/)[1].toLowerCase();
      for (const indice of [m.mot, m.hangul, m.fr, ...m.mot.split(' ')]) assert.ok(!alt.includes(indice.toLowerCase()), `${id} : « ${alt} »`);
    }
  }
});

test('un mot sans photos garde les dessins', () => {
  const v = vuesDuMot(MOTS.find(m => m.id === 'hakdari'));
  assert.equal(v.length, 4);
  assert.ok(v.every(s => s.startsWith('<svg')));
});

test('image principale : photo n°1 si elle existe, sinon le dessin', () => {
  assert.match(imagePrincipaleDuMot(MOTS.find(m => m.id === 'apchagi')), /apchagi-1\.jpg/);
  assert.match(imagePrincipaleDuMot(MOTS.find(m => m.id === 'hakdari')), /^<svg/);
});
