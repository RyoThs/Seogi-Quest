# Outil de production des images (mannequin anatomique)

Sert à fabriquer les images des mots. **Rien de ce dossier n'est chargé par l'appli** : elle n'utilise que les images produites.

| Fichier | Rôle |
|---|---|
| `corps-homme.glb` | Corps anatomique masculin (voir licence ci-dessous) |
| `muscles.json` | Carte des muscles (identifiants, groupes) |
| `mots-poses.json` | Pour chaque mot : jambes et bras de départ + cibles (coude, poing, genou, pied) |
| `ik.html` | Calculateur d'angles (cinématique inverse) |
| `produire.cjs` | Calcule les poses de tous les mots → `poses-calculees.json` |
| `rendre.cjs` | Photographie chaque pose (lumière studio, muscles actifs en rouge) |
| `produire-images.cjs` | Produit les 4 images de chaque mot dans `images/mots/` (principale, autre côté, gros plan, mouvement avec la pose de départ en transparence) |

Lancer (three.js 0.170.0 dans `package/` à côté des pages, et un petit serveur web sur le port 8765) :
```bash
node produire.cjs            # ou : node produire.cjs apkubi araemakki
node rendre.cjs 60 vues      # angle de vue en degrés, dossier de sortie
node produire-images.cjs ../../images/mots   # les images de l'appli
```
Après un nouveau mot : l'ajouter à `PHOTOS` dans `js/donnees/photos.js`, régénérer `images/mots/liste.json` (un test vérifie qu'ils correspondent).
```
```

## Licences
- Corps et squelette : **MakeHuman, CC0** (via le paquet `ecorche-body` 0.3.2).
- Carte des muscles : **Z-Anatomy / BodyParts3D, CC BY-SA 4.0** — à citer dans l'appli ; les images produites avec la carte des muscles sont sous CC BY-SA 4.0.
