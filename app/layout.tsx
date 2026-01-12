import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Serrurier Paris - Urgence 24h/24',
  description: 'Serrurier d\'urgence à Paris. Intervention en moins de 30 minutes, 24h/24 et 7j/7.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >


        <Navbar />
        
        {/* Mobile CTA Button (shown only on mobile) */}
        {/* <a 
          href="tel:0123456789" 
          className="mobile-cta-button" // Add this to your global CSS
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 16.92V19.92C22 20.47 21.55 20.92 21 20.92C18.75 20.92 16.6 20.21 14.78 18.9C12.98 17.6 11.61 15.79 10.88 13.73C10.15 11.67 10.09 9.47 10.71 7.37C11.33 5.27 12.59 3.38 14.34 2.06C14.77 1.74 15.36 1.87 15.68 2.31C15.99 2.75 15.87 3.33 15.43 3.65C14.04 4.7 13.03 6.15 12.54 7.78C12.04 9.41 12.09 11.15 12.68 12.76C13.27 14.37 14.37 15.75 15.82 16.68C17.27 17.61 18.99 18.04 20.74 17.92C21.28 17.88 21.74 18.34 21.78 18.88C21.82 19.42 21.36 19.88 20.82 19.92H17.82" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14.83 9.92C15.38 9.92 15.83 9.47 15.83 8.92C15.83 8.37 15.38 7.92 14.83 7.92C14.28 7.92 13.83 8.37 13.83 8.92C13.83 9.47 14.28 9.92 14.83 9.92Z" fill="white"/>
          </svg>
          <span>01 23 45 67 89</span>
        </a> */}

        <main style={{ paddingTop: '0px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
