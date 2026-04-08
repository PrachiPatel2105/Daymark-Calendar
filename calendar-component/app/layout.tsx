import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daymark Calendar",
  description: "A beautiful, interactive calendar component with date range selection and notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
