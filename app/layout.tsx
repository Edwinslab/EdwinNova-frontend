import type { Metadata } from "next";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";
import Cursor from "@/components/Cursor";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "EDWINNOVA 2026 — From Requirements to Reality",
  description:
    "A 4-day startup hackathon at Alvas Institute, April 3–6 2026. 24 vetted teams. Real investors. Shark Tank finals. Get funded.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head >
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <SmoothScrolling>{children}</SmoothScrolling>
        <Cursor />
        <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            style: {
              background: "#111620",
              border: "1px solid rgba(155,233,49,0.2)",
              color: "#E6EDF3",
              fontFamily: "'Space Mono', monospace",
              fontSize: "12px",
            },
          }}
        />
      </body>
    </html>
  );
}