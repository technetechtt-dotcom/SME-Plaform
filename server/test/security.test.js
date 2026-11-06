import test from 'node:test';
import assert from 'node:assert/strict';
import { token,digest,normaliseEmail,hashPassword,verifyPassword,cookieOptions } from '../src/security.js';
test('opaque tokens are distinct, and hashes are deterministic',()=>{
  const a=token(),b=token();
  assert.notEqual(a,b);
  assert.notEqual(a,digest(a));
  assert.equal(digest(a),digest(a));
});
test('normalizes login emails',()=>assert.equal(normaliseEmail('  Example@EXAMPLE.COM  '),'example@example.com'));
test('Argon2id password verification',async()=>{
  const hashed=await hashPassword('LongExamplePassword!93');
  assert.ok(hashed.startsWith('$argon2id$'));
  assert.equal(await verifyPassword(hashed,'LongExamplePassword!93'),true);
  assert.equal(await verifyPassword(hashed,'incorrect'),false);
});
test('session cookie is HTTP-only and same-site',()=>{
  assert.equal(cookieOptions().httpOnly,true);
  assert.equal(cookieOptions().sameSite,'lax');
});
