---
name: fnix-project-context
description: Loads the non-negotiable FNIX project context. Use for any task related to the FNIX website, order workflow, admin dashboard, UI integration or Supabase setup.
---

# FNIX Project Context

## Project identity
FNIX is a young streetwear brand launching its first drop: `T-shirt FNIX Drop 044`.

## Non-negotiable product facts
- Product: `T-shirt FNIX Drop 044`.
- Size: `M` only.
- Initial stock: `7` pieces.
- Payment: manual Wero.
- Delivery: La Poste.

## Scope boundaries
Do not turn this into a full e-commerce platform.
Do not add:
- product catalogue;
- customer accounts;
- complex cart;
- automatic payment integration;
- multiple sizes;
- multiple products.

## Order validation rule
An order is not confirmed when the form is submitted. It is created as `pending` and confirmed only after the owner manually verifies the Wero payment.

## Stock rule
The stock must not decrease when an order is created as `pending`. The stock decreases only when the admin marks the order as `paid`.

## Visual identity
- Black dominant.
- White text.
- FNIX blue as accent.
- Streetwear, simple, dark, young identity.
- `44` as a strong but controlled graphic code.
