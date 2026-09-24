import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME, verifyToken } from "@/lib/auth";
import { getAuth } from "@/lib/store";
import fs from "fs";
import path from "path";

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

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) {
    return NextResponse.json([]);
  }

  const files = fs.readdirSync(uploadDir).filter((f) => f !== ".gitkeep").map((f) => {
    const stats = fs.statSync(path.join(uploadDir, f));
    const ext = path.extname(f).toLowerCase();
    const isVideo = [".mp4", ".webm", ".mov"].includes(ext);
    return {
      name: f,
      url: `/uploads/${f}`,
      size: stats.size,
      modified: stats.mtime.toISOString(),
      type: isVideo ? "video" : "image",
    };
  });

  files.sort((a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime());
  return NextResponse.json(files);
}

export async function DELETE(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    if (!name || name.includes("..") || name.includes("/") || name.includes("\\")) {
      return NextResponse.json({ error: "Invalid file name" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "public", "uploads", name);
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    fs.unlinkSync(filePath);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
