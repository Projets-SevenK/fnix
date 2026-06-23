# Workflow de commande FNIX

1. Le client clique sur commander.
2. Il remplit ses informations de livraison.
3. Le site crée une commande `pending`.
4. Le site génère une référence `FNIX-044-XXX`.
5. Le client voit les instructions Wero.
6. Le client paie manuellement via Wero avec la référence en note.
7. Le propriétaire vérifie le paiement.
8. Le propriétaire marque la commande comme `paid`.
9. Le stock diminue seulement à ce moment-là.
10. Le propriétaire prépare le colis.
11. Il ajoute le numéro de suivi.
12. Il marque la commande comme `shipped`.

## Règle critique
Ne jamais décrémenter le stock au moment de la création de commande.
