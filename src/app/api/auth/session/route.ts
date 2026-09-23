import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME, verifyToken, createToken, clearAuthCookie, setAuthCookie } from "@/lib/auth";
import { getAuth } from "@/lib/store";

export async function GET() {
  try {
    const store = await cookies();
    const token = store.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ authenticated: false });
    }
    const auth = getAuth();
    const valid = verifyToken(token, auth.secret);
    if (!valid) {
      const response = NextResponse.json({ authenticated: false });
      response.cookies.set(clearAuthCookie());
      return response;
    }
    return NextResponse.json({ authenticated: true });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}

export async function POST() {
  try {
    const auth = getAuth();
    const token = createToken(auth.secret);
    const response = NextResponse.json({ ok: true });
    response.cookies.set(setAuthCookie(token));
    return response;
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
