import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import "@/app/globals.css";
import { PageTransition } from "@/components/PageTransition";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Portfolio de Manuel Ferrario",
  description: "Presentación de Manuel Ferrario para Talento Flux - Naranja X"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-AR">
      <body className={`${manrope.variable} ${display.variable}`}>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}

