# Seogi Quest

**▶ Jouer : https://ryoths.github.io/Seogi-Quest/** (après activation de GitHub Pages)

Jeu « 4 images 1 mot » pour apprendre les positions (*seogi*) et techniques du taekwondo, de la ceinture blanche au 9e dan.

- 17 niveaux au choix : 8 ceintures (Taegeuk 1 à 8) puis 9 dans (Koryo → Ilyeo), 46 mots.
- 4 images par mot : vue principale, pieds vus de dessus ou gros plan, reflet, mouvement.
- Mode **Révision** : cartes image → réponse, méthode des 5 boîtes (les mots ratés reviennent plus vite).
- Hors ligne, installable sur iPhone et Android (PWA), aucune donnée envoyée.

## Lancer les tests
```bash
npm test          # logique (node --test)
npm run test:e2e  # essais sur téléphones simulés (Playwright déjà installé)
```

## Organisation
| Dossier | Rôle |
|---|---|
| `js/logique/` | règles du jeu, révision, progression (code pur, testé) |
| `js/donnees/` | niveaux et mots |
| `js/dessin/` | poses et dessin des pratiquants (SVG) |
| `js/ui/` | écrans (un fichier par écran) et cloisons anti-panne |
| `tests/` | tests (TDD) |

Contenu à faire valider par un professeur (programme Kukkiwon / FFTDA).
