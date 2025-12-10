import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Container from '@/components/Global/Container';
import NavBar from '@/components/NavBar/NavBar';
const inter = Inter({ subsets: ['latin'] });
import Providers from './providers';
import { ClerkProvider } from "@clerk/nextjs"

export const metadata: Metadata = {
  title: 'Next Storefront',
  description: 'A nifty store built with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body className={inter.className}>
          <Providers>
            <NavBar />
            <Container className='py-20'>{children}</Container></Providers></body>
      </html>
    </ClerkProvider>
  );
}
