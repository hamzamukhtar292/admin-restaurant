import Head from 'next/head';
import './globals.css';
import { Inter } from 'next/font/google';
import ReactQueryProvider from '@/utlis/providers/ReactQueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Admin Restaurant',
  description: 'Admin Restaurant Application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <main>{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
