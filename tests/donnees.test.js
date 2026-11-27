import { test } from 'node:test';
import assert from 'node:assert/strict';
import { NIVEAUX } from '../js/donnees/niveaux.js';
import { MOTS } from '../js/donnees/mots.js';

test('17 niveaux : 8 ceintures (keup) puis 9 dans', () => {
  assert.equal(NIVEAUX.length, 17);
  assert.equal(NIVEAUX.filter(n => n.type === 'keup').length, 8);
  assert.equal(NIVEAUX.filter(n => n.type === 'dan').length, 9);
  assert.equal(NIVEAUX[0].nom, '8e keup');
  assert.equal(NIVEAUX[16].nom, '9e dan');
});

test('chaque niveau a un identifiant unique et un poomsae', () => {
  assert.equal(new Set(NIVEAUX.map(n => n.id)).size, 17);
  for (const n of NIVEAUX) assert.ok(n.poomsae, n.id);
});

test('chaque mot est complet', () => {
  for (const m of MOTS) {
    for (const champ of ['id', 'mot', 'hangul', 'fr', 'comment', 'ou', 'niveau', 'genre'])
      assert.ok(m[champ], `${m.id} : ${champ} manquant`);
    assert.match(m.mot, /^[A-Z ]+$/, m.id);
    assert.ok(['position', 'technique'].includes(m.genre), m.id);
    assert.ok(NIVEAUX.some(n => n.id === m.niveau), `${m.id} : niveau inconnu`);
  }
});

test('identifiants et mots uniques', () => {
  assert.equal(new Set(MOTS.map(m => m.id)).size, MOTS.length);
  assert.equal(new Set(MOTS.map(m => m.mot)).size, MOTS.length);
});

test('chaque niveau apporte au moins un nouveau mot', () => {
  for (const n of NIVEAUX) assert.ok(MOTS.some(m => m.niveau === n.id), n.id);
});

test('au moins 40 mots au total', () => {
  assert.ok(MOTS.length >= 40, String(MOTS.length));
});
