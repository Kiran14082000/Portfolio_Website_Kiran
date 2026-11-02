import { NextResponse } from 'next/server';
import { adminCookieName } from '@/lib/admin';
export async function POST(){const res=NextResponse.json({ok:true});res.cookies.set(adminCookieName,'',{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/',maxAge:0});return res;}
