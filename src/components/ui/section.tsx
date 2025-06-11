import { useSearchParams } from 'next/navigation';
import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { HTMLMotionProps, motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from './badge';

const cardVariants = cva('container relative z-10 mx-auto max-w-6xl px-4 md:px-6', {
  variants: {
    variant: {
      default: '',
      bald: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: VariantProps<typeof cardVariants>['variant'];
};

const Section = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => {
    const effectiveVariant = variant || 'default';
    const classes = cn(cardVariants({ variant: effectiveVariant, className }));

    return <div ref={ref} className={classes} {...props} />;
  },
);
Section.displayName = 'Section';

const SectionHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mx-auto mb-16 max-w-3xl text-center', className)} {...props} />
  ),
);
SectionHeader.displayName = 'SectionHeader';

type SectionTitleProps = HTMLMotionProps<'h1'>;

const SectionTitle = React.forwardRef<HTMLHeadingElement, SectionTitleProps>(
  ({ className, ...props }, ref) => (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
      ref={ref}
      className={cn('text-gradient text-4xl font-bold tracking-tight sm:text-5xl', className)}
      {...props}
    />
  ),
);

SectionTitle.displayName = 'SectionTitle';

type SectionSubTitleProps = HTMLMotionProps<'p'>;

const SectionSubTitle = React.forwardRef<HTMLParagraphElement, SectionSubTitleProps>(
  ({ className, ...props }, ref) => (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      ref={ref}
      className={cn('text-xl text-muted-foreground', className)}
      {...props}
    />
  ),
);

SectionSubTitle.displayName = 'SectionSubTitle';

type SectionBadgeProps = React.ComponentPropsWithRef<typeof Badge>;

const SectionBadge = React.forwardRef<HTMLSpanElement, SectionBadgeProps>(
  ({ className, variant = 'custom', ...props }, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn('mb-4 flex justify-center', className)}
        ref={ref as any}
      >
        <Badge variant={variant} {...props} />
      </motion.div>
    );
  },
);

SectionBadge.displayName = 'SectionBadge';

const SectionContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-2 pt-0', className)} {...props} />
  ),
);
SectionContent.displayName = 'SectionContent';

export { Section, SectionHeader, SectionBadge, SectionTitle, SectionSubTitle, SectionContent };
