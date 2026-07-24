import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer"
import { roboto }  from "./fonts";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Sacrament Meetings",
  description: "Review, plan, and manage sacrament meeting agendas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", roboto.className, "font-sans", inter.variable)}
    >
      <body className="bodyEl relative">
          <Header />
          {children}
          <Toaster position="top-right" />
          <Footer />
      </body>
    </html>
  );
}
