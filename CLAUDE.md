# CLAUDE.md — FNIX

> Site vitrine-commerce pour FNIX, jeune marque streetwear lançant son premier drop limité.
> Lis ce fichier avant toute action dans ce dépôt.

## 1. Projet

FNIX est une jeune marque streetwear qui lance son premier drop : un t-shirt FNIX Drop 044.

Le site doit présenter l’univers de la marque, le t-shirt, l’histoire du créateur, les valeurs FNIX et permettre au client de passer commande via un formulaire. Le paiement se fait manuellement via Wero. Le site ne valide pas automatiquement les paiements.

Objectif : livrer rapidement une V1 propre, responsive, crédible et maintenable, valorisable dans un portfolio développeuse web.

## 2. Périmètre fonctionnel

### Partie publique
- Landing page FNIX.
- Présentation du premier drop.
- Affichage clair du produit : T-shirt FNIX Drop 044.
- Taille disponible : M uniquement.
- Stock initial : 7 pièces.
- Formulaire de commande.
- Génération d’une référence de commande du type `FNIX-044-001`.
- Page de confirmation avec instructions Wero.
- Mentions légales, CGV et politique de confidentialité.

### Partie admin
- Connexion admin.
- Liste des commandes.
- Détail d’une commande.
- Changement de statut : `pending`, `paid`, `shipped`, `cancelled`.
- Décrémentation du stock uniquement quand une commande passe à `paid`.
- Ajout d’un numéro de suivi La Poste.
- Vue simple du stock restant.

## 3. Règles métier non négociables

- Le projet n’est pas un gros e-commerce.
- Ne pas créer de catalogue multi-produits.
- Ne pas créer de compte client.
- Ne pas créer de panier complexe.
- Ne pas intégrer Stripe, PayPal ou un paiement automatique sauf demande explicite.
- Le produit est unique : `T-shirt FNIX Drop 044`.
- La taille disponible est `M` uniquement.
- Le stock initial est de `7` pièces.
- Le paiement est manuel via Wero.
- Une commande créée via formulaire a le statut `pending`.
- Une commande n’est validée qu’après réception et vérification manuelle du paiement Wero.
- Le stock ne diminue jamais au moment de la création de commande.
- Le stock diminue uniquement quand l’admin marque la commande comme `paid`.
- Si le stock atteint 0, le bouton de commande doit être désactivé ou remplacé par “Épuisé”.
- Le client doit voir une référence de commande, par exemple `FNIX-044-001`.
- La référence doit être indiquée dans la note du paiement Wero.

## 4. Stack technique

- Framework : Next.js avec App Router.
- Langage : TypeScript.
- UI : React + Tailwind CSS.
- Base de données : Supabase PostgreSQL.
- Authentification admin : Supabase Auth.
- Validation formulaire : Zod + React Hook Form.
- Tests : Vitest.
- Déploiement : Vercel.
- Versioning : GitHub.

Ne pas ajouter de dépendance lourde sans justification. Privilégier la simplicité.

## 5. Architecture de dossier cible

Claude Code peut créer les fichiers applicatifs manquants à partir de cette architecture.

```txt
app/
├── page.tsx
├── layout.tsx
├── globals.css
├── commande/
│   ├── page.tsx
│   └── confirmation/
│       └── page.tsx
├── admin/
│   ├── login/
│   │   └── page.tsx
│   ├── page.tsx
│   └── commandes/
│       ├── page.tsx
│       └── [id]/
│           └── page.tsx
├── mentions-legales/
│   └── page.tsx
├── cgv/
│   └── page.tsx
└── confidentialite/
    └── page.tsx

components/
├── forms/
├── layout/
├── sections/
└── ui/

lib/
├── orders.ts
├── stock.ts
├── references.ts
├── format.ts
├── validations/
└── supabase/

types/
└── database.ts

public/
├── logo-fnix.png
└── images/

prototype/
├── README.md
├── fnix-maquette.html
└── assets/

taches/
├── a-faire.md
└── lecons.md

docs/
├── architecture.md
├── workflow-commande.md
└── recette.md
```

## 6. Prototype et intégration pixel-perfect

Le dossier `prototype/` contient la maquette validée par le client.

Règles :
- Lire `prototype/README.md` avant toute intégration UI.
- Lire le fichier HTML de maquette avant de coder la landing page.
- Reproduire l’ambiance validée : noir dominant, blanc, bleu FNIX, esprit streetwear, nombre 44.
- Adapter la maquette à la réalité métier : taille M uniquement, stock 7 pièces, paiement Wero manuel.
- Ne pas inventer de photos finales si elles ne sont pas fournies. Utiliser des placeholders propres.

## 7. Dossier tâches et leçons

Avant toute tâche importante :
- Lire `taches/a-faire.md`.
- Lire `taches/lecons.md`.
- Dire quelle tâche va être traitée.
- Dire quelle leçon importante doit être respectée.

Après une tâche importante :
- Mettre à jour `taches/a-faire.md` si demandé.
- Ajouter dans `taches/lecons.md` toute décision ou erreur importante à retenir.

## 8. Données personnelles et sécurité

Le site collecte uniquement les données nécessaires à la commande :
- prénom ;
- nom ;
- email ;
- téléphone ;
- adresse de livraison ;
- quantité ;
- note optionnelle.

Règles :
- Ne jamais stocker de données bancaires.
- Ne jamais exposer de clé privée Supabase côté client.
- Protéger toutes les routes admin.
- Valider toutes les entrées utilisateur avec Zod.
- Ne jamais logger publiquement des données personnelles.
- Wero reste externe et manuel.
- Les fichiers `.env` réels ne doivent pas être lus ni modifiés sauf demande explicite.

## 9. Modèle de données cible

### Table `orders`

Champs recommandés :
- `id`
- `reference`
- `customer_first_name`
- `customer_last_name`
- `customer_email`
- `customer_phone`
- `shipping_address`
- `product_name`
- `size`
- `quantity`
- `amount_expected`
- `payment_status`
- `shipping_status`
- `tracking_number`
- `customer_note`
- `created_at`
- `updated_at`

Statuts :
- `payment_status`: `pending`, `paid`, `cancelled`
- `shipping_status`: `not_prepared`, `prepared`, `shipped`

### Table `product_stock`

Champs recommandés :
- `id`
- `product_name`
- `size`
- `initial_stock`
- `remaining_stock`
- `is_available`
- `updated_at`

Valeurs de départ :
- `product_name`: `T-shirt FNIX Drop 044`
- `size`: `M`
- `initial_stock`: `7`
- `remaining_stock`: `7`
- `is_available`: `true`

### Table `admin_settings`

Champs recommandés :
- `id`
- `wero_phone`
- `wero_qr_code_url`
- `product_price`
- `shipping_price`
- `instagram_url`
- `updated_at`

## 10. Workflow de commande

1. Le client remplit le formulaire.
2. Le site valide les données.
3. Le site vérifie que le stock restant est supérieur à 0.
4. Le site crée une commande avec le statut `pending`.
5. Le site génère une référence `FNIX-044-XXX`.
6. Le client voit les instructions Wero.
7. Le propriétaire reçoit la commande dans le dashboard.
8. Le propriétaire reçoit la notification Wero.
9. Il vérifie manuellement le montant, le nom, la référence et l’adresse.
10. Il marque la commande comme `paid`.
11. Le stock diminue seulement à ce moment-là.
12. Il prépare le colis.
13. Il ajoute le numéro de suivi.
14. Il marque la commande comme `shipped`.

## 11. Design system

Identité :
- Noir dominant.
- Blanc pour la lisibilité.
- Bleu FNIX comme accent.
- Univers streetwear, simple, sombre, jeune.
- Nombre 44 visible mais maîtrisé.

Règles UI :
- Mobile-first.
- CTA visibles.
- Formulaire simple.
- États d’erreur compréhensibles.
- Aucun texte ne doit faire croire que le paiement est automatique.

## 12. Commandes essentielles

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
npm run type-check
```

Avant de considérer une tâche comme terminée :
- le build doit passer ;
- le lint doit passer ;
- les erreurs TypeScript doivent être corrigées ;
- les tests prioritaires doivent passer si la tâche touche la logique métier.

## 13. Standards de code

- TypeScript strict.
- Pas de `any` sauf justification.
- Composants React courts et lisibles.
- Noms de fichiers en kebab-case.
- Composants en PascalCase.
- Fonctions et variables en camelCase.
- Pas de logique métier complexe directement dans les composants UI.
- Centraliser la logique commande dans `lib/orders.ts`.
- Centraliser la logique stock dans `lib/stock.ts`.
- Centraliser la génération de référence dans `lib/references.ts`.
- Préférer une solution simple à une abstraction prématurée.

## 14. Tests prioritaires

Tester en priorité :
- génération de référence de commande ;
- validation du formulaire ;
- impossibilité de commander si le stock est à 0 ;
- création de commande en statut `pending` ;
- absence de décrémentation du stock à la création d’une commande ;
- décrémentation du stock uniquement au passage en `paid` ;
- non double-décrémentation si une commande déjà `paid` est marquée `paid` à nouveau.

## 15. Règles pour Claude

- Lire ce fichier avant toute action.
- Ne pas transformer le projet en gros e-commerce.
- Ne pas ajouter plusieurs produits.
- Ne pas ajouter de panier complexe.
- Ne pas ajouter de comptes clients.
- Ne pas intégrer de paiement automatique.
- Avant toute modification touchant plus de deux fichiers, proposer un plan.
- Ne pas commit/push sans demande explicite.
- Ne pas modifier `.env.local` ni lire les secrets.
- Après modification, indiquer les fichiers changés et les tests à lancer.
- En cas de doute métier, poser une seule question ciblée.
