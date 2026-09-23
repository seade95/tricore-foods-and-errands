"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Content } from "@/lib/types";

export interface Toast {
  type: "success" | "error";
  message: string;
}

export function useContent() {
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  const showToast = useCallback((t: Toast) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(t);
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/content")
      .then(async (r) => {
        if (r.status === 401) {
          if (!cancelled) router.replace("/admin/login");
          return;
        }
        const d = await r.json();
        if (!cancelled) {
          setContent(d);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          showToast({ type: "error", message: "Failed to load content" });
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [showToast, router]);

  const save = useCallback(
    async (data: Content) => {
      setSaving(true);
      try {
        const res = await fetch("/api/admin/content", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (res.status === 401) {
          router.replace("/admin/login");
          return;
        }
        if (!res.ok) throw new Error();
        setContent(data);
        showToast({ type: "success", message: "Saved successfully" });
      } catch {
        showToast({ type: "error", message: "Failed to save" });
      }
      setSaving(false);
    },
    [showToast, router]
  );

  const update = useCallback((updater: (c: Content) => Content) => {
    setContent((prev) => (prev ? updater(prev) : prev));
  }, []);

  return { content, loading, saving, toast, showToast, save, update };
}

export async function uploadFile(
  file: File
): Promise<{ url: string } | { error: string; unauthorized?: boolean }> {
  const fd = new FormData();
  fd.append("file", file);
  try {
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    if (res.status === 401) {
      return { error: "Unauthorized", unauthorized: true };
    }
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Upload failed" };
    return { url: data.url };
  } catch {
    return { error: "Upload failed" };
  }
}
