'use client';

import { Phone, Calendar, FileText, HelpCircle, BarChart3, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';

const navigation = [
  { name: 'Dashboard', href: '/', icon: BarChart3 },
  { name: 'Call Logs', href: '/call-logs', icon: Phone },
  { name: 'Appointments', href: '/appointments', icon: Calendar },
  { name: 'Document Requests', href: '/document-requests', icon: FileText },
  { name: 'Open Questions', href: '/open-questions', icon: HelpCircle },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed inset-y-0 z-50 flex w-72 flex-col transform transition-transform duration-200 ease-in-out lg:translate-x-0 -translate-x-full lg:relative">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-border bg-card px-6 pb-4 shadow-lg">
        <div className="flex h-16 shrink-0 items-center">
          <Phone className="h-8 w-8 text-primary" />
          <span className="ml-2 text-lg font-semibold">AI Receptionist</span>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-1">
            <li>
              <ul role="list" className="-mx-2 space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-colors duration-200',
                        pathname === item.href
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      )}
                    >
                      <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <div className="mt-auto pt-4 border-t">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </div>
  );
}