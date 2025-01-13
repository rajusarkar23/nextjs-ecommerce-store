import type { Metadata } from "next";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import NavbarComp from "@/components/Navbar";

export const metadata: Metadata = {
  title: "@Discount CPUs",
  description: "Purchase cpus at best price",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextUIProvider>
          <NavbarComp />
          {children}
        </NextUIProvider>
      </body>
    </html>
  );
}
