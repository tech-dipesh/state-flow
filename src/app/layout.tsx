import type { Metadata } from "next";
import PopupProvider from '@context'
import { Analytics } from '@vercel/analytics/next';
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "State Flow",
  description: "Project Managment - State Flow - Github tech-dipes",
  icons: {
    icon: "/logo.png", 
  },
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} >
      <body className="min-h-full flex flex-col">
        <PopupProvider>
          <Header/>
          <Analytics/>
          {children}
          <Footer/>
        </PopupProvider>
      </body>
    </html>
  );
}
