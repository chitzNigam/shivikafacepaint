# Setup Guide — Supabase Backend

Everything (images, portfolio, profile) is stored in **Supabase Postgres**.
No storage buckets, no auth complexity. Takes ~5 minutes.

---

## Step 1 — Create Supabase project

1. Go to https://supabase.com → Sign up free
2. Click **New project** → give it a name → Create project
3. Wait ~1 minute for it to be ready

---

## Step 2 — Run the SQL (creates your tables)

1. In Supabase dashboard → click **SQL Editor** in the left sidebar
2. Click **New query**
3. Open `supabase-setup.sql` from this zip → copy all contents → paste → click **Run**
4. You should see "Success. No rows returned"

---

## Step 3 — Get your API keys

1. In Supabase → click the **gear icon** (Project Settings) → **API**
2. Copy these two values:
   - **Project URL** → looks like `https://abcxyz.supabase.co`
   - **anon / public key** → long string starting with `eyJ...`

---

## Step 4 — Add keys to Netlify

1. Netlify dashboard → your site → **Site configuration** → **Environment variables**
2. Add these two variables:

   | Key | Value |
   |-----|-------|
   | `VITE_SUPABASE_URL` | `https://your-project-id.supabase.co` |
   | `VITE_SUPABASE_ANON_KEY` | `eyJ...your-anon-key...` |

3. Click **Save** → go to **Deploys** → click **Trigger deploy**

---

## Step 5 — Done!

- Portfolio: `yoursite.netlify.app`
- Admin: `yoursite.netlify.app/admin`  
- Password: `changeme123` (change in `src/data.js`)

---

## Local development

Copy `.env.example` to `.env` and fill in your keys:
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```
Then: `npm install && npm run dev`

---

## Already ran the SQL before?

If you set up the old version, run this to fix the policies:
```sql
DROP POLICY IF EXISTS "public read portfolio"  ON portfolio_items;
DROP POLICY IF EXISTS "public write portfolio" ON portfolio_items;
DROP POLICY IF EXISTS "public read profile"    ON site_profile;
DROP POLICY IF EXISTS "public write profile"   ON site_profile;

CREATE POLICY "public all portfolio" ON portfolio_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "public all profile"   ON site_profile    FOR ALL USING (true) WITH CHECK (true);
```
