// Petit serveur local qui imite GitHub Pages (appli servie dans le sous-dossier /Seogi-Quest/).
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const RACINE = path.resolve(__dirname, '../..');
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.svg': 'image/svg+xml' };
function demarrer() {
  return new Promise(ok => {
    const s = http.createServer((req, res) => {
      let url = decodeURIComponent(req.url.split('?')[0]);
      if (!url.startsWith('/Seogi-Quest/')) { res.writeHead(404); return res.end(); }
      url = url.slice('/Seogi-Quest'.length);
      if (url.endsWith('/')) url += 'index.html';
      const f = path.join(RACINE, url);
      if (!f.startsWith(RACINE) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
      res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' });
      fs.createReadStream(f).pipe(res);
    });
    s.listen(0, '127.0.0.1', () => ok({ url: `http://127.0.0.1:${s.address().port}/Seogi-Quest/`, fermer: () => s.close() }));
  });
}
module.exports = { demarrer };
