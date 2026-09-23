import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_FILE = path.join(DATA_DIR, "content.json");
const AUTH_FILE = path.join(DATA_DIR, "auth.json");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

export function getContent(): any {
  ensureDir();
  try {
    const raw = fs.readFileSync(CONTENT_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function saveContent(content: any): void {
  ensureDir();
  const tmp = CONTENT_FILE + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(content, null, 2));
  fs.renameSync(tmp, CONTENT_FILE);
}

export function getAuth(): { password: string; secret: string } {
  ensureDir();
  try {
    const raw = fs.readFileSync(AUTH_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { password: "admin123", secret: "tricore-default-secret" };
  }
}

export function saveAuth(auth: { password: string; secret: string }): void {
  ensureDir();
  const tmp = AUTH_FILE + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(auth, null, 2));
  fs.renameSync(tmp, AUTH_FILE);
}
