"use client";

import { useState } from "react";
import { AdminPageHeader, AdminCard, ToastDisplay, inputClass, Field } from "@/components/admin/ui";
import type { Toast } from "@/components/admin/hooks";
import { KeyRound, Loader2, Eye, EyeOff } from "lucide-react";

export default function AdminPasswordPage() {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (t: Toast) => {
    setToast(t);
    setTimeout(() => setToast(null), 3500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass !== confirm) {
      showToast({ type: "error", message: "New passwords do not match" });
      return;
    }
    if (newPass.length < 6) {
      showToast({ type: "error", message: "New password must be at least 6 characters" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: current, newPassword: newPass }),
      });
      const data = await res.json();
      if (res.ok) {
        showToast({ type: "success", message: "Password changed successfully" });
        setCurrent("");
        setNewPass("");
        setConfirm("");
      } else {
        showToast({ type: "error", message: data.error || "Failed to change password" });
      }
    } catch {
      showToast({ type: "error", message: "Connection error" });
    }
    setLoading(false);
  };

  return (
    <div>
      <ToastDisplay toast={toast} />
      <AdminPageHeader title="Change Password" description="Update your admin dashboard password" icon={<KeyRound className="w-5 h-5" />} />

      <div className="max-w-lg">
        <AdminCard title="Update Password" description="Choose a strong password you'll remember">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Field label="Current Password" required>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={current}
                  onChange={(e) => setCurrent(e.target.value)}
                  required
                  className={inputClass + " pr-11"}
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-tricore-gray-400 hover:text-tricore-black transition-colors"
                >
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </Field>

            <Field label="New Password" required hint="Minimum 6 characters">
              <input
                type={show ? "text" : "password"}
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                required
                minLength={6}
                className={inputClass}
                placeholder="Enter new password"
              />
            </Field>

            <Field label="Confirm New Password" required>
              <input
                type={show ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                className={inputClass}
                placeholder="Re-enter new password"
              />
            </Field>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 bg-tricore-red text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-tricore-red-dark transition-colors disabled:opacity-50"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Updating..." : "Change Password"}
            </button>
          </form>
        </AdminCard>
      </div>
    </div>
  );
}
