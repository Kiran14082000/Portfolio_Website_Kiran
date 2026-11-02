import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { profile } from '@/lib/profile';
export const revalidate = 60;
export async function GET(){
 const db=getSupabase();
 if(!db) return NextResponse.json({projects:profile.projects,source:'profile-fallback'});
 const {data,error}=await db.from('projects').select('id,title,slug,category,description,details,tags,metric,github_url,featured,created_at').order('featured',{ascending:false}).order('created_at',{ascending:false});
 if(error) return NextResponse.json({projects:profile.projects,source:'profile-fallback'});
 const projects=(data||[]).map((p:any)=>({id:p.slug||p.id,title:p.title,category:p.category,date:new Date(p.created_at).toLocaleDateString('en-CA',{month:'short',year:'numeric'}),description:p.description,details:p.details,tags:p.tags||[],metric:p.metric||'',github:p.github_url||''}));
 return NextResponse.json({projects,source:'supabase'},{headers:{'Cache-Control':'s-maxage=60, stale-while-revalidate=300'}});
}
