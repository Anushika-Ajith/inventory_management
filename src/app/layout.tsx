import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Inventory Management | ODIN',
  description: 'ODIN Item Management & Inventory Control Interface',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
