import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TRPCProvider } from "@/providers/trpc-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restaurant List",
  description:
    "A simple web application that allows users to view a list of restaurants",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
