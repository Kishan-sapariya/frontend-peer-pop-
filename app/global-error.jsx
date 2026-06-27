"use client";

import { useEffect } from "react";

// Last-resort boundary: catches errors in the ROOT layout itself.
// It replaces <html>/<body>, so styling is inlined — Tailwind/global CSS
// is not guaranteed to be available when this renders.
export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f3f4f6",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
          padding: "1rem",
        }}
      >
        <div
          style={{
            maxWidth: "26rem",
            width: "100%",
            textAlign: "center",
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "1.5rem",
            boxShadow: "0 20px 40px -20px rgba(0,0,0,0.15)",
            padding: "2.5rem 2rem",
          }}
        >
          <div
            style={{
              width: "4rem",
              height: "4rem",
              margin: "0 auto 1.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "1rem",
              background: "#fef9c3",
              fontSize: "1.75rem",
            }}
            aria-hidden="true"
          >
            ⚠️
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#111827",
              letterSpacing: "-0.02em",
            }}
          >
            Something went wrong
          </h1>
          <p
            style={{
              margin: "0.75rem 0 0",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#4b5563",
            }}
          >
            The app hit an unexpected error. Please try again — if it keeps
            happening, reload the page.
          </p>
          <button
            onClick={() => reset()}
            style={{
              marginTop: "1.75rem",
              border: "none",
              cursor: "pointer",
              background: "#eab308",
              color: "#000",
              fontWeight: 600,
              fontSize: "0.95rem",
              padding: "0.65rem 1.5rem",
              borderRadius: "9999px",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
