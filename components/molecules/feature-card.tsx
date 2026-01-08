import { IconBadge } from '@/components/atoms/icon-badge';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  variant?: 'blue' | 'purple' | 'green';
}

export function FeatureCard({ icon, title, description, variant = 'blue' }: FeatureCardProps) {
  return (
    <div className="bg-white dark:bg-card-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-start h-full hover:shadow-md transition-shadow">
      <IconBadge icon={icon} variant={variant} className="mb-4" />
      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}
