import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
export async function POST(req:NextRequest) {
 try {
  const body=await req.json(); const name=String(body.name||'').trim(),email=String(body.email||'').trim(),message=String(body.message||'').trim();
  if(!name||!email||!message||name.length>100||email.length>200||message.length>3000||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({error:'Please provide a valid name, email and message.'},{status:400});
  const db=getSupabase(); if(!db) return NextResponse.json({error:'Contact storage is not configured yet. Please email Kiran directly at kiranxgobi@gmail.com.'},{status:503});
  const {error}=await db.from('contact_messages').insert({name,email,message}); if(error) throw error;
  return NextResponse.json({message:'Thanks — your message has been sent to Kiran.'});
 } catch { return NextResponse.json({error:'We could not save your message. Please email Kiran directly.'},{status:500}); }
}
