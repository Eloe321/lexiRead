import { Button } from '@/components/ui/button';
import { ChevronLeft, HelpCircle, User } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  userName?: string;
  status?: 'online' | 'offline';
}

export function Header({ title, showBack, userName, status }: HeaderProps) {
  return (
    <header className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBack && (
            <Button variant="ghost" size="icon" className="rounded-full">
              <ChevronLeft className="w-6 h-6" />
            </Button>
          )}
          {title && <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">{title}</h1>}
          {userName && (
             <div className="flex items-center gap-3">
               <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                  <User className="w-5 h-5 text-blue-600 dark:text-blue-400"/>
               </div>
               <div>
                 <p className="text-sm font-bold leading-none">{userName}</p>
                 {status && (
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                      <span className="text-xs text-gray-500 capitalize">{status}</span>
                    </div>
                 )}
               </div>
             </div>
          )}
        </div>
        
        <Button variant="ghost" size="icon" className="rounded-full text-gray-500">
          <HelpCircle className="w-6 h-6" />
        </Button>
      </div>
    </header>
  );
}
