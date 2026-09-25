import { NextRequest, NextResponse } from "next/server";
import { checkPassword, createToken, setAuthCookie } from "@/lib/auth";
import { getAuth, trackLoginAttempt, clearLoginAttempts } from "@/lib/store";

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("cf-connecting-ip")?.trim() ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "local";
    const { limited } = await trackLoginAttempt(ip);
    if (limited) {
      return NextResponse.json(
        { error: "Too many attempts. Try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    if (!(await checkPassword(password))) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    clearLoginAttempts(ip);
    const auth = await getAuth();
    const token = createToken(auth.secret);
    const response = NextResponse.json({ ok: true });
    response.cookies.set(setAuthCookie(token));
    return response;
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
