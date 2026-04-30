
'use client';
import Link from 'next/link';
import { FileText, Settings, BarChart2, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

const navItems = [
  { href: '/dashboard/posts', label: 'Posts', icon: FileText },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-slate-900 border-r border-slate-800 md:translate-x-0" aria-label="Sidebar">
      <div className="overflow-y-auto py-5 px-3 h-full flex flex-col">
        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center p-3 rounded-lg transition-colors text-slate-300',
                    pathname.startsWith(item.href)
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-slate-800 hover:text-white'
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto">
           <Link href="/" passHref>
             <Button variant="outline" className="w-full border-slate-700 text-white hover:bg-slate-800">
                <Home className="mr-2 h-4 w-4" />
                Back to Site
             </Button>
           </Link>
        </div>
      </div>
    </aside>
  );
}
