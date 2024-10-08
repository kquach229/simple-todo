import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='bg-magnificent-green min-h-[100vh] pt-10 px-10'>
          <h1 className='text-xl m-auto w-full p-2 max-w-4xl'>Simple Todo</h1>
          {children}
        </div>
      </body>
    </html>
  );
}
