import type { Metadata } from "next";
import { Alegreya } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const alegreya = Alegreya({
  subsets: ["latin"],
  variable: "--font-alegreya",
});

export const metadata: Metadata = {
  title: "Finara AI",
  description: "Your Personal AI Finance Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${alegreya.variable} antialiased`}>
      <body className="font-body">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
