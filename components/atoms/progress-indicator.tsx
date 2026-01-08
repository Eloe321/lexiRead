import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  total: number;
  current: number;
  className?: string;
}

export function ProgressIndicator({ total, current, className }: ProgressIndicatorProps) {
  return (
    <div className={cn("flex gap-2", className)}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-1.5 rounded-full transition-all duration-300",
            i <= current ? "w-8 bg-blue-500" : "w-4 bg-gray-200 dark:bg-gray-700"
          )}
        />
      ))}
    </div>
  );
}
