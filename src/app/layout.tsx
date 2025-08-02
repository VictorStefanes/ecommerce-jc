import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientProviders from '../components/providers/ClientProviders';
import Layout from '../components/layout/Layout';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "JC Atacados - Moda Esportiva de Qualidade",
  description: "Descubra a melhor moda esportiva com qualidade premium. Camisetas Dry Fit, Oversized, Leggings e muito mais na JC Atacados.",
  keywords: "moda esportiva, dry fit, oversized, legging, academia, treino, qualidade, atacado",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} antialiased`}>
        <ClientProviders>
          <Layout>
            {children}
          </Layout>
        </ClientProviders>
      </body>
    </html>
  );
}
