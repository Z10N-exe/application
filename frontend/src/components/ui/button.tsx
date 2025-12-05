import { cn } from '../../lib/cn.js';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

export function Button({ className, children, ...props }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className={cn('inline-flex items-center justify-center rounded-full px-5 py-3 bg-black text-white hover:bg-neutral-800 transition disabled:opacity-50', className)}
      {...props}
    >
      {children}
    </button>
  );
}

