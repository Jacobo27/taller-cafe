import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Café Artesanal",
  description: "Tienda de café artesanal colombiano",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body suppressHydrationWarning className={`${geist.className} antialiased bg-green-100`}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
