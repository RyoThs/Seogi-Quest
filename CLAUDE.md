# Règles pour Claude (Seogi Quest)

Yoann est débutant : réponses en français simple, code complet d'abord, puis explications.

## TDD obligatoire
🔴 test qui échoue (pour la bonne raison) → 🟢 code minimal, toute la suite verte → 🔧 ranger.
Un bug = d'abord un test qui le reproduit. Ne jamais modifier ni supprimer un test pour obtenir le vert sans l'expliquer à Yoann.
Commandes : `npm test` puis `npm run test:e2e` (iPhone 13, iPhone SE, Pixel 7, hors ligne, pannes volontaires).

## Code solide et cloisonné
- Chaque écran / zone passe par `proteger()` (`js/ui/cloison.js`) : une panne n'abîme que sa zone.
- Aucune erreur silencieuse : une action ratée prévient le joueur (`prevenir()`).
- Un sujet = un fichier ; pas de copier-coller (composant commun, ex. `js/ui/fiche.js`).
- Données du téléphone : toujours passer par `reparerEtat()`.
- Essai « panne volontaire » : `?panne=stats` ou `?panne=reprise`.

## À chaque version
- Changer `VERSION` dans `sw.js`, le `?v=` dans `index.html` et `sw.js`, et ajouter tout nouveau fichier à `FICHIERS`.
- Copie de secours `sauvegarde-vX.Y.Z` avant de fusionner.
- **Envoyer le code et faire la fusion soi-même, à chaque fois** (demandé par Yoann le 2026-11-28) : tests verts (local + GitHub) → demande de fusion → fusion par Claude, sans attendre de « ok ». Ensuite, recopier `main` dans `essai-acces` (branche affichée par défaut sur GitHub) tant que Yoann ne l'a pas changée.

## Images des mots
- Photos du mannequin anatomique dans `images/mots/` (outil `outils/mannequin/`), liste dans `js/donnees/photos.js` + `images/mots/liste.json` (hors ligne).
- Chaque pose est vérifiée par **mesures** (pieds au sol, place des genoux, coudes, poings) avant d'être photographiée.
- Le texte alternatif d'une image ne doit jamais donner la réponse.
- Crédit obligatoire (page À propos) : MakeHuman CC0 ; Z-Anatomy / BodyParts3D CC BY-SA 4.0.

## Style
Ambiance « Dojang » (papier `#f5f2ec`, encre `#1a1814`, sceau rouge `#b3262e`) + cartes et boutons arrondis, police Inter.
Pas d'émoji, pas de pièces ni d'étoiles, thème clair. Ne jamais copier d'images d'un livre ou d'un site.
