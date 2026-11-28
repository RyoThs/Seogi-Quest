// Essais de bout en bout : un vrai navigateur, des téléphones simulés.
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { chromium, devices } = require('playwright');
const { demarrer } = require('./serveur.cjs');

let serveur, navigateur;
before(async () => { serveur = await demarrer(); navigateur = await chromium.launch(); });
after(async () => { await navigateur.close(); serveur.fermer(); });

const TELEPHONES = { 'iPhone 13': devices['iPhone 13'], 'iPhone SE': devices['iPhone SE'], 'Pixel 7': devices['Pixel 7'] };

async function ouvrir(tel = 'iPhone 13', chemin = '') {
  const ctx = await navigateur.newContext({ ...TELEPHONES[tel] });
  const page = await ctx.newPage();
  page.setDefaultTimeout(10000);
  const erreurs = [];
  page.on('pageerror', e => erreurs.push(e.message));
  await page.goto(serveur.url + chemin);
  return { ctx, page, erreurs };
}

// Tape un mot avec les tuiles de lettres
async function taper(page, mot) {
  for (const l of mot.replace(/ /g, '')) {
    await page.locator(`.tuile:not([disabled])[data-lettre="${l}"]`).first().click();
  }
}

test('accueil : titre, bouton Reprendre et chiffres', async () => {
  const { ctx, page, erreurs } = await ouvrir();
  await page.getByRole('heading', { name: /Seogi Quest/ }).waitFor();
  await page.getByRole('button', { name: 'Reprendre' }).waitFor();
  assert.match(await page.locator('.stats').innerText(), /0\s*mots/);
  assert.deepEqual(erreurs, []);
  await ctx.close();
});

test('niveaux : 8 ceintures puis 9 dans', async () => {
  const { ctx, page } = await ouvrir('iPhone 13', '#/niveaux');
  assert.equal(await page.locator('.niveau').count(), 8);
  await page.getByRole('tab', { name: 'Dans' }).click();
  assert.equal(await page.locator('.niveau').count(), 9);
  assert.match(await page.locator('.niveau').first().innerText(), /1er dan[\s\S]*Koryo/);
  await ctx.close();
});

test('partie : 4 images, trouver le mot, voir l\'explication, progression gardée', async () => {
  const { ctx, page, erreurs } = await ouvrir('iPhone 13', '#/jeu/k8');
  assert.equal(await page.locator('.images .illus').count(), 4);
  const mot = await page.locator('[data-solution]').getAttribute('data-solution');
  await taper(page, mot);
  await page.getByText('Trouvé').waitFor();
  assert.equal((await page.locator('.mot-trouve').innerText()).trim(), mot);
  await page.getByRole('button', { name: /Mot suivant/ }).waitFor();
  await page.goto(serveur.url + '#/');
  await page.reload();
  assert.match(await page.locator('.stats').innerText(), /1\s*mot/);
  assert.deepEqual(erreurs, []);
  await ctx.close();
});

test('partie : une mauvaise réponse prévient et vide les cases', async () => {
  const { ctx, page } = await ouvrir('iPhone 13', '#/jeu/k8');
  const mot = (await page.locator('[data-solution]').getAttribute('data-solution')).replace(/ /g, '');
  const tuiles = page.locator('.tuile');
  const lettres = await tuiles.evaluateAll(t => t.map(x => x.dataset.lettre));
  const faux = [...mot].reverse().join('') === mot ? null : [...mot].reverse().join('');
  await taper(page, faux ?? mot.slice(1) + lettres.find(l => l !== mot[0]));
  await page.getByText('Pas tout à fait').waitFor();
  await page.waitForFunction(() => document.querySelectorAll('.case.pleine').length === 0);
  await ctx.close();
});

test('partie : l\'indice pose la bonne première lettre', async () => {
  const { ctx, page } = await ouvrir('iPhone 13', '#/jeu/k8');
  const mot = await page.locator('[data-solution]').getAttribute('data-solution');
  await page.getByRole('button', { name: /Indice/ }).click();
  assert.equal((await page.locator('.case').first().innerText()).trim(), mot[0]);
  await ctx.close();
});

test('partie 8e keup : les 4 images sont les photos du mannequin', async () => {
  const { ctx, page } = await ouvrir('iPhone 13', '#/jeu/k8');
  const imgs = page.locator('.images img');
  assert.equal(await imgs.count(), 4);
  await page.waitForFunction(() => [...document.querySelectorAll('.images img')].every(i => i.complete && i.naturalWidth > 0));
  await ctx.close();
});

test('à propos : le crédit du mannequin est affiché', async () => {
  const { ctx, page } = await ouvrir('iPhone 13', '#/');
  await page.getByRole('button', { name: 'À propos' }).click();
  const texte = await page.locator('main').innerText();
  for (const mot of ['MakeHuman', 'Z-Anatomy', 'BodyParts3D', 'CC BY-SA 4.0']) assert.ok(texte.includes(mot), mot);
  await ctx.close();
});

test('révision : sans mot trouvé, un message explique quoi faire', async () => {
  const { ctx, page } = await ouvrir('iPhone 13', '#/revision');
  await page.getByText(/Trouve d'abord des mots/).waitFor();
  await ctx.close();
});

test('révision : carte image puis réponse, Je savais / À revoir', async () => {
  const { ctx, page } = await ouvrir('iPhone 13', '#/jeu/k8');
  await taper(page, await page.locator('[data-solution]').getAttribute('data-solution'));
  await page.getByText('Trouvé').waitFor();
  await page.goto(serveur.url + '#/revision');
  await page.locator('.carte svg').waitFor();
  await page.getByRole('button', { name: 'Voir la réponse' }).click();
  await page.locator('.mot-trouve').waitFor();
  await page.getByRole('button', { name: 'Je savais' }).click();
  await page.getByText(/Révision terminée/).waitFor();
  await ctx.close();
});

test('panne volontaire : données abîmées → l\'appli démarre quand même', async () => {
  const { ctx, page, erreurs } = await ouvrir();
  await page.evaluate(() => localStorage.setItem('seogi-quest', '{abîmé'));
  await page.reload();
  await page.getByRole('button', { name: 'Reprendre' }).waitFor();
  assert.deepEqual(erreurs, []);
  await ctx.close();
});

test('panne volontaire : une zone qui plante ne casse que cette zone', async () => {
  const { ctx, page } = await ouvrir('iPhone 13', '?panne=stats#/');
  await page.getByText(/Tes chiffres n'a pas pu s'afficher|Tes chiffres n’ont pas pu/).waitFor();
  await page.getByRole('button', { name: 'Reprendre' }).waitFor(); // le reste marche
  await ctx.close();
});

for (const tel of Object.keys(TELEPHONES)) {
  test(`${tel} : rien ne dépasse de l'écran, clavier de lettres visible`, async () => {
    const { ctx, page } = await ouvrir(tel, '#/jeu/k8');
    const { large, ecran } = await page.evaluate(() => ({ large: document.documentElement.scrollWidth, ecran: innerWidth }));
    assert.ok(large <= ecran, `déborde : ${large} > ${ecran}`);
    const bas = await page.locator('.outils').boundingBox();
    const vp = page.viewportSize();
    assert.ok(bas.y + bas.height <= vp.height, `outils hors écran sur ${tel}`);
    await page.screenshot({ path: `tests/e2e/captures/${tel.replace(/ /g, '-')}-partie.png` });
    await page.goto(serveur.url + '#/');
    await page.screenshot({ path: `tests/e2e/captures/${tel.replace(/ /g, '-')}-accueil.png` });
    await ctx.close();
  });
}

test('hors ligne : après une 1re visite, l\'appli s\'ouvre sans internet', async () => {
  const { ctx, page } = await ouvrir();
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  await page.evaluate(() => navigator.serviceWorker.ready);
  await ctx.setOffline(true);
  await page.reload();
  await page.getByRole('heading', { name: /Seogi Quest/ }).waitFor();
  await page.goto(serveur.url + '#/jeu/k7');
  await page.waitForFunction(() => { const i = [...document.querySelectorAll('.images img')]; return i.length === 4 && i.every(x => x.complete && x.naturalWidth > 0); });
  await ctx.close();
});
