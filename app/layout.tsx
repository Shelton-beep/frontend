import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "House Price Prediction",
  description:
    "A Multiple Variable Linear Regression Model for predicting house prices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <main className="p-8 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-100 h-full min-h-screen w-full flex flex-col items-center">
          <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg p-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
