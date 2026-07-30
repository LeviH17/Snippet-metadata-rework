import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Snippet Metadata Rework",
  description: "Snippet card recreation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
