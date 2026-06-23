# FNIX — À faire

## Phase 0 — Préparation
- [x] Créer le projet Next.js.
- [x] Installer Supabase, Zod, React Hook Form et Vitest.
- [x] Ajouter `CLAUDE.md`, `.claude/agents`, `.claude/skills`, `docs`, `prototype`, `taches`.
- [x] Placer la maquette validée dans `prototype/fnix-maquette.html`.
- [x] Placer le logo dans `public/fnix-logo.png` et `prototype/assets/fnix-logo.png`.

## Phase 1 — Base UI
- [x] Créer les composants UI de base.
- [x] Configurer les tokens FNIX : noir, blanc, bleu.
- [x] Intégrer la landing page depuis le prototype.
- [x] Adapter la page à la taille M uniquement et au stock 7.

## Phase 2 — Commande
- [x] Créer le formulaire de commande.
- [x] Valider les champs avec Zod.
- [x] Générer une référence `FNIX-044-XXX`.
- [x] Créer une page de confirmation avec instructions Wero.

## Phase 3 — Supabase
- [x] Créer les tables `orders`, `product_stock`, `admin_settings`.
- [x] Brancher la création de commande.
- [x] Brancher la lecture du stock.

## Phase 4 — Admin
- [x] Créer la connexion admin.
- [x] Créer la liste des commandes.
- [x] Créer le détail commande.
- [x] Permettre de marquer une commande comme payée.
- [x] Décrémenter le stock uniquement au passage en `paid`.
- [x] Permettre d'ajouter un numéro de suivi.
- [x] Permettre de marquer une commande comme expédiée.

## Phase 5 — Mini-CMS produit
- [ ] Étendre la table `admin_settings` : ajouter `product_description`,
      `product_status`, `wero_beneficiary_name`, `hero_image_url`,
      `product_image_main_url`, `product_image_secondary_1_url`,
      `product_image_secondary_2_url`.
- [ ] Créer le bucket Supabase Storage `product-images` (public).
- [ ] Créer la page admin `/admin/produit`.
- [ ] Permettre de modifier le prix (`product_price`).
- [ ] Permettre de modifier la description (`product_description`).
- [ ] Permettre de modifier le statut du drop :
      `available`, `coming_soon`, `sold_out`.
- [ ] Permettre d'uploader/remplacer les 4 photos :
      hero, produit principale, produit secondaire 1, produit secondaire 2.
- [ ] Permettre de modifier les paramètres Wero :
      numéro, nom bénéficiaire, URL QR code.
- [ ] Permettre d'ajuster manuellement le stock (avec confirmation) —
      pour correction d'erreur uniquement, pas de contournement de la règle `paid`.
- [ ] Brancher la landing page sur ces données dynamiques
      (lire `admin_settings` au rendu des sections).

## Phase 6 — Qualité et livraison
- [ ] Ajouter les tests prioritaires.
- [ ] Faire une revue de code.
- [ ] Faire une revue sécurité.
- [ ] Ajouter les pages légales.
- [ ] Tester mobile.
- [ ] Déployer sur Vercel.
