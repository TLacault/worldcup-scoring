# Pronostics — Coupe du Monde 2026 ⚽

Petite app web (Vue 3 + Vite) pour pronostiquer les scores de la **phase de groupes**
de la Coupe du Monde 2026 (12 groupes, 72 matchs).

## Fonctionnalités

- Les 72 matchs de poule, avec **date et heure de Paris**.
- Deux modes d'affichage : **par groupe** (A → L) ou **par date** (chronologique),
  chaque section étant pliable/dépliable.
- Filtres *Tous / À venir / Joués* et navigation rapide par groupe.
- Un champ **Pronostic** et un champ **Score réel** sous chaque match.
- **Calcul automatique des points :**
  - Score exact deviné → **3 pts**
  - Bon résultat (victoire/nul/défaite, nul inclus) → **1 pt**
  - Sinon → **0 pt**
- **Scores récupérés automatiquement** : un workflow GitHub interroge une API
  gratuite et pré-remplit le champ *Score réel* (marqué « auto », toujours
  modifiable — une saisie manuelle prend le dessus).
- **Export / import** de vos pronostics dans un fichier `.txt`.
- Tout est **enregistré dans le navigateur** (localStorage) — aucune connexion requise.

## Lancer le projet

```bash
npm install
npm run dev      # serveur de développement
npm run build    # build de production dans dist/
npm run preview  # prévisualiser le build
```

## Structure

```
src/
  data/teams.js         # 48 équipes (nom FR + drapeau)
  data/tournament.js    # 12 groupes + 72 matchs (coups d'envoi en UTC)
  utils/scoring.js      # règle de points (pure)
  utils/datetime.js     # mise en forme heure de Paris (Intl)
  utils/schedule.js     # journées (J1/J2/J3) + regroupement par jour
  composables/usePredictions.js  # store réactif + localStorage + scores auto
  components/           # ScoreBoard, GroupSection, DaySection, MatchCard
  App.vue
scripts/fetch-scores.mjs            # récupération des scores -> public/results.json
public/results.json                 # scores publiés (mis à jour par le workflow)
.github/workflows/deploy.yml        # build + déploiement GitHub Pages
.github/workflows/fetch-scores.yml  # récupération périodique des scores
```

> Les coups d'envoi sont stockés en UTC et convertis à l'affichage vers
> `Europe/Paris`, ce qui gère automatiquement les matchs nord-américains
> qui débutent après minuit, heure française.

## Déploiement (GitHub Pages)

Le dépôt cible est `https://github.com/TLacault/worldcup-scoring` et l'app sera
servie sur `https://tlacault.github.io/worldcup-scoring/`.

1. Initialiser et pousser le code :

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TLacault/worldcup-scoring.git
   git push -u origin main
   ```

2. Dans **Settings → Pages**, choisir **Source : GitHub Actions**.
3. Le workflow `Deploy` construit et publie l'app à chaque push sur `main`.

### Scores en direct (gratuit)

Les scores sont récupérés via [football-data.org](https://www.football-data.org/)
(palier gratuit), sans clé exposée côté client : un workflow planifié écrit
`public/results.json`, que l'app lit au chargement.

1. Créer un compte gratuit sur football-data.org et copier le jeton API.
2. Dans **Settings → Secrets and variables → Actions**, ajouter un secret
   nommé `FOOTBALL_DATA_TOKEN` avec ce jeton.
3. Le workflow `Fetch scores` s'exécute toutes les 30 min (ou manuellement via
   *Run workflow*), met à jour `public/results.json` puis redéploie l'app.

> Sans le secret, l'app fonctionne normalement : seul le remplissage
> automatique des scores est désactivé (saisie manuelle toujours possible).
