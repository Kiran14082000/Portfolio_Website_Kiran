import { NextRequest,NextResponse } from 'next/server';
import { createAdminSession,adminCookieName } from '@/lib/admin';
export async function POST(req:NextRequest){
 const {password}=await req.json().catch(()=>({password:''}));
 if(!process.env.ADMIN_PASSWORD||password!==process.env.ADMIN_PASSWORD) return NextResponse.json({error:'Incorrect password.'},{status:401});
 try{const token=await createAdminSession();const res=NextResponse.json({ok:true});res.cookies.set(adminCookieName,token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/',maxAge:60*60*8});return res;}catch{return NextResponse.json({error:'Admin authentication is not configured.'},{status:500});}
}
