// app/layout.tsx

import Head from 'next/head';
import './globals.css';
import { Inter } from 'next/font/google';
import ReactQueryProvider from './react-query/ReactQueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Admin Restaurant',
  description: 'Admin Restaurant Application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className={inter.className}>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
