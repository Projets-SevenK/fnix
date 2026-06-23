# FNIX — Leçons et décisions à retenir

- Le projet n’est pas un gros e-commerce.
- Ne pas ajouter de catalogue multi-produits.
- Ne pas ajouter de panier complexe.
- Ne pas ajouter de comptes clients.
- Le produit est le T-shirt FNIX Drop 044.
- La taille est M uniquement.
- Le stock initial est de 7 pièces.
- Le paiement Wero est manuel.
- Une commande créée est `pending`.
- Une commande n’est validée qu’après vérification manuelle du paiement Wero.
- Le stock ne diminue pas quand le formulaire est envoyé.
- Le stock diminue uniquement quand l’admin marque une commande comme `paid`.
- Le dossier `prototype/` est la référence visuelle validée par le client.
- Le bleu doit rester une couleur d’accent, pas dominer la page.
- Le 44 doit être visible, mais ne pas voler la place du logo FNIX.
- Pas d’emails transactionnels automatiques en V1 : le client n’a pas encore de nom de domaine. Resend et Brevo nécessitent un domaine vérifié. À la place : page de confirmation claire, référence visible, instructions Wero complètes, et messages copier/coller dans le dashboard admin pour contact manuel (WhatsApp, SMS, Instagram, email).
- Les pages qui appellent `getSettings()` doivent avoir `export const dynamic = ‘force-dynamic’` pour que les changements du dashboard soient reflétés immédiatement sans redéploiement.
