---
name: admin-dashboard
description: Use when designing or implementing the FNIX admin dashboard for order tracking, payment validation, stock monitoring and shipment tracking.
---

# FNIX Admin Dashboard Skill

## Dashboard purpose
The admin dashboard helps the owner manage a small manual drop, not a full e-commerce operation.

## Required screens
- Login page.
- Admin home summary.
- Orders list.
- Order detail page.
- Simple stock display.

## Orders list columns
- Reference.
- Date.
- Customer name.
- Email.
- Phone.
- Quantity.
- Expected amount.
- Payment status.
- Shipping status.
- Tracking number.

## Order detail actions
- Mark as paid.
- Mark as cancelled.
- Mark as prepared.
- Add tracking number.
- Mark as shipped.

## Stock behavior
- Initial stock: 7.
- Size: M only.
- Stock is decreased only when an order becomes `paid`.
- Avoid double decrement if the order is already `paid`.

## Scope limits
Do not build:
- advanced analytics;
- product catalogue manager;
- role management;
- customer account management;
- automatic Wero verification.
