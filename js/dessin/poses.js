// Squelettes des poses, vus de côté (le pratiquant regarde vers la droite) ou de face.
// Coordonnées dans un carré de 400 × 400, sol à y = 352.
// Jambes : h = hanche, ar/av = [genou, cheville], pAr/pAv = pied (a = angle en degrés, 0 = à plat vers l'avant ;
// « pointe » = sur la pointe), incl = inclinaison du buste (négatif = penché en arrière).
// Bras : décalages depuis l'épaule [coude, main] ; m = 'poing' ou 'ouverte'.

const plat = { a: 0 }, pointe = { a: 35, pointe: true };

export const JAMBES = {
  // ----- positions -----
  naranhi: { vue: 'face', h: [205, 206], ar: [[189, 276], [186, 346]], av: [[221, 276], [224, 346]], pAr: plat, pAv: plat,
    pieds: { traces: [[165, 200, 0], [235, 200, 0]], texte: 'largeur des épaules' } },
  moa: { vue: 'face', h: [205, 206], ar: [[199, 276], [198, 346]], av: [[211, 276], [212, 346]], pAr: plat, pAv: plat,
    pieds: { traces: [[188, 200, 0], [212, 200, 0]], texte: 'pieds joints' } },
  juchum: { vue: 'face', h: [205, 236], ar: [[164, 282], [168, 346]], av: [[246, 282], [242, 346]], pAr: plat, pAv: plat,
    pieds: { traces: [[120, 200, 0], [280, 200, 0]], texte: '2 longueurs de pied' } },
  apseogi: { h: [205, 212], ar: [[186, 279], [168, 346]], av: [[225, 279], [244, 346]], pAr: plat, pAv: plat,
    pieds: { traces: [[175, 260, -30], [225, 140, 0]], texte: '1 pas' } },
  apkubi: { h: [200, 218], ar: [[150, 283], [108, 346]], av: [[262, 272], [272, 346]], pAr: plat, pAv: plat,
    pieds: { traces: [[150, 290, -45], [250, 110, 0]], texte: '1,5 pas' } },
  dwitkubi: { h: [190, 226], incl: -4, ar: [[196, 288], [160, 346]], av: [[232, 284], [262, 346]], pAr: plat, pAv: plat,
    pieds: { traces: [[160, 260, -90], [240, 130, 0]], texte: 'pieds en L' } },
  beom: { h: [198, 238], ar: [[220, 290], [188, 346]], av: [[238, 292], [250, 336]], pAr: plat, pAv: pointe,
    pieds: { traces: [[185, 270, -45], [220, 140, 0, true]], texte: 'pointe du pied' } },
  dwikkoa: { h: [205, 236], ar: [[224, 292], [206, 340]], av: [[244, 290], [236, 346]], pAr: pointe, pAv: plat,
    pieds: { traces: [[220, 160, 0], [192, 236, -30, true]], texte: 'pied croisé derrière' } },
  hakdari: { h: [205, 208], ar: [[206, 278], [204, 346]], av: [[256, 250], [214, 276]], pAr: plat, pAv: { a: 160 },
    pieds: { traces: [[200, 200, 0]], texte: 'sur une jambe' } },
  debout: { h: [205, 206], ar: [[203, 276], [200, 346]], av: [[207, 276], [210, 346]], pAr: plat, pAv: plat,
    pieds: { traces: [[190, 200, 0], [210, 200, 0]], texte: 'debout' } },
  // ----- coups de pied (jambe avant = jambe qui frappe) -----
  apchagi: { h: [198, 208], incl: -6, ar: [[196, 278], [190, 346]], av: [[268, 190], [332, 168]], pAr: plat, pAv: { a: -55 }, frappe: true },
  yeopchagi: { h: [196, 214], incl: -28, ar: [[194, 282], [184, 346]], av: [[262, 206], [332, 200]], pAr: plat, pAv: { a: 80 }, frappe: true },
  dollyeo: { h: [198, 212], incl: -18, ar: [[196, 280], [186, 346]], av: [[262, 190], [328, 176]], pAr: plat, pAv: { a: -12 }, frappe: true },
  naeryeo: { h: [196, 212], incl: -12, ar: [[194, 280], [186, 346]], av: [[238, 150], [268, 84]], pAr: plat, pAv: { a: -60 }, frappe: true },
  mireo: { h: [198, 210], incl: -8, ar: [[196, 280], [188, 346]], av: [[258, 196], [326, 198]], pAr: plat, pAv: { a: -90 }, frappe: true },
  bandal: { h: [198, 210], incl: -10, ar: [[196, 280], [188, 346]], av: [[255, 180], [318, 150]], pAr: plat, pAv: { a: -40 }, frappe: true },
  huryeo: { h: [198, 212], incl: -24, ar: [[196, 280], [186, 346]], av: [[266, 184], [318, 214]], pAr: plat, pAv: { a: -20 }, frappe: true },
  dwitchagi: { h: [212, 214], incl: 30, ar: [[214, 282], [222, 346]], av: [[146, 206], [78, 202]], pAr: plat, pAv: { a: 90 }, frappe: true },
  dwihuryeo: { h: [212, 212], incl: 26, ar: [[214, 280], [222, 346]], av: [[150, 170], [90, 138]], pAr: plat, pAv: { a: -110 }, frappe: true },
  twioAp: { h: [198, 170], incl: -4, ar: [[240, 224], [200, 262]], av: [[262, 158], [330, 130]], pAr: { a: 100 }, pAv: { a: -55 }, frappe: true, saut: true },
  twioYeop: { h: [196, 176], incl: -26, ar: [[236, 226], [192, 236]], av: [[262, 170], [334, 164]], pAr: { a: 170 }, pAv: { a: 80 }, frappe: true, saut: true },
  genou: { h: [200, 212], incl: 8, ar: [[196, 280], [186, 346]], av: [[258, 170], [236, 244]], pAr: plat, pAv: { a: 70 }, frappe: true },
};

const b = (coude, main, m = 'poing') => ({ coude, main, m });
export const BRAS = {
  // ----- vus de côté -----
  hanche: b([-28, 40], [-6, 84]),
  garde: b([30, 40], [52, 8]),
  gardeAr: b([10, 46], [36, 24]),
  arae: b([28, 44], [52, 88]),
  momtong: b([36, 42], [44, 0]),
  momtongAr: b([30, 44], [40, 4]),
  bakkat: b([24, 40], [30, -6]),
  poing: b([44, 12], [90, 16]),
  poingHaut: b([44, 0], [90, -12]),
  olgul: b([34, -30], [4, -56]),
  olgulAr: b([30, -32], [-2, -58]),
  sonnal: b([32, 30], [46, -10], 'ouverte'),
  plexus: b([14, 40], [34, 30], 'ouverte'),
  sonnalChigi: b([42, -4], [86, -14], 'ouverte'),
  pique: b([44, 14], [90, 10], 'ouverte'),
  sousCoude: b([16, 42], [40, 40], 'ouverte'),
  revers: b([30, 4], [58, -34]),
  deungAv: b([30, 4], [58, -34]),
  coude: b([46, -2], [8, -6]),
  marteau: b([40, -24], [76, 6]),
  marteauBas: b([36, 30], [64, 70]),
  batangson: b([36, 30], [56, 0], 'ouverte'),
  tirer: b([40, 30], [62, 66], 'ouverte'),
  soutien: b([20, 40], [36, 42]),
  arc: b([44, 0], [88, -14], 'ouverte'),
  pousser: b([44, 10], [90, 0], 'ouverte'),
  // ----- vus de face (côté droit de l'image ; l'autre bras est le reflet) -----
  junbi: b([14, 46], [-6, 84]),
  colle: b([4, 46], [6, 90]),
  gyeopson: b([10, 48], [-18, 86], 'ouverte'),
  faceHanche: b([18, 40], [4, 82]),
  faceBas: b([22, 46], [44, 90]),
  faceHaut: b([40, -6], [40, -50], 'ouverte'),
  faceMontagne: b([44, 4], [46, -42]),
  faceOuvrir: b([30, 30], [42, -8]),
  faceAiles: b([46, 26], [88, 40], 'ouverte'),
};
