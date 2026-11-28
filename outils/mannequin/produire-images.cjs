// Produit les 4 images (JPEG 600 px) de chaque mot : node produire-images.cjs dossier [ids...]
const { chromium } = require('playwright');
const fs = require('fs');
const C = JSON.parse(fs.readFileSync('poses-calculees.json', 'utf8'));
const D = JSON.parse(fs.readFileSync('mots-poses.json', 'utf8'));
const COUPS = ['apchagi', 'yeopchagi', 'dollyeo', 'twioapchagi', 'mureupchigi'];
const POSITIONS = ['naranhi', 'moa', 'apseogi', 'apkubi', 'dwitkubi', 'beom', 'juchum', 'dwikkoa'];
const JAMBES = /^(Thigh|Shin|Foot)_/, BRAS = /^(UpperArm|ForeArm)_/;
function depart(id, pose) {
  const p = { ...pose };
  if (id === 'naranhi') return C.moa.pose;
  if (id === 'moa') return C.naranhi.pose;
  if (COUPS.includes(id)) { for (const k of Object.keys(p)) if (JAMBES.test(k) || k === 'Spine_Lower') delete p[k]; return { ...p, ...D._jambes.garde_coup }; }
  if (POSITIONS.includes(id)) { for (const k of Object.keys(p)) if (JAMBES.test(k)) delete p[k]; return p; }
  for (const k of Object.keys(p)) if (BRAS.test(k)) delete p[k];
  return { ...p, ...D._bras.hancheG, ...D._bras.hancheD };
}
function cible(id) {
  if (COUPS.includes(id)) return { cible: id === 'mureupchigi' ? 'Shin_R' : 'Foot_R', dist: 1.0, el: 10 };
  if (POSITIONS.includes(id)) return { cible: 'Shin_L', dist: 1.25, el: 25 };
  if (id === 'oesanteul') return { cible: 'Hand_R', dist: 0.9, el: 0 };
  return { cible: 'Hand_L', dist: 0.9, el: 5 };
}
(async () => {
  const [dossier, ...ids] = process.argv.slice(2);
  fs.mkdirSync(dossier, { recursive: true });
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const p = await b.newPage({ viewport: { width: 600, height: 600 } });
  for (const id of (ids.length ? ids : Object.keys(C))) {
    const c = C[id], vue = c.vue ?? 60, base = { pose: JSON.stringify(c.pose), muscles: c.muscles.join(','), echelle: JSON.stringify(c.echelle), teinte: '#eceae6', lever: c.lever || 0 };
    const vues = [
      { a: vue },
      { a: vue === 0 ? 55 : -vue },
      { a: vue, ...cible(id) },
      { a: vue, fantome: JSON.stringify(depart(id, c.pose)) },
    ];
    for (let i = 0; i < 4; i++) {
      await p.goto(`http://127.0.0.1:8765/rendu.html?${new URLSearchParams({ ...base, ...vues[i] })}`);
      await p.waitForFunction(() => document.title.startsWith('pret'), null, { timeout: 180000 });
      await p.screenshot({ path: `${dossier}/${id}-${i + 1}.jpg`, type: 'jpeg', quality: 80 });
    }
    console.log('ok', id);
  }
  await b.close();
})();
