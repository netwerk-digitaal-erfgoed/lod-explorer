import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/style.css";
import HeaderNavBar from "@/app/HeaderNavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LOD Explorer",
  description: "Linked Open Data explorer ",
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
      <body className={inter.className}>
      <HeaderNavBar />
      <div className="p-4">{children}</div>
      </body>
      </html>
  );
}
