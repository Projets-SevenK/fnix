# Architecture FNIX

## Type de projet
Landing page vitrine-commerce avec tunnel de commande manuel et dashboard admin simple.

## Stack
- Next.js App Router.
- TypeScript.
- Tailwind CSS.
- Supabase PostgreSQL.
- Supabase Auth pour l’admin.
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

## Règle d’architecture
La logique métier ne doit pas être dispersée dans les composants React.

- Commandes : `lib/orders.ts`.
- Stock : `lib/stock.ts`.
- Références : `lib/references.ts`.
- Validations : `lib/validations/`.
