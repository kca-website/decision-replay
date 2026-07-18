import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-accent text-white hover:bg-accent-hover',
  secondary: 'bg-card text-ink border border-border-strong hover:bg-subtle',
  ghost: 'bg-transparent text-ink-muted hover:text-ink',
  danger: 'bg-card text-danger border border-danger hover:bg-danger hover:text-white',
};

const sizeClasses: Record<Size, string> = {
  sm: 'text-sm px-3.5 py-1.5 rounded-md',
  md: 'text-[15px] px-6 py-3 rounded-md font-medium',
  lg: 'text-base px-7 py-3.5 rounded-md font-medium',
};

export const Button = forwardRef<HTMLButtonElement, Props>(({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
  const cls = `inline-flex items-center justify-center gap-2 transition-all duration-100 ease-out disabled:opacity-40 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  return <button ref={ref} className={cls} {...props}>{children}</button>;
});
Button.displayName = 'Button';
