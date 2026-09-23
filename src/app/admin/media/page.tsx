"use client";

/* eslint-disable @next/next/no-img-element -- dynamic admin media URLs */
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AdminPageHeader, ToastDisplay } from "@/components/admin/ui";
import type { Toast } from "@/components/admin/hooks";
import { uploadFile } from "@/components/admin/hooks";
import { FolderOpen, Upload, Trash2, Copy, Loader2, ImageIcon, Film } from "lucide-react";

interface MediaFile {
  name: string;
  url: string;
  size: number;
  modified: string;
  type: string;
}

export default function AdminMediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const showToast = useCallback((t: Toast) => {
    setToast(t);
    setTimeout(() => setToast(null), 3500);
  }, []);

  const loadFiles = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/media");
      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }
      const data = await res.json();
      setFiles(data);
    } catch {
      showToast({ type: "error", message: "Failed to load media" });
    }
    setLoading(false);
  }, [showToast, router]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/media");
        if (res.status === 401) {
          if (!cancelled) router.replace("/admin/login");
          return;
        }
        const data = await res.json();
        if (!cancelled) setFiles(data);
      } catch {
        if (!cancelled) showToast({ type: "error", message: "Failed to load media" });
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [showToast, router]);

  const handleUpload = async (fileList: FileList | null) => {
    if (!fileList) return;
    setUploading(true);
    let success = 0;
    let failed = 0;
    for (const file of Array.from(fileList)) {
      const result = await uploadFile(file);
      if ("error" in result) {
        failed++;
        if (result.unauthorized) {
          router.replace("/admin/login");
          return;
        }
      } else {
        success++;
      }
    }
    setUploading(false);
    if (success > 0) showToast({ type: "success", message: `Uploaded ${success} file${success !== 1 ? "s" : ""}` });
    if (failed > 0) showToast({ type: "error", message: `${failed} file${failed !== 1 ? "s" : ""} failed` });
    loadFiles();
  };

  const handleDelete = async (name: string) => {
    if (!confirm(`Delete ${name}?`)) return;
    try {
      const res = await fetch(`/api/admin/media?name=${encodeURIComponent(name)}`, { method: "DELETE" });
      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }
      if (res.ok) {
        showToast({ type: "success", message: "File deleted" });
        setFiles((f) => f.filter((x) => x.name !== name));
      } else {
        showToast({ type: "error", message: "Delete failed" });
      }
    } catch {
      showToast({ type: "error", message: "Delete failed" });
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(window.location.origin + url);
    showToast({ type: "success", message: "URL copied to clipboard" });
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const filtered = files.filter((f) => filter === "all" || f.type === filter);

  return (
    <div>
      <ToastDisplay toast={toast} />
      <AdminPageHeader title="Media Library" description="Upload and manage images and videos" icon={<FolderOpen className="w-5 h-5" />} />

      {/* Upload Area */}
      <div
        className="border-2 border-dashed border-tricore-gray-300 rounded-2xl p-8 text-center hover:border-tricore-red/50 transition-colors mb-6 cursor-pointer"
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleUpload(e.dataTransfer.files);
        }}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*,video/*"
          multiple
          className="hidden"
          onChange={(e) => {
            handleUpload(e.target.files);
            e.target.value = "";
          }}
        />
        {uploading ? (
          <Loader2 className="w-8 h-8 text-tricore-red animate-spin mx-auto mb-3" />
        ) : (
          <Upload className="w-8 h-8 text-tricore-gray-400 mx-auto mb-3" />
        )}
        <p className="text-sm font-medium text-tricore-black mb-1">
          {uploading ? "Uploading..." : "Drop files here or click to upload"}
        </p>
        <p className="text-xs text-tricore-gray-500">
          Images (JPG, PNG, WebP, GIF) and Videos (MP4, WebM, MOV) — max 50MB each
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-4">
        {(["all", "image", "video"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors capitalize ${
              filter === f ? "bg-tricore-red text-white" : "bg-white border border-tricore-gray-200 text-tricore-gray-600 hover:border-tricore-gray-300"
            }`}
          >
            {f === "all" ? `All (${files.length})` : `${f}s (${files.filter((x) => x.type === f).length})`}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="w-8 h-8 text-tricore-red animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-tricore-gray-400">
          <ImageIcon className="w-12 h-12 mx-auto mb-3" />
          <p className="text-sm">No media files yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((file) => (
            <div key={file.name} className="bg-white rounded-xl border border-tricore-gray-200 overflow-hidden group">
              <div className="relative aspect-square bg-tricore-gray-100">
                {file.type === "image" ? (
                  <img src={file.url} alt={file.name} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-tricore-gray-400">
                    <Film className="w-8 h-8 mb-2" />
                    <span className="text-xs px-2 py-0.5 bg-tricore-gray-200 rounded-full uppercase">Video</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => copyUrl(file.url)}
                    className="p-2 bg-white rounded-lg text-tricore-black hover:bg-tricore-gray-100 transition-colors"
                    title="Copy URL"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(file.name)}
                    className="p-2 bg-white rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs text-tricore-black font-medium truncate" title={file.name}>{file.name}</p>
                <p className="text-xs text-tricore-gray-400 mt-0.5">{formatSize(file.size)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
