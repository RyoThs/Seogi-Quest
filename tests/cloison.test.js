import { test } from 'node:test';
import assert from 'node:assert/strict';
import { proteger } from '../js/ui/cloison.js';

test('une zone qui marche affiche son contenu', () => {
  assert.equal(proteger('La partie', () => '<p>ok</p>'), '<p>ok</p>');
});

test('une zone en panne affiche un message à sa place, avec Réessayer', () => {
  const html = proteger('La partie', () => { throw new Error('boum'); });
  assert.match(html, /La partie n'a pas pu s'afficher/);
  assert.match(html, /Réessayer/);
  assert.match(html, /data-cloison/);
});

test('le nom de la zone est protégé contre le code HTML', () => {
  const html = proteger('<b>x</b>', () => { throw new Error('boum'); });
  assert.doesNotMatch(html, /<b>x<\/b>/);
});
