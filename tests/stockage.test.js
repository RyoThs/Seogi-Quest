import { test } from 'node:test';
import assert from 'node:assert/strict';
import { creerStockage } from '../js/stockage.js';
import { etatVide, marquerTrouve } from '../js/logique/progression.js';

const fauxTelephone = () => { const d = {}; return { getItem: k => (k in d ? d[k] : null), setItem: (k, v) => { d[k] = String(v); }, d }; };

test('lire sans rien d\'enregistré donne un état vide', () => {
  assert.deepEqual(creerStockage(fauxTelephone()).lire(), etatVide());
});

test('enregistrer puis relire', () => {
  const t = fauxTelephone(), s = creerStockage(t);
  const e = marquerTrouve(etatVide(), 'k8', 'apkubi');
  assert.equal(s.ecrire(e), true);
  assert.deepEqual(creerStockage(t).lire(), e);
});

test('données abîmées : état vide et pas de plantage', () => {
  const t = fauxTelephone(); t.d['seogi-quest'] = '{pas du json';
  assert.deepEqual(creerStockage(t).lire(), etatVide());
});

test('téléphone qui refuse l\'enregistrement (mode privé, plein) : ecrire renvoie false', () => {
  const t = { getItem: () => { throw new Error('refusé'); }, setItem: () => { throw new Error('plein'); } };
  const s = creerStockage(t);
  assert.deepEqual(s.lire(), etatVide());
  assert.equal(s.ecrire(etatVide()), false);
});
