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
  '/admin/users',
  '/admin/settings',
  '/ai-assistance',
];

export default function ConditionalHeader() {
  const pathname = usePathname();
  
  const normalizedPathname = pathname.replace(/\/$/, '');
  
  const isBlogPost = normalizedPathname.startsWith('/blog/');
  
  const shouldHide = NO_HEADER_FOOTER_PATHS.some(
    (path) => normalizedPathname === path || normalizedPathname.startsWith(path + '/')
  ) || isBlogPost;

  if (shouldHide) {
    return null;
  }

  return <Header />;
}
