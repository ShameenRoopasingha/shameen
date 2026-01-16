import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/store/provider";
import { DataProvider } from "@/components/DataProvider";
import { getAllData } from "@/lib/server/data";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap", // Prevents font preload warnings
});

export const metadata: Metadata = {
  title: "TVA TemPad | Shameen Roopasingha - Full Stack Developer",
  description: "Variant Record: Full Stack Developer specializing in React, Next.js, Node.js, and UI/UX animations.",
  keywords: ["Full Stack Developer", "React", "Next.js", "Node.js", "Three.js", "Portfolio"],
  authors: [{ name: "Shameen Roopasingha" }],
  openGraph: {
    title: "TVA TemPad | Shameen Roopasingha",
    description: "Variant Record: Full Stack Developer",
    type: "website",
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const portfolioData = await getAllData();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceMono.variable} antialiased`} suppressHydrationWarning>
        <ReduxProvider>
          <DataProvider data={portfolioData}>
            {children}
          </DataProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
