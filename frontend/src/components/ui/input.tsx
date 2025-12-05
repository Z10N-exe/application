import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn('w-full rounded-md border border-neutral-200 bg-white placeholder:text-neutral-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black', className)}
      {...props}
    />
  );
});

