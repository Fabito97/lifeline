import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../features/auth/components/AuthLayout";

const EmailPreviewPage = () => {
  const [html, setHtml] = useState("");
  const [actionUrl, setActionUrl] = useState("");
  const [actionLabel, setActionLabel] = useState("");
  const [previewType, setPreviewType] = useState("email");

  useEffect(() => {
    setHtml(sessionStorage.getItem("emailPreviewHtml") || "");
    setActionUrl(sessionStorage.getItem("emailPreviewActionUrl") || "");
    setActionLabel(sessionStorage.getItem("emailPreviewActionLabel") || "");
    setPreviewType(sessionStorage.getItem("emailPreviewType") || "email");
  }, []);

  const title =
    previewType === "reset" ? ["Reset", "Email Preview"] : ["Email", "Preview"];
  const subtitle =
    previewType === "reset"
      ? "This is the exact HTML your reset email would contain."
      : "This is the exact HTML your verification email would contain.";

  return (
    <AuthLayout
      heroBadge="Preview Mode"
      heroTitle={title}
      heroSubtitle={subtitle}
    >
      <div className="w-full max-w-3xl">
        {!html && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              No Email Preview Found
            </h2>
            <p className="text-slate-500 mb-6">
              Please try resending the verification Link.
            </p>
            <Link
              to="/verify-email"
              className="inline-block px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm"
            >
              {previewType === "reset"
                  ? "Back to Forgot Password"
                  : "Back to Verify Email"}
            </Link>
          </div>
        )}

        {html && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to={previewType === "reset" ? "/forgot-password" : "/verify-email"}
                className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm text-center hover:bg-slate-50 transition-all"
              >
                {previewType === "reset"
                  ? "Back to Forgot Password"
                  : "Back to Verify Email"}
              </Link>
              {actionUrl && (
                <a
                  href={actionUrl}
                  className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm text-center hover:bg-blue-700 transition-all"
                  target="_blank"
                  rel="noreferrer"
                >
                  {actionLabel || "Open Link"}
                </a>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <iframe
                title="Email Preview"
                srcDoc={html}
                className="w-full h-[600px] bg-white"
              />
            </div>
          </div>
        )}
      </div>
    </AuthLayout>
  );
};

export default EmailPreviewPage;
