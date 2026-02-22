import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meniu Restaurant",
  description: "Meniu digital intuitiv",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className={`${inter.className} bg-gray-50 min-h-screen text-gray-900`}>
        
        {/* Adăugăm padding-bottom (pb-24) pentru ca ultimul element din meniu 
            să nu fie acoperit de bara de navigație */}
        <main className="pb-24 max-w-md mx-auto">
          {children}
        </main>
        
        {/* Navigația rămâne fixată jos */}
        
      </body>
    </html>
  );
}