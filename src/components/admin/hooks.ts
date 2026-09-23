"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export interface Toast {
  type: "success" | "error";
  message: string;
}

export function useContent() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((t: Toast) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(t);
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  }, []);

  useEffect(() => {
    fetch("/api/admin/content")
      .then(async (r) => {
        if (r.status === 401) {
          window.location.href = "/admin/login";
          return;
        }
        const d = await r.json();
        setContent(d);
        setLoading(false);
      })
      .catch(() => {
        showToast({ type: "error", message: "Failed to load content" });
        setLoading(false);
      });
  }, [showToast]);

  const save = useCallback(
    async (data: any) => {
      setSaving(true);
      try {
        const res = await fetch("/api/admin/content", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (res.status === 401) {
          window.location.href = "/admin/login";
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
    [showToast]
  );

  const update = useCallback((updater: (c: any) => any) => {
    setContent((prev: any) => (prev ? updater(prev) : prev));
  }, []);

  return { content, loading, saving, toast, showToast, save, update };
}

export async function uploadFile(file: File): Promise<{ url: string } | { error: string }> {
  const fd = new FormData();
  fd.append("file", file);
  try {
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    if (res.status === 401) {
      window.location.href = "/admin/login";
      return { error: "Unauthorized" };
    }
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Upload failed" };
    return { url: data.url };
  } catch {
    return { error: "Upload failed" };
  }
}
