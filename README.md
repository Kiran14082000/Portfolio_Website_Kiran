# Kiran Gobi Manivannan — Full-stack AI Portfolio

A dark, responsive Next.js portfolio with animated sections, a GitHub repository feed, profile FAQ recruiter assistant, contact-message storage, and a password-protected project admin dashboard.

## Stack
- Next.js 15 + React 19 + TypeScript
- Framer Motion + Lucide icons
- Supabase Postgres for projects and contact messages
- Free profile-grounded FAQ chatbot (no paid AI API key required)
- Vercel deployment

## 1. Run locally

Requirements: Node.js 20.9+ and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. The portfolio UI and GitHub repository feed work without Supabase. The recruiter assistant uses a free, rule-based FAQ based on the verified profile in `lib/profile.ts`; it does not call a paid AI API. Contact form and admin project storage require Supabase.

## 2. Configure Supabase

1. Create a project at https://supabase.com.
2. Open **SQL Editor** and run the complete `supabase/schema.sql` script.
3. In **Project Settings → API**, copy the Project URL and `service_role` key into `.env.local` as `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
4. Keep the service-role key private. It must only exist in server-side environment variables; never prefix it with `NEXT_PUBLIC_`.

The schema creates `projects` and `contact_messages`, then seeds the two projects listed in Kiran's supplied resume. Server routes use the service role and validate the admin session before allowing project changes.

## 3. Recruiter assistant (free)

The chatbot is a rule-based FAQ assistant that answers common questions about skills, work experience, education, projects, achievements, and contact details using `lib/profile.ts`. It does not require an OpenAI key or incur AI API charges. It is not a general-purpose generative AI model. Update the matching rules in `app/api/chat/route.ts` if you add new FAQ topics.

## 4. Configure the admin dashboard

Set both variables in `.env.local`:

```env
ADMIN_PASSWORD=use-a-unique-strong-password
ADMIN_SECRET=use-a-random-secret-at-least-32-characters-long
```

Visit `/admin`. The login route creates an HTTP-only, secure-in-production, SameSite=Strict session cookie that expires after 8 hours. Use a unique password and a high-entropy secret. Do not commit `.env.local`.

The dashboard can create, edit and delete project records in Supabase. Admin API routes check the signed session before touching the database.

## 5. GitHub feed

The public GitHub repository feed is fetched server-side from the GitHub REST API and cached for one hour. Default username is `Kiran14082000`; override with `GITHUB_USERNAME` if needed. No GitHub token is needed for a public profile, though unauthenticated API rate limits apply.

## 6. Deploy to Vercel

1. Push this project to a GitHub repository (the Next.js project root should contain `package.json`, `app/`, `lib/`, and `supabase/`).
2. Import that repository at https://vercel.com/new.
3. Add the four variables from `.env.example` in Vercel → Project → Settings → Environment Variables.
4. Deploy. Vercel automatically detects Next.js.
5. After deployment, test `/`, `/api/github`, `/api/chat`, `/api/contact`, and `/admin`.

GitHub Pages is not suitable for this full-stack app because it cannot run Next.js server routes, server-side secrets, database writes or the AI API. Keep GitHub as the code host and use Vercel for hosting.

## Project structure

```text
app/
  api/chat/              # Free profile FAQ assistant
  api/contact/           # Contact message endpoint
  api/github/            # Cached public GitHub repo feed
  api/projects/          # Public dynamic project listing
  api/admin/             # Signed admin session and project CRUD
  admin/                 # Password-protected project dashboard
  globals.css
  layout.tsx
  page.tsx
components/               # Reserved for reusable UI components
lib/profile.ts            # Resume-grounded profile and project seed content
lib/admin.ts              # Signed admin session helpers
lib/supabase.ts            # Server-side Supabase client
public/                    # Resume PDF
supabase/schema.sql        # Database schema and seed projects
```

## Content accuracy notes

The profile content and initial projects are based on the resume supplied in this conversation. The resume lists two projects: Resume Suitability Prediction System and AI Object Detection & Contextual Query System. Additional projects should be added only after confirming their details and public code links. GitHub repositories are loaded live from the public profile and are not assumed to be portfolio projects automatically.
