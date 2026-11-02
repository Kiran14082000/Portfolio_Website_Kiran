# Deployment checklist

- [ ] Create a Supabase project and run `supabase/schema.sql`.
- [ ] Set `NEXT_PUBLIC_SUPABASE_URL`.
- [ ] Set `SUPABASE_SERVICE_ROLE_KEY` (server only).
- [ ] No OpenAI API key is needed; the portfolio FAQ chatbot works without paid AI usage.
- [ ] Set a unique `ADMIN_PASSWORD`.
- [ ] Set a random `ADMIN_SECRET` of at least 32 characters.
- [ ] Confirm `GITHUB_USERNAME=Kiran14082000`.
- [ ] Push project root to GitHub.
- [ ] Import repository into Vercel and add environment variables.
- [ ] Deploy and test the site.
- [ ] Visit `/admin` and add/edit a test project.
- [ ] Submit a test contact message and confirm it appears in Supabase.
- [ ] Ask the portfolio FAQ assistant a question and confirm the response is grounded in the profile.
- [ ] Remove public phone number if you do not want it indexed by search engines.
