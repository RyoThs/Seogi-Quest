// Choisit les images d'un mot : photos du mannequin si elles existent, sinon les dessins.
import { aDesPhotos } from '../donnees/photos.js';
import { quatreVues } from './vues.js';

// Le texte alternatif ne doit jamais donner la réponse du jeu.
const photo = (id, n) => `<img src="images/mots/${id}-${n}.jpg" alt="Image ${n} sur 4" width="600" height="600" decoding="async">`;

export const vuesDuMot = mot => aDesPhotos(mot.id) ? [1, 2, 3, 4].map(n => photo(mot.id, n)) : quatreVues(mot);
export const imagePrincipaleDuMot = mot => vuesDuMot(mot)[0];
