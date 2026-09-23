import fs from "fs";
import path from "path";
import type { Content, Submission } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_FILE = path.join(DATA_DIR, "content.json");
const AUTH_FILE = path.join(DATA_DIR, "auth.json");
const SUBMISSIONS_FILE = path.join(DATA_DIR, "submissions.json");

const CONTENT_KEYS: (keyof Content)[] = [
  "site",
  "contact",
  "whatsapp",
  "social",
  "payment",
  "slides",
  "services",
  "navLinks",
  "testimonials",
  "faq",
  "homepage",
  "about",
  "howItWorksPage",
  "contactPage",
  "servicesPage",
  "footer",
];

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

export function getContent(): Content {
  ensureDir();
  try {
    const raw = fs.readFileSync(CONTENT_FILE, "utf-8");
    const parsed = JSON.parse(raw) as Partial<Content>;
    return parsed as Content;
  } catch {
    return {} as Content;
  }
}

export function isValidContent(body: unknown): body is Content {
  if (!body || typeof body !== "object" || Array.isArray(body)) return false;
  return CONTENT_KEYS.every((key) => key in (body as object));
}

export function saveContent(content: Content): void {
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

export function getSubmissions(): Submission[] {
  ensureDir();
  try {
    const raw = fs.readFileSync(SUBMISSIONS_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function appendSubmission(
  submission: Omit<Submission, "id" | "receivedAt">
): Submission {
  ensureDir();
  const list = getSubmissions();
  const entry: Submission = {
    ...submission,
    id: `sub-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    receivedAt: new Date().toISOString(),
  };
  list.unshift(entry);
  const tmp = SUBMISSIONS_FILE + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(list, null, 2));
  fs.renameSync(tmp, SUBMISSIONS_FILE);
  return entry;
}
