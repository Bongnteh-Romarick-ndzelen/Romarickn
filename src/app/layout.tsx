import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import ConditionalHeader from '@/components/ConditionalHeader';
import ConditionalFooter from '@/components/ConditionalFooter';
import { AuthProvider } from '@/context/AuthContext';
import { LoadingScreenSpinner } from '@/components/LoadingScreen'; // Import your loading screen

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Bongnteh Romarick Ndzelen - Portfolio',
  description: 'The personal portfolio of Bongnteh Romarick Ndzelen, a passionate developer.',
};

export const viewport: Viewport = {
  themeColor: '#0f172a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(inter.variable, 'dark')} suppressHydrationWarning>
      <body className="antialiased bg-slate-950 text-slate-300">
        <LoadingScreenSpinner>
          <AuthProvider>
            <ConditionalHeader />
            {children}
            <ConditionalFooter />
            <Toaster />
          </AuthProvider>
        </LoadingScreenSpinner>
      </body>
    </html>
  );
}