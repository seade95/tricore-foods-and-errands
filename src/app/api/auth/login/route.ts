import { NextRequest, NextResponse } from "next/server";
import { checkPassword, createToken, setAuthCookie } from "@/lib/auth";
import { getAuth } from "@/lib/store";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map<string, { count: number; reset: number }>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || entry.reset < now) {
    attempts.set(key, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many attempts. Try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    if (!checkPassword(password)) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    attempts.delete(ip);
    const auth = getAuth();
    const token = createToken(auth.secret);
    const response = NextResponse.json({ ok: true });
    response.cookies.set(setAuthCookie(token));
    return response;
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
