-- Run this script in Supabase SQL Editor before deploying.
create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null default 'Data Science',
  description text not null default '',
  details text not null default '',
  tags text[] not null default '{}',
  metric text not null default '',
  github_url text,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;
alter table public.contact_messages enable row level security;
-- Public visitors do not access tables directly. Server routes use the service role key.
-- Never expose SUPABASE_SERVICE_ROLE_KEY in NEXT_PUBLIC_* variables.

insert into public.projects (title,slug,category,description,details,tags,metric,featured)
values
('Resume Suitability Prediction System','resume-suitability','NLP & Machine Learning','An NLP resume–job fit classifier that evaluates alignment between resumes and job descriptions.','Built and evaluated a text-classification pipeline using TF-IDF with Random Forest and SVM comparisons. The model reached 85% accuracy on a test set of 1,000+ resume–job-description pairs. Feature tuning and text preprocessing improved the F1-score by 9%.',array['Python','scikit-learn','TF-IDF','Random Forest','SVM'],'85% accuracy',true),
('AI Object Detection & Contextual Query System','object-detection-context','Computer Vision & Generative AI','An object-detection and LLM reasoning pipeline connecting a user interface to an inference engine.','Designed the system architecture for image capture, object selection, contextual reasoning, and model inference. Structured API communication between the user interface and the inference engine.',array['Computer Vision','API Integration','LLM','System Design'],'End-to-end AI pipeline',true)
on conflict (slug) do nothing;
