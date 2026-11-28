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

Lancer (three.js 0.170.0 dans `package/` à côté des pages, et un petit serveur web sur le port 8765) :
```bash
node produire.cjs            # ou : node produire.cjs apkubi araemakki
node rendre.cjs 60 vues      # angle de vue en degrés, dossier de sortie
```

## Licences
- Corps et squelette : **MakeHuman, CC0** (via le paquet `ecorche-body` 0.3.2).
- Carte des muscles : **Z-Anatomy / BodyParts3D, CC BY-SA 4.0** — à citer dans l'appli ; les images produites avec la carte des muscles sont sous CC BY-SA 4.0.
