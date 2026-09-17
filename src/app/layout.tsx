import './globals.css';

import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { Toaster } from 'sonner';

import { Providers } from '@/app/providers';
import { ThemeSwitcher } from '@/features/theme-switcher';
import { cn } from '@/shared/lib';

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Медицинская информационная система",
  description: "МИС",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={cn(manrope.variable)}>
      <body className="min-h-full flex flex-col">
        <Providers>
          <ThemeSwitcher />
          {children} <Toaster position="top-right" richColors closeButton />
        </Providers>
      </body>
    </html>
  );
}
