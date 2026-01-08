import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconBadgeProps {
  icon: LucideIcon;
  variant?: 'blue' | 'purple' | 'green' | 'orange';
  className?: string;
}

const variants = {
  blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
};

export function IconBadge({ icon: Icon, variant = 'blue', className }: IconBadgeProps) {
  return (
    <div className={cn("flex items-center justify-center w-12 h-12 rounded-full", variants[variant], className)}>
      <Icon className="w-6 h-6" />
    </div>
  );
}
