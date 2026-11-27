import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ajouterJours, cartesDuJour, repondre, INTERVALLES } from '../js/logique/revision.js';

test('ajouterJours passe bien les fins de mois', () => {
  assert.equal(ajouterJours('2026-11-30', 1), '2026-12-01');
});

test('une carte jamais vue est à réviser aujourd\'hui', () => {
  assert.deepEqual(cartesDuJour({}, ['a', 'b'], '2026-11-27'), ['a', 'b']);
});

test('une carte sue monte d\'une boîte et revient plus tard', () => {
  const e = repondre({}, 'a', true, '2026-11-27');
  assert.equal(e.a.boite, 2);
  assert.equal(e.a.prochaine, ajouterJours('2026-11-27', INTERVALLES[2]));
  assert.deepEqual(cartesDuJour(e, ['a'], '2026-11-27'), []);
  assert.deepEqual(cartesDuJour(e, ['a'], e.a.prochaine), ['a']);
});

test('une carte ratée retourne en boîte 1 et reste à réviser aujourd\'hui', () => {
  let e = { a: { boite: 4, prochaine: '2026-11-27' } };
  e = repondre(e, 'a', false, '2026-11-27');
  assert.deepEqual(e.a, { boite: 1, prochaine: '2026-11-27' });
});

test('la boîte ne dépasse jamais 5', () => {
  let e = { a: { boite: 5, prochaine: '2026-11-27' } };
  e = repondre(e, 'a', true, '2026-11-27');
  assert.equal(e.a.boite, 5);
});

test('les cartes les moins sues passent en premier, 20 au maximum', () => {
  const ids = Array.from({ length: 30 }, (_, i) => 'm' + i);
  const e = { m5: { boite: 3, prochaine: '2026-11-01' }, m6: { boite: 1, prochaine: '2026-11-01' } };
  const l = cartesDuJour(e, ids, '2026-11-27');
  assert.equal(l.length, 20);
  assert.equal(l[0], 'm6');
  assert.ok(l.indexOf('m5') > l.indexOf('m6'));
});

test('repondre ne modifie pas l\'ancien état', () => {
  const e = {};
  repondre(e, 'a', true, '2026-11-27');
  assert.deepEqual(e, {});
});
