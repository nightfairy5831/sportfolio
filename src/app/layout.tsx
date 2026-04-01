import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "SportFolio - Gestao de Eventos Esportivos & Marketplace de Fotos",
  description: "Plataforma completa para gestao de eventos esportivos integrada a marketplace de fotos com OCR e reconhecimento facial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} h-full`}>
      <body className="min-h-full font-poppins antialiased bg-gray-50">
        {children}
      </body>
    </html>
  );
}
