# Portfolio Builder

A starter project for building and publishing small portfolio sites using Next.js, TypeScript, and Supabase.

Key ideas: editable block-based pages, a shared renderer for editor and published pages, and a simple multi-tenant `sites` model in Supabase.

**Tech stack** 
- Next.js (App Router)
- TypeScript
- Supabase (Auth, Postgres, Storage)
- Tailwind CSS

**Highlights**
- Shared `BlockRenderer` used for both editor preview and public pages
- Editor shell at `/editor` for composing block-based pages
- Server-rendered public pages at `/[username]`

## Quick start

Prerequisites: Node 18+ and an account at https://supabase.com

1. Install dependencies

```bash
npm install
```

2. Create a Supabase project and copy `.env.local.example` to `.env.local`.
Fill in your Supabase keys (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, etc.).

3. Create the `sites` table in your Supabase project's SQL editor (example schema):

```sql
create table sites (
   id uuid primary key default gen_random_uuid(),
   "userId" uuid references auth.users not null,
   subdomain text unique not null,
   theme jsonb not null default '{"colorScheme":"light","font":"sans-serif"}',
   blocks jsonb not null default '[]',
   "isPublished" boolean not null default false,
   seo jsonb,
   created_at timestamp with time zone default now()
);

alter table sites enable row level security;

create policy "Users manage their own sites"
   on sites for all
   using (auth.uid() = "userId");

create policy "Anyone can view published sites"
   on sites for select
   using ("isPublished" = true);
```

4. Run the dev server

```bash
npm run dev
```

Open:
- `http://localhost:3000` — dashboard placeholder
- `http://localhost:3000/editor` — editor shell
- `http://localhost:3000/<username>` — published page

## Project layout
- `app/` — Next.js App Router pages (`/editor`, `/[username]`, etc.)
- `components/` — reusable UI and editor components (`BlockRenderer`, draggable blocks)
- `lib/` — app utilities: `supabase.ts`, API helpers, types

## Development notes
- The editor is a shell that currently renders a hardcoded sample site. To continue development consider:
   - Integrating `@dnd-kit` for drag-and-drop
   - Persisting editor state to Supabase (debounced autosave)
   - Adding Supabase Auth and gating `/editor`
   - Implementing publishing flow that toggles `isPublished`

## Contributing
Open an issue or submit a PR. If you add features, include README updates and tests where appropriate.

## License
MIT — see `LICENSE` if present.

---

If you'd like, I can (pick one):
- add badges and CI integration
- generate a short demo GIF and usage screenshots
- expand the README with a detailed API section
Tell me which and I'll update the README accordingly.
