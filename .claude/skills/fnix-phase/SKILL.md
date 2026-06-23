---
name: fnix-phase
description: Préparer ou exécuter une phase de développement FNIX de manière contrôlée.
allowed-tools: Read, Glob, Grep, Edit, MultiEdit, Write, Bash
---

# Skill — FNIX Phase

L’utilisateur peut fournir une phase, par exemple :

- phase 0 : socle technique
- phase 1 : landing page pixel-perfect
- phase 2 : tunnel de commande front
- phase 3 : Supabase
- phase 4 : dashboard admin
- phase 5 : qualité et livraison

Avant toute modification :

1. lis `CLAUDE.md` ;
2. lis `taches/a-faire.md` ;
3. lis `taches/lecons.md` ;
4. lis les docs pertinentes dans `docs/` ;
5. si la phase concerne le design, lis `prototype/README.md` et inspecte `prototype/fnix-maquette.html`.

Ensuite :

1. résume la phase demandée ;
2. propose les fichiers à créer ou modifier ;
3. indique les tests ou vérifications à lancer ;
4. attends validation si plus de deux fichiers sont concernés.

Pendant l’exécution :

- respecte strictement le périmètre FNIX ;
- ne crée pas de panier complexe ;
- ne crée pas de compte client ;
- ne crée pas de catalogue ;
- ne modifie pas la logique Wero manuel ;
- ne décrémente jamais le stock avant le passage en `paid`.

À la fin :

1. résume les fichiers modifiés ;
2. indique les commandes à lancer ;
3. propose une mise à jour de `taches/a-faire.md` ;
4. propose une leçon à ajouter dans `taches/lecons.md` si nécessaire.

## Section obligatoire — Agent conseillé

Toujours inclure ce bloc au début de ta réponse, avant toute autre analyse :

---

**Agent conseillé :** [nom de l'agent selon la phase]

Référence par phase :
- Phase 0 (socle technique) → aucun agent spécifique, implémentation directe
- Phase 1 (landing page) → `ux-ui-integrator`
- Phase 2 (tunnel de commande front) → `full-stack-developer`
- Phase 3 (Supabase) → `architect-reviewer` d'abord pour valider le schéma, puis `full-stack-developer` pour l'implémentation
- Phase 4 (dashboard admin) → `full-stack-developer`
- Phase 5 (qualité et livraison) → `test-generator`, puis `code-reviewer`, puis `security-reviewer`

**Pourquoi cet agent :** [justification courte liée au contenu de la phase]

**Faut-il appeler l'agent maintenant ou seulement après validation ?** [Maintenant / Après validation du plan par l'utilisateur]

**Exemple de commande :**
```
@[nom-de-l-agent] [instruction courte décrivant la phase ou la tâche]
```

---
