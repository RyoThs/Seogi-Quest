// Rend des vues de mots : node rendre.cjs angle dossier [ids...]
const { chromium } = require('playwright');
const fs = require('fs');
const C = JSON.parse(fs.readFileSync('poses-calculees.json', 'utf8'));
(async () => {
  const [angle, dossier, ...ids] = process.argv.slice(2);
  fs.mkdirSync(dossier, { recursive: true });
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const p = await b.newPage({ viewport: { width: 600, height: 600 } });
  for (const id of (ids.length ? ids : Object.keys(C))) {
    const c = C[id];
    const q = new URLSearchParams({ a: angle, pose: JSON.stringify(c.pose), muscles: c.muscles.join(','), echelle: JSON.stringify(c.echelle), teinte: '#eceae6' });
    await p.goto(`http://127.0.0.1:8765/rendu.html?${q}`);
    await p.waitForFunction(() => document.title.startsWith('pret'), null, { timeout: 180000 });
    await p.screenshot({ path: `${dossier}/${id}.png` });
    console.log('ok', id);
  }
  await b.close();
})();
