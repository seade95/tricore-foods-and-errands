import { NextRequest, NextResponse } from "next/server";
import { appendSubmission } from "@/lib/store";
import type { Submission } from "@/lib/types";

const MAX_BODY = 20_000;

function sanitize(data: Record<string, unknown>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string") {
      out[key] = value.slice(0, 4000);
    } else if (value != null) {
      out[key] = String(value).slice(0, 4000);
    }
  }
  return out;
}

export async function POST(request: NextRequest) {
  try {
    const text = await request.text();
    if (text.length > MAX_BODY) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }

    let body: Record<string, unknown>;
    try {
      body = JSON.parse(text);
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const type = body.type;
    if (type !== "contact" && type !== "request" && type !== "business") {
      return NextResponse.json({ error: "Invalid submission type" }, { status: 400 });
    }

    const data = sanitize(body);
    delete data.type;

    const requiredByType: Record<Submission["type"], string[]> = {
      contact: ["name", "message"],
      request: ["name", "phone", "location"],
      business: ["organisation", "contactPerson", "phone", "email"],
    };

    const missing = requiredByType[type].filter((k) => !data[k]?.trim());
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    const entry = await appendSubmission({ type, data });
    return NextResponse.json({ ok: true, id: entry.id });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
