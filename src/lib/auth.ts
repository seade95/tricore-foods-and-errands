import crypto from "crypto";
import { cookies } from "next/headers";
import { getAuth } from "./store";

const COOKIE_NAME = "tricore_admin";
const MAX_AGE = 60 * 60 * 24;

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, "utf-8");
  const bb = Buffer.from(b, "utf-8");
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

export function createToken(secret: string): string {
  const payload = JSON.stringify({ exp: Date.now() + MAX_AGE * 1000 });
  const encoded = Buffer.from(payload).toString("base64url");
  const sig = crypto.createHmac("sha256", secret).update(encoded).digest("base64url");
  return `${encoded}.${sig}`;
}

export function verifyToken(token: string, secret: string): boolean {
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [encoded, sig] = parts;
  const expected = crypto.createHmac("sha256", secret).update(encoded).digest("base64url");
  if (!safeEqual(sig, expected)) return false;
  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString());
    return typeof payload.exp === "number" && payload.exp > Date.now();
  } catch {
    return false;
  }
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  if (stored.startsWith("scrypt:")) {
    const parts = stored.split(":");
    if (parts.length !== 3) return false;
    const [, salt, hash] = parts;
    const candidate = crypto.scryptSync(password, salt, 64);
    const expected = Buffer.from(hash, "hex");
    if (candidate.length !== expected.length) return false;
    return crypto.timingSafeEqual(candidate, expected);
  }
  const hashed = crypto.createHash("sha256").update(password).digest();
  const storedHash = crypto.createHash("sha256").update(stored).digest();
  return crypto.timingSafeEqual(hashed, storedHash);
}

export function checkPassword(password: string): boolean {
  const auth = getAuth();
  return verifyPassword(password, auth.password);
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const store = await cookies();
    const token = store.get(COOKIE_NAME)?.value;
    if (!token) return false;
    const auth = getAuth();
    return verifyToken(token, auth.secret);
  } catch {
    return false;
  }
}

export function setAuthCookie(token: string) {
  return {
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    maxAge: MAX_AGE,
    path: "/",
  };
}

export function clearAuthCookie() {
  return {
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  };
}

export { COOKIE_NAME };
