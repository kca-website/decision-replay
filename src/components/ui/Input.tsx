import { forwardRef, type InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, Props>(({ invalid, className = '', ...props }, ref) => {
  const cls = `w-full px-3.5 py-3 border rounded-md bg-card text-ink text-[15px] transition-colors focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 ${invalid ? 'border-danger' : ''} ${className}`;
  return <input ref={ref} className={cls} {...props} />;
});
Input.displayName = 'Input';
