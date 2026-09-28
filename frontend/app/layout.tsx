import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TechStore | Tienda de Tecnología y Gadgets',
  description: 'Tu e-commerce de tecnología con las mejores marcas, ofertas exclusivas y entrega rápida.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col">
        {children}
      </body>
    </html>
  );
}
