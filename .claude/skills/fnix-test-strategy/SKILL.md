---
name: fnix-test-strategy
description: Use when creating or reviewing tests for FNIX business logic, especially references, orders, stock and validation.
---

# FNIX Test Strategy Skill

## Testing priorities
Focus tests on business risk, not static UI.

## Must-test cases
1. Generate an order reference like `FNIX-044-001`.
2. Create an order in `pending` status.
3. Do not decrease stock when order is pending.
4. Decrease stock only when order becomes `paid`.
5. Do not double-decrement stock if an already paid order is marked paid again.
6. Prevent order creation when stock is 0.
7. Validate required customer fields.
8. Reject invalid email/phone formats if validation rules are defined.

## Preferred style
- Use Vitest.
- Keep tests simple and readable.
- Test pure functions in `lib/` first.
- If a function cannot be tested easily, suggest extracting business logic from UI code.
