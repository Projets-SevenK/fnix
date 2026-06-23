---
name: fnix-start
description: Démarrer une session Claude Code pour le projet FNIX en relisant le contexte critique.
allowed-tools: Read, Glob, Grep
---

# Skill — FNIX Start

Lis obligatoirement :

- `CLAUDE.md`
- `taches/a-faire.md`
- `taches/lecons.md`
- `docs/architecture.md`
- `docs/workflow-commande.md`
- `prototype/README.md`

Puis réponds avec :

1. un résumé très court du périmètre FNIX ;
2. les règles critiques à respecter ;
3. la phase actuelle probable ;
4. les risques à surveiller ;
5. la prochaine action recommandée.

Ne modifie aucun fichier.

Rappels critiques :

- FNIX n’est pas un gros e-commerce.
- Produit unique : T-shirt FNIX Drop 044.
- Taille M uniquement.
- Stock initial : 7 pièces.
- Paiement Wero manuel.
- Le stock ne diminue jamais à la création d’une commande.
- Le stock diminue uniquement quand une commande passe au statut `paid`.
- Le prototype dans `prototype/fnix-maquette.html` sert de référence pixel-perfect.
