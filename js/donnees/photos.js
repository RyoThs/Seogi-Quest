// Mots qui ont les 4 photos du mannequin anatomique (images/mots/<id>-1..4.jpg).
// Les autres mots gardent les dessins en attendant leurs photos.
export const PHOTOS = [
  'naranhi', 'apseogi', 'apkubi', 'araemakki', 'momtongmakki', 'jireugi', 'apchagi',
  'olgulmakki', 'olguljireugi', 'moa',
  'dwitkubi', 'sonnalmakki', 'sonnalchigi',
  'yeopchagi', 'pyeonsonkkeut', 'deungjumeok',
  'palkup', 'mejumeok', 'dwikkoa',
  'dollyeo', 'bakkatmakki',
  'beom', 'juchum', 'batangson', 'kawi', 'mureupchigi',
  'twioapchagi', 'oesanteul',
  'kodureo', 'kaljaebi', 'mureupkkeokki',
];
const ENSEMBLE = new Set(PHOTOS);
export const aDesPhotos = id => ENSEMBLE.has(id);
export const fichiersPhotos = () => PHOTOS.flatMap(id => [1, 2, 3, 4].map(n => `images/mots/${id}-${n}.jpg`));
