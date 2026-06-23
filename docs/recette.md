# Recette FNIX

## Tests fonctionnels publics
- [ ] La landing page est lisible sur mobile.
- [ ] Le produit affiche taille M uniquement.
- [ ] Le stock de départ est 7.
- [ ] Le formulaire ne permet pas d’envoyer une commande invalide.
- [ ] La page de confirmation affiche une référence.
- [ ] Les instructions Wero sont claires.
- [ ] Le texte ne promet pas de validation automatique du paiement.

## Tests admin
- [ ] L’admin doit se connecter.
- [ ] Les commandes apparaissent dans le dashboard.
- [ ] Une commande créée est `pending`.
- [ ] Le stock ne diminue pas en `pending`.
- [ ] Le stock diminue au passage en `paid`.
- [ ] Le stock ne diminue pas deux fois pour la même commande.
- [ ] L’admin peut ajouter un numéro de suivi.
- [ ] L’admin peut marquer la commande comme `shipped`.

## Tests techniques
- [ ] `npm run lint` passe.
- [ ] `npm run type-check` passe.
- [ ] `npm run test` passe.
- [ ] `npm run build` passe.
