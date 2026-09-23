"use client";

import { useState, useRef } from "react";
import { CheckCircle, AlertCircle, Upload, X, ImageIcon, Loader2 } from "lucide-react";
import type { Toast } from "./hooks";
import { uploadFile } from "./hooks";

export function ToastDisplay({ toast }: { toast: Toast | null }) {
  if (!toast) return null;
  return (
    <div className="fixed top-4 right-4 z-[100] animate-fade-in-up">
      <div
        className={`flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white ${
          toast.type === "success" ? "bg-green-600" : "bg-red-600"
        }`}
      >
        {toast.type === "success" ? (
          <CheckCircle className="w-4 h-4 shrink-0" />
        ) : (
          <AlertCircle className="w-4 h-4 shrink-0" />
        )}
        {toast.message}
      </div>
    </div>
  );
}

export function Field({
  label,
  children,
  hint,
  required,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-tricore-black mb-1.5">
        {label}
        {required && <span className="text-tricore-red ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-tricore-gray-500 mt-1">{hint}</p>}
    </div>
  );
}

export const inputClass =
  "w-full border border-tricore-gray-300 rounded-xl px-4 py-2.5 text-sm text-tricore-black bg-white focus:ring-2 focus:ring-tricore-red/30 focus:border-tricore-red outline-none transition-colors";

export function AdminInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <Field label={label} required={required} hint={hint}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputClass}
      />
    </Field>
  );
}

export function AdminTextarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  required,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  hint?: string;
}) {
  return (
    <Field label={label} required={required} hint={hint}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={inputClass + " resize-y min-h-[80px]"}
      />
    </Field>
  );
}

export function AdminToggle({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  hint?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <span className="text-sm font-medium text-tricore-black">{label}</span>
        {hint && <p className="text-xs text-tricore-gray-500 mt-0.5">{hint}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ${
          value ? "bg-tricore-red" : "bg-tricore-gray-300"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ${
            value ? "translate-x-5.5" : "translate-x-0.5"
          }`}
          style={{ marginLeft: value ? 0 : 2 }}
        />
      </button>
    </div>
  );
}

export function ImageInput({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    setError("");
    const result = await uploadFile(file);
    setUploading(false);
    if ("error" in result) {
      setError(result.error);
    } else {
      onChange(result.url);
    }
  };

  return (
    <Field label={label} hint={hint}>
      <div className="space-y-2">
        {value && (
          <div className="relative inline-block">
            <img
              src={value}
              alt=""
              className="w-28 h-28 object-cover rounded-xl border border-tricore-gray-200"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
        <div className="flex items-center gap-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 border border-tricore-gray-300 rounded-xl px-4 py-2 text-sm text-tricore-gray-700 hover:border-tricore-red hover:text-tricore-red transition-colors disabled:opacity-50"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {uploading ? "Uploading..." : "Upload"}
          </button>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Or paste image URL"
            className={inputClass + " flex-1"}
          />
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    </Field>
  );
}

export function SaveBar({
  onSave,
  saving,
  onReset,
}: {
  onSave: () => void;
  saving: boolean;
  onReset?: () => void;
}) {
  return (
    <div className="flex items-center gap-3 pt-4 border-t border-tricore-gray-200 mt-6">
      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        className="inline-flex items-center gap-2 bg-tricore-red text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-tricore-red-dark transition-colors disabled:opacity-50"
      >
        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        {saving ? "Saving..." : "Save Changes"}
      </button>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="px-5 py-2.5 rounded-xl text-sm font-medium text-tricore-gray-600 border border-tricore-gray-300 hover:border-tricore-gray-400 transition-colors"
        >
          Reset
        </button>
      )}
    </div>
  );
}

export function AdminCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-tricore-gray-200 p-6">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-tricore-black">{title}</h2>
        {description && <p className="text-sm text-tricore-gray-500 mt-1">{description}</p>}
      </div>
      {children}
    </div>
  );
}

export function AdminPageHeader({
  title,
  description,
  icon,
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-10 h-10 bg-tricore-red-light rounded-xl flex items-center justify-center text-tricore-red">
            {icon}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-tricore-black">{title}</h1>
          {description && <p className="text-sm text-tricore-gray-500 mt-0.5">{description}</p>}
        </div>
      </div>
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="w-8 h-8 text-tricore-red animate-spin" />
    </div>
  );
}
