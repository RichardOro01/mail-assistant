import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { I18NProvider } from '@/i18n/context';
import acceptLanguage from 'accept-language';
import { getCurrentLanguage } from '@/i18n';
import { languages } from '@/i18n/settings';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mail Assistant',
  description: 'Mail Assistant for you'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  acceptLanguage.languages(languages);
  const lng = getCurrentLanguage();
  return (
    <html lang={lng} suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <I18NProvider {...{ lng }}>{children}</I18NProvider>
      </body>
    </html>
  );
}
