---
name: order-workflow
description: Use when implementing, reviewing or testing FNIX order creation, Wero instructions, references, statuses and stock transitions.
---

# FNIX Order Workflow Skill

## Workflow
1. Customer fills the order form.
2. Site validates input data.
3. Site checks stock > 0.
4. Site creates an order with status `pending`.
5. Site generates reference `FNIX-044-XXX`.
6. Site displays Wero instructions.
7. Owner receives/sees the order in admin.
8. Customer pays manually with Wero and includes the reference in the payment note.
9. Owner verifies payment manually.
10. Owner marks order as `paid`.
11. Stock decreases only at this point.
12. Owner prepares shipment.
13. Owner adds La Poste tracking number.
14. Owner marks order as `shipped`.

## Statuses
Payment status:
- `pending`
- `paid`
- `cancelled`

Shipping status:
- `not_prepared`
- `prepared`
- `shipped`

## Critical rule
Do not decrement stock on order creation. Decrement only on transition to `paid`.

## UI wording
Never imply that Wero payment is automatically verified. Use wording like:
“Ta commande est enregistrée. Elle sera confirmée après réception et vérification du paiement Wero.”
