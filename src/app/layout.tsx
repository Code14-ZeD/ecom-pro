import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import Footer from "@/components/footer";
import { JotaiProvider } from "./providers";
import { Toaster } from "@/components/ui/sonner"


export const metadata: Metadata = {
  title: "ECOM PROFILE",
  description: "An ecommerce app with cart functionality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-slate-50 font-sans antialiased">
        <JotaiProvider>
        <Header />
        {children}
        <Footer />
        <Toaster/>
        </JotaiProvider>
      </body>
    </html>
  );
}
