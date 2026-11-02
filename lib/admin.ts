import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
const COOKIE = 'kiran_admin_session';
function secret() { const value = process.env.ADMIN_SECRET; if (!value || value.length < 32) throw new Error('ADMIN_SECRET must be at least 32 characters.'); return new TextEncoder().encode(value); }
export async function createAdminSession() { return new SignJWT({ role: 'admin' }).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('8h').sign(secret()); }
export async function isAdmin() { try { const jar = await cookies(); const token = jar.get(COOKIE)?.value; if (!token) return false; const { payload } = await jwtVerify(token, secret()); return payload.role === 'admin'; } catch { return false; } }
export const adminCookieName = COOKIE;
