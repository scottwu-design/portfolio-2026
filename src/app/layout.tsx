import type { Metadata } from "next";
import { Syne, Wix_Madefor_Text } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  weight: ["700", "800"],
  subsets: ["latin"],
});

const wixMadefor = Wix_Madefor_Text({
  variable: "--font-wix-madefor",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Scott Wu — Digital Product Designer",
    template: "%s — Scott Wu",
  },
  description:
    "Scott Wu is a creative professional focused on digital product design — UX, visual, and motion design for mobile, TV, wearable, and web products.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${wixMadefor.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-neutral-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
