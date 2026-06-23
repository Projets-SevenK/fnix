---
name: supabase-security
description: Use when working on Supabase, environment variables, admin auth, server actions, RLS assumptions or handling personal data in the FNIX project.
---

# Supabase Security Skill — FNIX

## Key rules
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to client components.
- Use `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` only for public-safe client access.
- Protect admin routes.
- Validate all form inputs with Zod.
- Do not store bank details.
- Do not log personal data.
- Do not read real `.env` files unless the user explicitly asks.

## Personal data collected
Only collect what is necessary:
- first name;
- last name;
- email;
- phone;
- shipping address;
- quantity;
- optional note.

## Admin security checklist
- Admin page cannot be accessed unauthenticated.
- Order details are admin-only.
- Status transitions happen server-side.
- Stock mutation happens server-side.
- Service role key is server-only.

## Release reminder
Before production deployment, run a security review and verify Supabase policies manually.
