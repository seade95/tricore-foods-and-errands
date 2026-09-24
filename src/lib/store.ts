import fs from "fs";
import path from "path";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { Content, Submission } from "./types";
import bundledContent from "../../data/content.json";

interface KvLike {
  get(key: string): Promise<string | null>;
  put(
    key: string,
    value: string,
    options?: { expirationTtl?: number }
  ): Promise<void>;
  delete(key: string): Promise<void>;
}

interface R2Object {
  arrayBuffer(): Promise<ArrayBuffer>;
  httpMetadata?: { contentType?: string };
}

interface R2Like {
  put(
    key: string,
    value: ArrayBuffer | Uint8Array | string,
    options?: { httpMetadata?: { contentType?: string } }
  ): Promise<unknown>;
  get(key: string): Promise<R2Object | null>;
  delete(key: string): Promise<void>;
  list(options?: {
    prefix?: string;
    limit?: number;
  }): Promise<{
    objects: { key: string; size: number; uploaded: Date }[];
  }>;
}

const KV_CONTENT = "content";
const KV_AUTH = "auth";
const KV_SUBMISSIONS = "submissions";
const KV_RATE_PREFIX = "rl:login:";

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

export function getKv(): KvLike | null {
  try {
    const ctx = getCloudflareContext();
    const kv = (
      ctx.env as unknown as Record<string, unknown>
    ).TRICORE_KV as KvLike | undefined;
    if (kv && typeof kv.get === "function" && typeof kv.put === "function") {
      return kv;
    }
  } catch {
    // local next dev/build without OpenNext context
  }
  return null;
}

export function getR2(): R2Like | null {
  try {
    const ctx = getCloudflareContext();
    const bucket = (
      ctx.env as unknown as Record<string, unknown>
    ).TRICORE_MEDIA as R2Like | undefined;
    if (
      bucket &&
      typeof bucket.put === "function" &&
      typeof bucket.get === "function"
    ) {
      return bucket;
    }
  } catch {
    // local next dev/build without OpenNext context
  }
  return null;
}

export interface RateLimitResult {
  limited: boolean;
}

export async function trackLoginAttempt(
  ip: string,
  maxAttempts = 5,
  windowMs = 15 * 60 * 1000
): Promise<RateLimitResult> {
  const now = Date.now();
  const kv = getKv();
  if (kv) {
    const key = `${KV_RATE_PREFIX}${ip}`;
    try {
      const raw = await kv.get(key);
      let count = 1;
      let reset = now + windowMs;
      if (raw) {
        const parsed = JSON.parse(raw) as { count: number; reset: number };
        if (typeof parsed.reset === "number" && parsed.reset > now) {
          count = parsed.count + 1;
          reset = parsed.reset;
        }
      }
      await kv.put(
        key,
        JSON.stringify({ count, reset }),
        { expirationTtl: Math.max(60, Math.ceil((reset - now) / 1000)) }
      );
      return { limited: count > maxAttempts };
    } catch {
      // fall through to memory limiter
    }
  }

  // in-memory fallback (single isolate / local dev)
  const entry = memoryAttempts.get(ip);
  if (!entry || entry.reset < now) {
    memoryAttempts.set(ip, { count: 1, reset: now + windowMs });
    return { limited: false };
  }
  entry.count += 1;
  return { limited: entry.count > maxAttempts };
}

export function clearLoginAttempts(ip: string): void {
  memoryAttempts.delete(ip);
  const kv = getKv();
  if (kv && typeof kv.delete === "function") {
    void kv.delete(`${KV_RATE_PREFIX}${ip}`).catch(() => {});
  }
}

const memoryAttempts = new Map<string, { count: number; reset: number }>();

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJsonFile<T>(file: string): T | null {
  try {
    ensureDir();
    return JSON.parse(fs.readFileSync(file, "utf-8")) as T;
  } catch {
    return null;
  }
}

function writeJsonFile(file: string, value: unknown): void {
  ensureDir();
  const tmp = file + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(value, null, 2));
  fs.renameSync(tmp, file);
}

export async function getContent(): Promise<Content> {
  const kv = getKv();
  if (kv) {
    try {
      const raw = await kv.get(KV_CONTENT);
      if (raw) return JSON.parse(raw) as Content;
      await kv.put(KV_CONTENT, JSON.stringify(bundledContent));
      return bundledContent as Content;
    } catch {
      return bundledContent as Content;
    }
  }
  return readJsonFile<Content>(CONTENT_FILE) ?? (bundledContent as Content);
}

export function isValidContent(body: unknown): body is Content {
  if (!body || typeof body !== "object" || Array.isArray(body)) return false;
  return CONTENT_KEYS.every((key) => key in (body as object));
}

export async function saveContent(content: Content): Promise<void> {
  const kv = getKv();
  if (kv) {
    await kv.put(KV_CONTENT, JSON.stringify(content));
    return;
  }
  writeJsonFile(CONTENT_FILE, content);
}

export async function getAuth(): Promise<{ password: string; secret: string }> {
  const kv = getKv();
  if (kv) {
    try {
      const raw = await kv.get(KV_AUTH);
      if (raw) return JSON.parse(raw);
    } catch {
      // fall through
    }
    return {
      password: process.env.ADMIN_PASSWORD || "admin123",
      secret: process.env.AUTH_SECRET || "tricore-default-secret",
    };
  }
  return (
    readJsonFile<{ password: string; secret: string }>(AUTH_FILE) ?? {
      password: process.env.ADMIN_PASSWORD || "admin123",
      secret: process.env.AUTH_SECRET || "tricore-default-secret",
    }
  );
}

export async function saveAuth(auth: {
  password: string;
  secret: string;
}): Promise<void> {
  const kv = getKv();
  if (kv) {
    await kv.put(KV_AUTH, JSON.stringify(auth));
    return;
  }
  writeJsonFile(AUTH_FILE, auth);
}

export async function getSubmissions(): Promise<Submission[]> {
  const kv = getKv();
  if (kv) {
    try {
      const raw = await kv.get(KV_SUBMISSIONS);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return readJsonFile<Submission[]>(SUBMISSIONS_FILE) ?? [];
}

export async function appendSubmission(
  submission: Omit<Submission, "id" | "receivedAt">
): Promise<Submission> {
  const entry: Submission = {
    ...submission,
    id: `sub-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    receivedAt: new Date().toISOString(),
  };
  const kv = getKv();
  if (kv) {
    try {
      const list = await getSubmissions();
      list.unshift(entry);
      await kv.put(KV_SUBMISSIONS, JSON.stringify(list.slice(0, 500)));
    } catch {
      // keep entry in response even if KV write fails
    }
    return entry;
  }
  try {
    const list = (await getSubmissions()) ?? [];
    list.unshift(entry);
    writeJsonFile(SUBMISSIONS_FILE, list);
  } catch {
    // ignore local FS errors
  }
  return entry;
}
