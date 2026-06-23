# FNIX — Drop 044

Site vitrine-commerce pour le premier drop limité de la marque streetwear FNIX.  
Un seul produit : **T-shirt FNIX Drop 044**, taille M, 7 pièces, paiement manuel via Wero.

## Stack

- **Framework** : Next.js 16 (App Router)
- **Langage** : TypeScript strict
- **UI** : React + Tailwind CSS v4
- **Base de données** : Supabase PostgreSQL
- **Auth admin** : Supabase Auth
- **Validation** : Zod + React Hook Form
- **Tests** : Vitest
- **Déploiement** : Vercel

## Fonctionnalités

### Partie publique
- Landing page : hero, présentation produit, histoire, valeurs, FAQ
- Formulaire de commande avec validation Zod
- Génération de référence commande (`FNIX-044-XXX`)
- Page de confirmation avec instructions de paiement Wero
- Affichage du stock en temps réel (désactivé si épuisé)
- Pages légales : mentions légales, CGV, politique de confidentialité

### Dashboard admin (`/admin`)
- Connexion sécurisée (Supabase Auth)
- Liste et détail des commandes
- Changement de statut : `pending` → `paid` → `shipped` / `cancelled`
- Décrémentation du stock uniquement au passage en `paid`
- Ajout du numéro de suivi La Poste
- Messages client copier/coller (Wero, confirmation, expédition, annulation)
- Mini-CMS produit (`/admin/produit`) :
  - Prix, description, message au dos du t-shirt
  - Statut du drop : disponible / bientôt / épuisé
  - Upload des 4 photos produit (Supabase Storage)
  - Paramètres Wero (numéro, bénéficiaire, QR code)
  - Ajustement du stock total et du stock restant

## Démarrage local

### Prérequis

- Node.js 18+
- Un projet Supabase configuré (tables `orders`, `product_stock`, `admin_settings`)

### Installation

```bash
npm install
```

### Variables d'environnement

Crée un fichier `.env.local` à la racine :

```env
NEXT_PUBLIC_SUPABASE_URL=https://ton-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ta_cle_anon
SUPABASE_SERVICE_ROLE_KEY=ta_cle_service_role
```

> La `SUPABASE_SERVICE_ROLE_KEY` ne doit jamais être exposée côté client.

### Lancer le serveur de développement

```bash
npm run dev
```

Le site est accessible sur [http://localhost:3000](http://localhost:3000).

## Commandes disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run lint         # Vérification ESLint
npm run type-check   # Vérification TypeScript
npm run test         # Tests Vitest
```

## Base de données

Le schéma complet est dans `docs/migration.sql`. À exécuter dans l'éditeur SQL Supabase.

Tables principales :
- `orders` — commandes clients
- `product_stock` — stock du produit
- `admin_settings` — paramètres CMS (prix, photos, Wero, etc.)

Fonctions PostgreSQL clés :
- `mark_order_paid(order_id)` — passage en `paid` + décrémentation atomique du stock
- `get_next_order_seq()` — génération de la séquence de référence commande
- `adjust_stock(p_remaining)` — correction manuelle du stock restant

## Architecture

```
app/                  # Pages et routes (Next.js App Router)
├── page.tsx          # Landing page
├── commande/         # Formulaire de commande + confirmation
├── admin/            # Dashboard admin (protégé)
│   ├── login/
│   ├── commandes/
│   └── produit/
└── mentions-legales/ # Pages légales
    cgv/
    confidentialite/

components/
├── forms/            # Formulaires
├── layout/           # Header, Footer
├── sections/         # Sections de la landing page
├── ui/               # Composants UI (Button, etc.)
└── admin/            # Composants du dashboard

lib/
├── orders.ts         # Logique commandes
├── stock.ts          # Logique stock
├── references.ts     # Génération des références
├── settings.ts       # Lecture admin_settings
└── supabase/         # Clients Supabase (client, server, middleware, auth)

__tests__/            # Tests Vitest (42 tests)
docs/                 # Architecture, workflow commande, migration SQL
prototype/            # Maquette HTML validée par le client
```

## Règles métier

- Le stock ne diminue **jamais** à la création d'une commande
- Le stock diminue **uniquement** au passage en `paid` (via RPC PostgreSQL)
- Le paiement est **manuel** via Wero — aucun paiement automatique
- Toutes les mutations admin passent par des Server Actions protégées
- Un seul produit, une seule taille (M)

## Développement

Lire `CLAUDE.md` avant toute modification.  
Les tâches sont suivies dans `taches/a-faire.md`.  
Les décisions importantes sont dans `taches/lecons.md`.
