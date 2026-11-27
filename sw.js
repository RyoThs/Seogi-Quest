// Service worker : garde l'appli dans le téléphone pour jouer sans internet.
// À chaque nouvelle version : changer VERSION et ajouter les nouveaux fichiers à FICHIERS.
const VERSION = 'seogi-quest-v0.1.0';
const FICHIERS = [
  './', './index.html', './manifest.webmanifest', './css/style.css?v=0.1.0', './js/app.js?v=0.1.0',
  './js/stockage.js', './js/donnees/niveaux.js', './js/donnees/mots.js',
  './js/logique/partie.js', './js/logique/progression.js', './js/logique/revision.js',
  './js/dessin/poses.js', './js/dessin/personnage.js', './js/dessin/vues.js',
  './js/ui/cloison.js', './js/ui/icones.js', './js/ui/fiche.js', './js/ui/accueil.js', './js/ui/niveaux.js', './js/ui/jeu.js', './js/ui/revision.js',
  './icones/icone-180.png', './icones/icone-192.png', './icones/icone-512.png', './icones/icone-512-masque.png',
];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(FICHIERS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(cles => Promise.all(cles.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, { ignoreSearch: false }).then(r => r || fetch(e.request).catch(() => caches.match('./index.html'))));
});
