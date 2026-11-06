import { randomBytes, createHash } from 'node:crypto';
import argon2 from 'argon2';
export const token = () => randomBytes(32).toString('base64url');
export const digest = value => createHash('sha256').update(value).digest('hex');
export const normaliseEmail = value => value.trim().toLowerCase();
export const hashPassword = password => argon2.hash(password, { type: argon2.argon2id, memoryCost: 65536, timeCost: 3, parallelism: 1 });
export const verifyPassword = (hash, password) => argon2.verify(hash, password);
export const sessionDays = Math.min(Math.max(Number(process.env.SESSION_DAYS || 7), 1), 30);
export const cookieName = process.env.SESSION_COOKIE || 'sme_session';
export function cookieOptions() {
  return { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: sessionDays * 86400 };
}
export function newTokenExpiry(minutes) { return new Date(Date.now() + minutes * 60000); }
