// Les mots à deviner. « pose » dit comment dessiner le pratiquant (voir js/dessin/poses.js) :
// j = jambes, av = bras avant, ar = bras arrière.
const m = (id, niveau, genre, mot, hangul, fr, comment, ou, pose) =>
  ({ id, niveau, genre, mot, hangul, fr, comment, ou, pose });

export const MOTS = [
  // ---------- 8e keup · Taegeuk Il Jang ----------
  m('naranhi', 'k8', 'position', 'NARANHI SEOGI', '나란히서기', 'position pieds parallèles',
    'Pieds parallèles, écartés de la largeur des épaules. Jambes tendues, poids réparti.', 'Position de départ (junbi) des Taegeuk.', { j: 'naranhi', av: 'junbi', ar: 'junbi' }),
  m('apseogi', 'k8', 'position', 'AP SEOGI', '앞서기', 'position de marche',
    'Un pas naturel entre les pieds, jambes tendues, buste de face. Pied arrière ouvert à 45° au plus. Sert à avancer.', 'Dès Taegeuk Il Jang.', { j: 'apseogi', av: 'hanche', ar: 'hanche' }),
  m('apkubi', 'k8', 'position', 'AP KUBI', '앞굽이', 'position avant',
    'Pieds à un pas et demi, talons sur la même ligne. Genou avant plié au-dessus du pied, jambe arrière tendue, pied arrière ouvert à 45° au plus. Poids surtout devant.', 'Dès Taegeuk Il Jang.', { j: 'apkubi', av: 'hanche', ar: 'hanche' }),
  m('araemakki', 'k8', 'technique', 'ARAE MAKKI', '아래막기', 'blocage bas',
    'L\'avant-bras descend en diagonale pour protéger le bas du corps. L\'autre poing revient à la hanche.', 'Premier mouvement de Taegeuk Il Jang.', { j: 'apkubi', av: 'arae', ar: 'hanche' }),
  m('momtongmakki', 'k8', 'technique', 'MOMTONG MAKKI', '몸통막기', 'blocage au corps',
    'L\'avant-bras, vertical, balaie de l\'extérieur vers l\'intérieur à hauteur du plexus.', 'Taegeuk Il Jang.', { j: 'apseogi', av: 'momtong', ar: 'hanche' }),
  m('jireugi', 'k8', 'technique', 'MOMTONG JIREUGI', '몸통지르기', 'coup de poing au corps',
    'Le poing part de la hanche en tournant et frappe à hauteur du plexus. L\'autre poing revient à la hanche.', 'Taegeuk Il Jang.', { j: 'apseogi', av: 'poing', ar: 'hanche' }),
  m('apchagi', 'k8', 'technique', 'AP CHAGI', '앞차기', 'coup de pied de face',
    'Monter le genou, puis détendre la jambe vers l\'avant. On frappe avec le bol du pied, orteils relevés.', 'Taegeuk Il Jang.', { j: 'apchagi', av: 'garde', ar: 'gardeAr' }),
  // ---------- 7e keup · Taegeuk I Jang ----------
  m('olgulmakki', 'k7', 'technique', 'OLGUL MAKKI', '얼굴막기', 'blocage haut',
    'L\'avant-bras monte au-dessus du front, légèrement incliné, pour protéger le visage.', 'Taegeuk I Jang.', { j: 'apseogi', av: 'olgul', ar: 'hanche' }),
  m('olguljireugi', 'k7', 'technique', 'OLGUL JIREUGI', '얼굴지르기', 'coup de poing au visage',
    'Même coup de poing que le direct, mais à hauteur du visage.', 'Taegeuk I Jang.', { j: 'apkubi', av: 'poingHaut', ar: 'hanche' }),
  m('moa', 'k7', 'position', 'MOA SEOGI', '모아서기', 'position pieds joints',
    'Pieds collés, jambes tendues, buste droit.', 'Salut et départ de nombreux poomsae.', { j: 'moa', av: 'colle', ar: 'colle' }),
  // ---------- 6e keup · Taegeuk Sam Jang ----------
  m('dwitkubi', 'k6', 'position', 'DWIT KUBI', '뒷굽이', 'position arrière',
    'Pieds à un pas, poids surtout sur la jambe arrière. Genoux pliés ; pied et genou arrière tournés à 90° vers l\'extérieur (pieds en L).', 'Dès Taegeuk Sam Jang.', { j: 'dwitkubi', av: 'hanche', ar: 'hanche' }),
  m('sonnalmakki', 'k6', 'technique', 'SONNAL MAKKI', '손날막기', 'blocage main en sabre',
    'Les deux mains ouvertes : l\'une bloque avec le tranchant, l\'autre protège le plexus. Souvent en dwit kubi.', 'Taegeuk Sam Jang.', { j: 'dwitkubi', av: 'sonnal', ar: 'plexus' }),
  m('sonnalchigi', 'k6', 'technique', 'SONNAL MOK CHIGI', '손날목치기', 'frappe au cou main en sabre',
    'Frappe horizontale avec le tranchant de la main ouverte, à hauteur du cou.', 'Taegeuk Sam Jang.', { j: 'apkubi', av: 'sonnalChigi', ar: 'hanche' }),
  // ---------- 5e keup · Taegeuk Sa Jang ----------
  m('yeopchagi', 'k5', 'technique', 'YEOP CHAGI', '옆차기', 'coup de pied de côté',
    'Genou monté, hanche tournée, jambe détendue sur le côté. On frappe avec le tranchant ou le talon.', 'Taegeuk Sa Jang.', { j: 'yeopchagi', av: 'garde', ar: 'gardeAr' }),
  m('pyeonsonkkeut', 'k5', 'technique', 'PYEONSONKKEUT', '편손끝', 'pique de la main',
    'Main ouverte, doigts tendus serrés, on pique vers l\'avant au plexus.', 'Taegeuk Sa Jang.', { j: 'apkubi', av: 'pique', ar: 'sousCoude' }),
  m('deungjumeok', 'k5', 'technique', 'DEUNG JUMEOK', '등주먹', 'revers du poing',
    'Frappe avec le dos du poing, en fouettant de l\'intérieur vers l\'extérieur, vers le visage.', 'Taegeuk Sa Jang.', { j: 'apseogi', av: 'revers', ar: 'hanche' }),
  // ---------- 4e keup · Taegeuk O Jang ----------
  m('palkup', 'k4', 'technique', 'PALKUP CHIGI', '팔굽치기', 'coup de coude',
    'Le coude frappe en arc à hauteur du menton, l\'autre main peut servir de cible.', 'Taegeuk O Jang.', { j: 'apkubi', av: 'coude', ar: 'hanche' }),
  m('mejumeok', 'k4', 'technique', 'MEJUMEOK', '메주먹', 'poing marteau',
    'Le poing tombe comme un marteau, on frappe avec le côté du poing (petit doigt).', 'Taegeuk O Jang.', { j: 'apkubi', av: 'marteau', ar: 'hanche' }),
  m('dwikkoa', 'k4', 'position', 'DWI KKOA SEOGI', '뒤꼬아서기', 'position jambes croisées',
    'Le pied arrière vient se croiser derrière le pied avant, sur la pointe. Genoux fléchis.', 'Taegeuk O Jang.', { j: 'dwikkoa', av: 'deungAv', ar: 'hanche' }),
  // ---------- 3e keup · Taegeuk Yuk Jang ----------
  m('dollyeo', 'k3', 'technique', 'DOLLYEO CHAGI', '돌려차기', 'coup de pied circulaire',
    'Genou monté, on pivote sur le pied d\'appui et la jambe se détend en arc. On frappe avec le dessus du pied.', 'Taegeuk Yuk Jang, et le coup le plus utilisé en combat.', { j: 'dollyeo', av: 'garde', ar: 'gardeAr' }),
  m('bakkatmakki', 'k3', 'technique', 'BAKKAT MAKKI', '바깥막기', 'blocage vers l\'extérieur',
    'L\'avant-bras balaie de l\'intérieur vers l\'extérieur pour écarter l\'attaque.', 'Taegeuk Yuk Jang.', { j: 'apkubi', av: 'bakkat', ar: 'hanche' }),
  // ---------- 2e keup · Taegeuk Chil Jang ----------
  m('beom', 'k2', 'position', 'BEOM SEOGI', '범서기', 'position du tigre',
    'Presque tout le poids sur la jambe arrière, pliée. Le pied avant pose seulement la pointe ; les pieds forment un angle d\'environ 45°.', 'Taegeuk Chil Jang.', { j: 'beom', av: 'batangson', ar: 'hanche' }),
  m('juchum', 'k2', 'position', 'JUCHUM SEOGI', '주춤서기', 'position du cavalier',
    'Pieds parallèles, écartés de deux longueurs de pied. Genoux pliés et écartés, dos bien droit, comme sur un cheval.', 'Taegeuk Chil Jang.', { j: 'juchum', av: 'faceHanche', ar: 'faceHanche', vue: 'face' }),
  m('batangson', 'k2', 'technique', 'BATANGSON MAKKI', '바탕손막기', 'blocage paume de la main',
    'On bloque avec la base de la paume, main ouverte et doigts vers le haut.', 'Taegeuk Chil Jang.', { j: 'beom', av: 'batangson', ar: 'plexus' }),
  m('kawi', 'k2', 'technique', 'KAWI MAKKI', '가위막기', 'blocage en ciseaux',
    'Les deux bras se croisent puis bloquent en même temps : un bras en bas, l\'autre au corps.', 'Taegeuk Chil Jang.', { j: 'apkubi', av: 'arae', ar: 'momtongAr' }),
  m('mureupchigi', 'k2', 'technique', 'MUREUP CHIGI', '무릎치기', 'coup de genou',
    'Les mains tirent la tête de l\'adversaire vers le bas pendant que le genou monte.', 'Taegeuk Chil Jang.', { j: 'genou', av: 'tirer', ar: 'tirer' }),
  // ---------- 1er keup · Taegeuk Pal Jang ----------
  m('twioapchagi', 'k1', 'technique', 'TWIO AP CHAGI', '뛰어앞차기', 'coup de pied de face sauté',
    'On saute et on frappe en ap chagi pendant que l\'autre jambe est encore en l\'air.', 'Taegeuk Pal Jang.', { j: 'twioAp', av: 'garde', ar: 'gardeAr' }),
  m('oesanteul', 'k1', 'technique', 'OESANTEUL MAKKI', '외산틀막기', 'blocage montagne simple',
    'Un bras bloque vers le bas, l\'autre bloque haut sur le côté, main en sabre.', 'Taegeuk Pal Jang.', { j: 'juchum', av: 'faceBas', ar: 'faceHaut', vue: 'face' }),
  // ---------- 1er dan · Koryo ----------
  m('kodureo', 'd1', 'technique', 'KODUREO MAKKI', '거들어막기', 'blocage renforcé',
    'Un bras bloque, l\'autre main vient le soutenir sous le coude pour plus de force.', 'Koryo.', { j: 'dwitkubi', av: 'momtong', ar: 'soutien' }),
  m('kaljaebi', 'd1', 'technique', 'KALJAEBI', '칼재비', 'frappe main en arc à la gorge',
    'Main ouverte en forme d\'arc entre le pouce et l\'index, on frappe la gorge.', 'Koryo.', { j: 'apkubi', av: 'arc', ar: 'hanche' }),
  m('mureupkkeokki', 'd1', 'technique', 'MUREUP KKEOKKI', '무릎꺾기', 'brisure du genou',
    'Une main frappe vers le bas le genou de l\'adversaire pendant que l\'autre tire.', 'Koryo.', { j: 'apkubi', av: 'marteauBas', ar: 'hanche' }),
  // ---------- 2e dan · Keumgang ----------
  m('hakdari', 'd2', 'position', 'HAKDARI SEOGI', '학다리서기', 'position de la grue',
    'En équilibre sur une jambe légèrement fléchie, l\'autre pied posé contre le genou.', 'Keumgang.', { j: 'hakdari', av: 'olgul', ar: 'arae' }),
  m('keumgangmakki', 'd2', 'technique', 'KEUMGANG MAKKI', '금강막기', 'blocage du diamant',
    'Blocage haut et blocage bas en même temps, un bras de chaque côté.', 'Keumgang.', { j: 'apkubi', av: 'arae', ar: 'olgulAr' }),
  m('santeul', 'd2', 'technique', 'SANTEUL MAKKI', '산틀막기', 'blocage de la montagne',
    'Les deux bras pliés à angle droit montent de chaque côté de la tête, comme la forme d\'une montagne.', 'Keumgang.', { j: 'juchum', av: 'faceMontagne', ar: 'faceMontagne', vue: 'face' }),
  // ---------- 3e dan · Taebaek ----------
  m('hecho', 'd3', 'technique', 'HECHO MAKKI', '헤쳐막기', 'blocage en ouvrant',
    'Les deux avant-bras s\'écartent en même temps pour ouvrir la garde de l\'adversaire.', 'Taebaek.', { j: 'naranhi', av: 'faceOuvrir', ar: 'faceOuvrir', vue: 'face' }),
  m('jebipum', 'd3', 'technique', 'JEBIPUM MOK CHIGI', '제비품목치기', 'frappe en hirondelle',
    'Une main bloque haut pendant que l\'autre frappe le cou main en sabre.', 'Taebaek.', { j: 'apkubi', av: 'sonnalChigi', ar: 'olgulAr' }),
  // ---------- 4e dan · Pyongwon ----------
  m('gyeopson', 'd4', 'position', 'GYEOPSON JUNBI', '겹손준비', 'position prête mains superposées',
    'Pieds parallèles, les mains l\'une sur l\'autre devant le bas-ventre.', 'Départ de Pyongwon.', { j: 'naranhi', av: 'gyeopson', ar: 'gyeopson' }),
  m('naeryeo', 'd4', 'technique', 'NAERYEO CHAGI', '내려차기', 'coup de pied descendant',
    'La jambe tendue monte très haut puis redescend comme une hache, talon en avant.', 'Combat et démonstrations.', { j: 'naeryeo', av: 'garde', ar: 'gardeAr' }),
  // ---------- 5e dan · Sipjin ----------
  m('mireo', 'd5', 'technique', 'MIREO CHAGI', '밀어차기', 'coup de pied poussé',
    'On pousse avec la plante du pied pour repousser l\'adversaire.', 'Combat.', { j: 'mireo', av: 'garde', ar: 'gardeAr' }),
  m('bandal', 'd5', 'technique', 'BANDAL CHAGI', '반달차기', 'coup de pied en croissant',
    'Entre le coup de pied de face et le circulaire : la jambe décrit un demi-cercle.', 'Combat.', { j: 'bandal', av: 'garde', ar: 'gardeAr' }),
  // ---------- 6e dan · Jitae ----------
  m('dwitchagi', 'd6', 'technique', 'DWIT CHAGI', '뒷차기', 'coup de pied arrière',
    'On tourne le dos et la jambe part droit derrière, talon en avant.', 'Combat et démonstrations.', { j: 'dwitchagi', av: 'garde', ar: 'gardeAr' }),
  // ---------- 7e dan · Cheonkwon ----------
  m('nalgae', 'd7', 'technique', 'NALGAE PYEOGI', '날개펴기', 'ouverture des ailes',
    'Les bras s\'ouvrent lentement de chaque côté, comme un oiseau qui déploie ses ailes.', 'Cheonkwon.', { j: 'naranhi', av: 'faceAiles', ar: 'faceAiles', vue: 'face' }),
  m('taesan', 'd7', 'technique', 'TAESAN MILGI', '태산밀기', 'poussée de la montagne',
    'Une paume pousse devant pendant que l\'autre bras protège en haut, comme pour déplacer une montagne.', 'Cheonkwon.', { j: 'apkubi', av: 'pousser', ar: 'olgulAr' }),
  // ---------- 8e dan · Hansu ----------
  m('huryeo', 'd8', 'technique', 'HURYEO CHAGI', '후려차기', 'coup de pied crocheté',
    'La jambe tendue passe devant la cible, puis le talon revient en crochet.', 'Combat et démonstrations.', { j: 'huryeo', av: 'garde', ar: 'gardeAr' }),
  // ---------- 9e dan · Ilyeo ----------
  m('dwihuryeo', 'd9', 'technique', 'DWI HURYEO CHAGI', '뒤후려차기', 'coup de pied retourné crocheté',
    'On tourne sur soi-même et la jambe tendue fouette en arrière avec le talon.', 'Combat et démonstrations.', { j: 'dwihuryeo', av: 'garde', ar: 'gardeAr' }),
  m('twioyeop', 'd9', 'technique', 'TWIO YEOP CHAGI', '뛰어옆차기', 'coup de pied de côté sauté',
    'On saute et on frappe en yeop chagi, l\'autre jambe repliée.', 'Démonstrations.', { j: 'twioYeop', av: 'garde', ar: 'gardeAr' }),
];
export const motParId = id => MOTS.find(x => x.id === id);
