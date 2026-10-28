import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adley | Technical Hub & Systems Portfolio",
  description:
    "Engineering robust systems at the intersection of AI, Cloud & Distributed Architecture. Clean Swiss Minimalist Portfolio.",
  keywords: [
    "AI Engineer",
    "Systems Architecture",
    "Cloud Computing",
    "DevOps",
    "Raft Consensus",
    "Portfolio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${robotoMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-white text-[#0f0f23] flex flex-col font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
