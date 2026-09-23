import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME, verifyToken } from "@/lib/auth";
import { getContent, saveContent, getAuth, isValidContent } from "@/lib/store";

async function checkAuth(): Promise<boolean> {
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

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getContent());
}

export async function PUT(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    if (!isValidContent(body)) {
      return NextResponse.json(
        { error: "Invalid content shape: missing required sections" },
        { status: 400 }
      );
    }
    saveContent(body);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
