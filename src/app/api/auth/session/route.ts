import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME, verifyToken, clearAuthCookie } from "@/lib/auth";
import { getAuth } from "@/lib/store";

export async function GET() {
  try {
    const store = await cookies();
    const token = store.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ authenticated: false });
    }
    const auth = await getAuth();
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
