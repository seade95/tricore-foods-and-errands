import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME, verifyToken, checkPassword, hashPassword } from "@/lib/auth";
import { getAuth, saveAuth } from "@/lib/store";

async function checkAuth(): Promise<boolean> {
  try {
    const store = await cookies();
    const token = store.get(COOKIE_NAME)?.value;
    if (!token) return false;
    const auth = await getAuth();
    return verifyToken(token, auth.secret);
  } catch {
    return false;
  }
}

export async function PUT(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Both current and new password are required" }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: "New password must be at least 6 characters" }, { status: 400 });
    }

    if (!(await checkPassword(currentPassword))) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });
    }

    const auth = await getAuth();
    await saveAuth({ ...auth, password: hashPassword(newPassword) });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
