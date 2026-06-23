---
name: fnix-next
description: Identifier la prochaine tâche prioritaire du projet FNIX à partir du backlog et des leçons.
allowed-tools: Read, Glob, Grep
---

# Skill — FNIX Next

Lis :

- `CLAUDE.md`
- `taches/a-faire.md`
- `taches/lecons.md`
- `docs/architecture.md`
- `docs/workflow-commande.md`

Objectif : déterminer la prochaine tâche utile, sans coder immédiatement.

Réponds avec :

1. la tâche prioritaire recommandée ;
2. pourquoi c’est la bonne prochaine tâche ;
3. les fichiers probablement concernés ;
4. les risques ;
5. une demande de validation avant modification.

Ne modifie aucun fichier tant que l’utilisateur n’a pas validé.

Règles :

- Ne propose pas de gros lot de développement.
- Propose une tâche courte, vérifiable et commitable.
- Si la tâche touche plus de deux fichiers, propose un plan.
- Si une leçon de `taches/lecons.md` s’applique, cite-la dans la réponse.

## Section obligatoire — Agent conseillé

Toujours inclure ce bloc à la fin de ta réponse, après les points ci-dessus :

---

**Agent conseillé :** [nom de l’agent]

Choisir parmi :
- `ux-ui-integrator` — intégration pixel-perfect depuis la maquette (Phase 1)
- `full-stack-developer` — implémentation Next.js + Supabase end-to-end (Phase 2, 3, 4)
- `architect-reviewer` — décisions structurelles avant de coder (schéma Supabase, Server Actions, architecture admin)
- `test-generator` — génération de tests Vitest sur la logique métier (Phase 5)
- `code-reviewer` — relecture après une implémentation significative
- `security-reviewer` — avant connexion Supabase/admin ou déploiement
- `Plan` — planification d’une phase complexe avant tout code

**Pourquoi cet agent :** [justification courte liée à la tâche identifiée]

**Faut-il appeler l’agent maintenant ou seulement après validation ?** [Maintenant / Après validation de la tâche par l’utilisateur]

**Exemple de commande :**
```
@[nom-de-l-agent] [instruction courte décrivant la tâche]
```

---
