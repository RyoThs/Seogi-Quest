import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JAMBES, BRAS } from '../js/dessin/poses.js';
import { dessinerPersonnage } from '../js/dessin/personnage.js';
import { quatreVues } from '../js/dessin/vues.js';
import { MOTS } from '../js/donnees/mots.js';

test('chaque mot utilise des jambes et des bras qui existent', () => {
  for (const m of MOTS) {
    assert.ok(JAMBES[m.pose.j], `${m.id} : jambes « ${m.pose.j} » inconnues`);
    assert.ok(BRAS[m.pose.av], `${m.id} : bras avant « ${m.pose.av} » inconnu`);
    assert.ok(BRAS[m.pose.ar], `${m.id} : bras arrière « ${m.pose.ar} » inconnu`);
  }
});

test('le personnage se dessine sans valeur cassée (NaN, undefined)', () => {
  for (const m of MOTS) {
    const svg = dessinerPersonnage(m.pose);
    assert.ok(svg.length > 500, m.id);
    assert.doesNotMatch(svg, /NaN|undefined|Infinity/, m.id);
  }
});

test('chaque mot donne 4 images SVG différentes', () => {
  for (const m of MOTS) {
    const v = quatreVues(m);
    assert.equal(v.length, 4, m.id);
    for (const s of v) assert.match(s, /^<svg [^>]*viewBox="[-\d. ]+"/, m.id);
    assert.equal(new Set(v).size, 4, `${m.id} : images en double`);
  }
});

test('une position montre le placement des pieds vu de dessus', () => {
  const v = quatreVues(MOTS.find(m => m.id === 'apkubi'));
  assert.ok(v.some(s => s.includes('data-vue="pieds"')));
});

test('une technique montre un gros plan et le mouvement', () => {
  const v = quatreVues(MOTS.find(m => m.id === 'araemakki'));
  assert.ok(v.some(s => s.includes('data-vue="zoom"')));
  assert.ok(v.some(s => s.includes('data-vue="mouvement"')));
});

test('la vue miroir retourne le dessin (pose vue de côté)', () => {
  const v = quatreVues(MOTS.find(m => m.id === 'apkubi'));
  assert.ok(v.some(s => s.includes('scale(-1,1)')));
});

test('une pose vue de face montre les jambes de près au lieu d\'un reflet identique', () => {
  const v = quatreVues(MOTS.find(m => m.id === 'naranhi'));
  assert.ok(v.some(s => s.includes('data-vue="jambes"')));
  assert.ok(!v.some(s => s.includes('scale(-1,1)')));
});
