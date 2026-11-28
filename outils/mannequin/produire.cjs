// Calcule les poses de chaque mot (presets + calculateur d'angles) → poses-calculees.json
const { chromium } = require('playwright');
const fs = require('fs');
const D = JSON.parse(fs.readFileSync('mots-poses.json', 'utf8'));
const mus = JSON.parse(fs.readFileSync('muscles.json', 'utf8'));
const cote = Object.fromEntries(mus.muscles.map(m => [m.id, m.side]));
const POING = { Fingers_Proximal_R: [0, 0, 85], Fingers_Distal_R: [0, 0, 100], Thumb_R: [0, 60, 30], Fingers_Proximal_L: [0, 0, 85], Fingers_Distal_L: [0, 0, 100], Thumb_L: [0, -60, -30] };
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader'] });
  const p = await b.newPage();
  const sortie = {};
  const seuls = process.argv.slice(2);
  for (const [id, m] of Object.entries(D.mots)) {
    if (seuls.length && !seuls.includes(id)) continue;
    let pose = { ...D._jambes[m.jambes] };
    for (const br of m.bras) Object.assign(pose, D._bras[br]);
    Object.assign(pose, m.extra || {});
    let erreur = 0;
    for (const job of m.ik) {
      const q = new URLSearchParams({ pose: JSON.stringify(pose), libres: JSON.stringify(job.libres), cibles: JSON.stringify(job.cibles) });
      await p.goto(`http://127.0.0.1:8765/ik.html?${q}`);
      await p.waitForFunction(() => document.title.startsWith('pret'), null, { timeout: 300000 });
      const r = JSON.parse((await p.title()).slice(4));
      Object.assign(pose, r.angles); erreur = Math.max(erreur, r.erreur_cm);
    }
    const garder = s => Object.fromEntries(Object.entries(POING).filter(([k]) => k.endsWith(s)));
    const mains = m.mains === 'poings' ? POING : m.mains === 'ouvertesG' ? garder('_R') : m.mains === 'ouvertesD' ? garder('_L') : {};
    Object.assign(pose, mains);
    const [groupes, cotes] = m.muscles.length ? m.muscles : [[], ''];
    const ids = groupes.flatMap(g => mus.groups[g]).filter(i => cotes.includes(cote[i]));
    sortie[id] = { pose, muscles: [...new Set(ids)], echelle: m.mains === 'ouvertes' ? {} : m.mains === 'ouvertesG' ? { Fingers_Proximal_R: .6, Thumb_R: .85 } : m.mains === 'ouvertesD' ? { Fingers_Proximal_L: .6, Thumb_L: .85 } : { Fingers_Proximal_R: .6, Thumb_R: .85, Fingers_Proximal_L: .6, Thumb_L: .85 }, erreur_cm: erreur, vue: m.vue ?? 60, lever: m.lever || 0 };
    console.log(id.padEnd(14), 'écart', erreur, 'cm');
  }
  const ancien = fs.existsSync('poses-calculees.json') ? JSON.parse(fs.readFileSync('poses-calculees.json', 'utf8')) : {};
  fs.writeFileSync('poses-calculees.json', JSON.stringify({ ...ancien, ...sortie }, null, 1));
  await b.close();
})();
