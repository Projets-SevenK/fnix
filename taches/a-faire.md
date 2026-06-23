# FNIX — À faire

## Phase 0 — Préparation
- [ ] Créer le projet Next.js.
- [ ] Installer Supabase, Zod, React Hook Form et Vitest.
- [ ] Ajouter `CLAUDE.md`, `.claude/agents`, `.claude/skills`, `docs`, `prototype`, `taches`.
- [ ] Placer la maquette validée dans `prototype/fnix-maquette.html`.
- [ ] Placer le logo dans `public/logo-fnix.png` et `prototype/assets/logo-fnix.png`.

## Phase 1 — Base UI
- [ ] Créer les composants UI de base.
- [ ] Configurer les tokens FNIX : noir, blanc, bleu.
- [ ] Intégrer la landing page depuis le prototype.
- [ ] Adapter la page à la taille M uniquement et au stock 7.

## Phase 2 — Commande
- [ ] Créer le formulaire de commande.
- [ ] Valider les champs avec Zod.
- [ ] Générer une référence `FNIX-044-XXX`.
- [ ] Créer une page de confirmation avec instructions Wero.

## Phase 3 — Supabase
- [ ] Créer les tables `orders`, `product_stock`, `admin_settings`.
- [ ] Brancher la création de commande.
- [ ] Brancher la lecture du stock.

## Phase 4 — Admin
- [ ] Créer la connexion admin.
- [ ] Créer la liste des commandes.
- [ ] Créer le détail commande.
- [ ] Permettre de marquer une commande comme payée.
- [ ] Décrémenter le stock uniquement au passage en `paid`.
- [ ] Permettre d’ajouter un numéro de suivi.
- [ ] Permettre de marquer une commande comme expédiée.

## Phase 5 — Qualité et livraison
- [ ] Ajouter les tests prioritaires.
- [ ] Faire une revue de code.
- [ ] Faire une revue sécurité.
- [ ] Ajouter les pages légales.
- [ ] Tester mobile.
- [ ] Déployer sur Vercel.
