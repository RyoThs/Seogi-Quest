// Les 17 niveaux du jeu : 8 ceintures de couleur (keup) puis 9 dans.
// Programme Kukkiwon / World Taekwondo, suivi par la FFTDA (à faire valider par un professeur).
export const NIVEAUX = [
  { id: 'k8', type: 'keup', nom: '8e keup', poomsae: 'Taegeuk Il Jang' },
  { id: 'k7', type: 'keup', nom: '7e keup', poomsae: 'Taegeuk I Jang' },
  { id: 'k6', type: 'keup', nom: '6e keup', poomsae: 'Taegeuk Sam Jang' },
  { id: 'k5', type: 'keup', nom: '5e keup', poomsae: 'Taegeuk Sa Jang' },
  { id: 'k4', type: 'keup', nom: '4e keup', poomsae: 'Taegeuk O Jang' },
  { id: 'k3', type: 'keup', nom: '3e keup', poomsae: 'Taegeuk Yuk Jang' },
  { id: 'k2', type: 'keup', nom: '2e keup', poomsae: 'Taegeuk Chil Jang' },
  { id: 'k1', type: 'keup', nom: '1er keup', poomsae: 'Taegeuk Pal Jang' },
  { id: 'd1', type: 'dan', nom: '1er dan', poomsae: 'Koryo' },
  { id: 'd2', type: 'dan', nom: '2e dan', poomsae: 'Keumgang' },
  { id: 'd3', type: 'dan', nom: '3e dan', poomsae: 'Taebaek' },
  { id: 'd4', type: 'dan', nom: '4e dan', poomsae: 'Pyongwon' },
  { id: 'd5', type: 'dan', nom: '5e dan', poomsae: 'Sipjin' },
  { id: 'd6', type: 'dan', nom: '6e dan', poomsae: 'Jitae' },
  { id: 'd7', type: 'dan', nom: '7e dan', poomsae: 'Cheonkwon' },
  { id: 'd8', type: 'dan', nom: '8e dan', poomsae: 'Hansu' },
  { id: 'd9', type: 'dan', nom: '9e dan', poomsae: 'Ilyeo' },
];
export const niveauParId = id => NIVEAUX.find(n => n.id === id);
