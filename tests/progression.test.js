import { test } from 'node:test';
import assert from 'node:assert/strict';
import { motsDuNiveau, marquerTrouve, avancement, majSerie, etatVide, totalTrouves, reparerEtat } from '../js/logique/progression.js';

const NIV = [{ id: 'n1' }, { id: 'n2' }, { id: 'n3' }];
const MOTS = [
  ...['a', 'b', 'c', 'd', 'e', 'f'].map(id => ({ id, niveau: 'n1' })),
  { id: 'g', niveau: 'n2' }, { id: 'h', niveau: 'n2' },
  { id: 'i', niveau: 'n3' },
];

test('un niveau = ses nouveaux mots d\'abord, puis des révisions jusqu\'à 8', () => {
  const l = motsDuNiveau(NIV, MOTS, 'n2', () => 0.5);
  assert.equal(l.length, 8);
  assert.deepEqual(l.slice(0, 2).map(m => m.id), ['g', 'h']);
  assert.ok(l.slice(2).every(m => m.niveau === 'n1'));
});

test('le premier niveau n\'a que ses propres mots', () => {
  assert.equal(motsDuNiveau(NIV, MOTS, 'n1', () => 0.5).length, 6);
});

test('marquerTrouve compte une seule fois un mot et ne touche pas l\'ancien état', () => {
  const e0 = etatVide();
  let e = marquerTrouve(e0, 'n1', 'a');
  e = marquerTrouve(e, 'n1', 'a');
  assert.deepEqual(e.niveaux.n1, ['a']);
  assert.deepEqual(e0.niveaux, {});
  assert.equal(totalTrouves(marquerTrouve(e, 'n2', 'a')), 1);
});

test('avancement d\'un niveau en mots trouvés sur mots à trouver', () => {
  let e = marquerTrouve(etatVide(), 'n2', 'g');
  assert.deepEqual(avancement(e, NIV, MOTS, 'n2'), { trouves: 1, total: 8 });
});

test('série de jours : +1 le lendemain, inchangée le même jour, 1 après un trou', () => {
  let s = majSerie({ jours: 0, dernier: null }, '2026-11-27');
  assert.deepEqual(s, { jours: 1, dernier: '2026-11-27' });
  assert.equal(majSerie(s, '2026-11-27').jours, 1);
  s = majSerie(s, '2026-11-28');
  assert.equal(s.jours, 2);
  assert.equal(majSerie(s, '2026-11-30').jours, 1);
});

test('reparerEtat remet un état propre si les données sont abîmées', () => {
  assert.deepEqual(reparerEtat('n\'importe quoi'), etatVide());
  assert.deepEqual(reparerEtat({ niveaux: 5 }).niveaux, {});
  const ok = marquerTrouve(etatVide(), 'n1', 'a');
  assert.deepEqual(reparerEtat(JSON.parse(JSON.stringify(ok))), ok);
});
