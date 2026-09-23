import { NextRequest, NextResponse } from "next/server";
import { checkPassword, createToken, setAuthCookie } from "@/lib/auth";
import { getAuth } from "@/lib/store";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    if (!checkPassword(password)) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const auth = getAuth();
    const token = createToken(auth.secret);
    const response = NextResponse.json({ ok: true });
    response.cookies.set(setAuthCookie(token));
    return response;
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
