import { NextResponse } from 'next/server';
export const revalidate = 3600;
export async function GET() {
 const username = process.env.GITHUB_USERNAME || 'Kiran14082000';
 try {
  const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=8&type=owner`, { headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'Kiran-Portfolio' }, next: { revalidate: 3600 } });
  if (!response.ok) return NextResponse.json({ repos: [], source: 'github', message: 'GitHub data is temporarily unavailable.' }, { status: 200 });
  const data = await response.json();
  const repos = data.filter((r:any)=>!r.fork).slice(0,8).map((r:any)=>({id:r.id,name:r.name,description:r.description,html_url:r.html_url,language:r.language,stargazers_count:r.stargazers_count,updated_at:r.updated_at}));
  return NextResponse.json({ repos, username }, { headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' } });
 } catch { return NextResponse.json({ repos: [], username }); }
}
