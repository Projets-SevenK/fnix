# Architecture FNIX

## Type de projet
Landing page vitrine-commerce avec tunnel de commande manuel et dashboard admin simple.

## Stack
- Next.js App Router.
- TypeScript.
- Tailwind CSS.
- Supabase PostgreSQL.
- Supabase Auth pour l'admin.
- Vitest pour les tests.
- Vercel pour le déploiement.

## Couches
- `app/` : routes et pages.
- `components/` : UI réutilisable.
- `lib/` : logique métier, Supabase, validations.
- `types/` : types partagés.
- `docs/` : documentation.
- `prototype/` : référence UI.
- `taches/` : suivi de travail et leçons.

## Règle d'architecture
La logique métier ne doit pas être dispersée dans les composants React.

- Commandes : `lib/orders.ts`.
- Stock : `lib/stock.ts`.
- Références : `lib/references.ts`.
- Validations : `lib/validations/`.

## Supabase

### Clients
- `lib/supabase/client.ts` — client browser (`NEXT_PUBLIC_SUPABASE_ANON_KEY`). Lecture publique uniquement.
- `lib/supabase/server.ts` — client server (`SUPABASE_SERVICE_ROLE_KEY`). Bypass RLS. Ne jamais importer dans un composant `use client`.
- `lib/supabase/middleware.ts` — client Edge Runtime (`NEXT_PUBLIC_SUPABASE_ANON_KEY`). Utilisé par `proxy.ts` uniquement.

### Mutations
Toutes les mutations passent par des Server Actions. Pas d'API Routes.
- `app/commande/actions.ts` — création de commande (public).
- `app/admin/actions.ts` — changement de statut, tracking (admin).
- `app/admin/commandes/actions.ts` — déconnexion.

### Référence de commande
Générée via `SELECT nextval('orders_seq')` dans la Server Action, passée à `generateReference()` de `lib/references.ts`. Jamais par `COUNT(*) + 1`.

### Décrémentation du stock
Via la RPC PostgreSQL `mark_order_paid(order_id)` — atomique, protège contre la double décrémentation. Appelée uniquement par l'action admin de passage en `paid`. Jamais à la création d'une commande.

### Protection des routes admin
`proxy.ts` à la racine (convention Next.js 16) intercepte toutes les routes `/admin/*`. Redirige vers `/admin/login` si aucune session Supabase Auth valide.

## Phase 6 — Mini-CMS produit

### Table `admin_settings` étendue

Nouveaux champs à ajouter via migration SQL :
- `product_description text` — description affichée sur la landing
- `product_status text` — `available` | `coming_soon` | `sold_out`
- `wero_beneficiary_name text` — nom du bénéficiaire affiché sur la confirmation
- `hero_image_url text` — remplace le placeholder du hero
- `product_image_main_url text` — remplace la grande photo produit
- `product_image_secondary_1_url text` — photo secondaire 1
- `product_image_secondary_2_url text` — photo secondaire 2

### Supabase Storage

Bucket `product-images` (accès public en lecture, écriture admin uniquement via `service_role`).
Upload via `supabaseServer.storage.from('product-images').upload(...)`.
Les URLs publiques sont lues depuis les colonnes `*_image_*_url` de `admin_settings`.

### Photos remplaçables (4 placeholders)

| Champ | Section | Emplacement |
|---|---|---|
| `hero_image_url` | Hero | Grande image côté droit du hero |
| `product_image_main_url` | Produit | Grande photo principale (grille gauche) |
| `product_image_secondary_1_url` | Produit | Photo secondaire 1 (grille) |
| `product_image_secondary_2_url` | Produit | Photo secondaire 2 (grille) |

### Règle invariante

La modification manuelle du stock depuis le CMS ne remplace pas la règle métier :
le stock diminue uniquement au passage en `paid` via `mark_order_paid()`.
L'ajustement manuel sert à corriger une erreur de saisie ou à réinitialiser avant le drop.
