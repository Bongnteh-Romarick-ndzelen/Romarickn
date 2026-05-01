'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/header';

const NO_HEADER_FOOTER_PATHS = [
  '/login',
  '/signup',
  '/verify-email',
  '/forgot-password',
  '/reset-password',
  '/auth',
  '/resend-verification',
  '/admin/dashboard',
];

export default function ConditionalHeader() {
  const pathname = usePathname();
  
  const normalizedPathname = pathname.replace(/\/$/, '');
  
  const shouldHide = NO_HEADER_FOOTER_PATHS.some(
    (path) => normalizedPathname === path || normalizedPathname.startsWith(path + '/')
  );

  if (shouldHide) {
    return null;
  }

  return <Header />;
}
