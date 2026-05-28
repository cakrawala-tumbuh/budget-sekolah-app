import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { AuthWrapper } from "@/components/layout/AuthWrapper";
import { ServiceWorkerRegister } from "@/components/layout/ServiceWorkerRegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Budget YPII",
  description: "Simulasi Rencana Anggaran Belanja YPII",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Budget YPII",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#18181b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full">
        <Providers>
          <AuthWrapper>{children}</AuthWrapper>
          <ServiceWorkerRegister />
        </Providers>
      </body>
    </html>
  );
}
