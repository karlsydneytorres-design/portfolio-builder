# Portfolio Site Builder — Starter

A Next.js + TypeScript + Supabase starter for the portfolio builder project.
This scaffold covers steps 1–3 of the build order (data model, static
renderer, editor shell). Persistence, auth, drag-and-drop, and publishing
are stubbed with TODOs for you to fill in.

## What's here

- `lib/types.ts` — the Block/Site data model
- `lib/supabase.ts` — Supabase client
- `components/BlockRenderer.tsx` — renders a block; shared by editor and
  published page so you don't duplicate rendering logic
- `app/page.tsx` — dashboard placeholder
- `app/editor/page.tsx` — editor shell with a hardcoded sample site
  (no drag-and-drop wired up yet — that's your next step)
- `app/[username]/page.tsx` — public published page, server-rendered from
  Supabase by subdomain

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a Supabase project at https://supabase.com, then run this SQL
   in the Supabase SQL editor to create the `sites` table:

   ```sql
   create table sites (
     id uuid primary key default gen_random_uuid(),
     "userId" uuid references auth.users not null,
     subdomain text unique not null,
     theme jsonb not null default '{"colorScheme": "light", "font": "sans-serif"}',
     blocks jsonb not null default '[]',
     "isPublished" boolean not null default false,
     seo jsonb,
     created_at timestamp with time zone default now()
   );

   -- Row-level security: each user can only read/write their own sites,
   -- but anyone can read a published site (needed for the public page).
   alter table sites enable row level security;

   create policy "Users manage their own sites"
     on sites for all
     using (auth.uid() = "userId");

   create policy "Anyone can view published sites"
     on sites for select
     using ("isPublished" = true);
   ```

3. Copy `.env.local.example` to `.env.local` and fill in your Supabase
   project URL and anon key (found in Project Settings → API).

4. Run the dev server:
   ```
   npm run dev
   ```

5. Visit:
   - `http://localhost:3000` — dashboard placeholder
   - `http://localhost:3000/editor` — editor shell with sample blocks
   - `http://localhost:3000/some-username` — published page (will 404
     until you insert a published row in `sites`)

## Next steps (per the build order)

1. ~~Data model~~ ✅ done (`lib/types.ts`)
2. ~~Static renderer~~ ✅ done (`BlockRenderer.tsx`)
3. **Editor shell** — currently shows a hardcoded sample. Next: wrap
   blocks in `@dnd-kit`'s `<DndContext>`, track positions in a Zustand
   store, and let users drag/resize.
4. **Persistence** — save/load the Zustand store to/from the `sites`
   table in Supabase (autosave on change, debounced).
5. **Auth + multi-tenant routing** — add Supabase Auth, gate `/editor`
   behind login, scope `sites` queries to the logged-in user.
6. **Publish flow** — a button that flips `isPublished` to `true` and
   shows the shareable `/[username]` URL.
7. **Themes + polish + stretch features** — color schemes, fonts, image
   upload via Supabase Storage, SEO fields, analytics, export.
