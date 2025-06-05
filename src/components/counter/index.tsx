'use client';
import { useState, useEffect } from 'react';

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

interface ProgressCounterProps extends React.HTMLAttributes<HTMLSpanElement> {
  targetValue?: number;
  duration?: number;
}

const ProgressCounter = ({ targetValue = 0, duration = 2000, ...props }: ProgressCounterProps) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const currentCount = Math.floor(easedProgress * targetValue);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(targetValue);
      }
    };

    const animationId = requestAnimationFrame(updateCounter);

    return () => cancelAnimationFrame(animationId);
  }, [targetValue, duration]);

  return <span {...props}>{count}</span>;
};

export default ProgressCounter;
