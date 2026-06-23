---
name: fnix-check
description: Vérifier l’état technique du projet FNIX après une modification.
allowed-tools: Read, Bash, Glob, Grep
---

# Skill — FNIX Check

Objectif : vérifier que le projet est sain après une modification.

Actions à effectuer :

1. lire `package.json` pour connaître les scripts disponibles ;
2. lancer les commandes adaptées :
   - lint si disponible ;
   - type-check si disponible ;
   - test si disponible ;
   - build si demandé ou si la tâche est importante ;
3. lire les erreurs éventuelles ;
4. proposer un diagnostic clair ;
5. ne corriger les erreurs qu’après validation.

Commandes probables :

```bash
npm run lint
npm run type-check
npm run test
npm run build
```
