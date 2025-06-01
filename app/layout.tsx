import type { Metadata } from "next";
import { Geist, Geist_Mono,  } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chatterly",
  description: "Chat. Connect. Fall in love.",
  icons: [
    { rel: "icon", url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    { rel: "icon", url: "/favicon/favicon.svg", type: "image/svg+xml" },
    { rel: "apple-touch-icon", url: "/favicon/apple-touch-icon.png", sizes: "180x180" },
    { rel: "shortcut icon", url: "/favicon/favicon.ico" },
  ],
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-pink-50 ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
         {children}
      </body>
    </html>
  );
}
