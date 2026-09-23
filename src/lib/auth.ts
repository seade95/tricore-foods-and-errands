import crypto from "crypto";
import { cookies } from "next/headers";
import { getAuth } from "./store";

const COOKIE_NAME = "tricore_admin";
const MAX_AGE = 60 * 60 * 24;

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
  if (sig !== expected) return false;
  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString());
    return payload.exp > Date.now();
  } catch {
    return false;
  }
}

export function checkPassword(password: string): boolean {
  const auth = getAuth();
  const hashed = crypto.createHash("sha256").update(password).digest("hex");
  const stored = crypto.createHash("sha256").update(auth.password).digest("hex");
  return hashed === stored;
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
