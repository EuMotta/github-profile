import { useSearchParams } from 'next/navigation';
import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const cardVariants = cva('', {
  variants: {
    variant: {
      default: 'rounded-lg border bg-card text-card-foreground shadow-sm',
      bald: 'transform-gpu space-y-3 rounded-xl border bg-transparent p-4 [box-shadow:0_-20px_80px_-20px_hsla(var(--primary)_/_0.2)_inset]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: VariantProps<typeof cardVariants>['variant'];
};

const GitCard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => {
    const effectiveVariant = variant || 'default';
    const classes = cn(cardVariants({ variant: effectiveVariant, className }));

    return <div ref={ref} className={classes} {...props} />;
  },
);
GitCard.displayName = 'Card';

const GitCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  ),
);
GitCardHeader.displayName = 'CardHeader';

const GitCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
GitCardTitle.displayName = 'CardTitle';

const GitCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));
GitCardDescription.displayName = 'CardDescription';

const GitCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  ),
);
GitCardContent.displayName = 'CardContent';

const GitCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  ),
);
GitCardFooter.displayName = 'CardFooter';

export { GitCard, GitCardHeader, GitCardFooter, GitCardTitle, GitCardDescription, GitCardContent };
