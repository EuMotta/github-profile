import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gradient-to-r from-primary/50 to-secondary/50',
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
