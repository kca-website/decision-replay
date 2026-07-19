import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-white hover:bg-accent-hover',
  secondary: 'bg-card text-ink border border-border-strong hover:bg-subtle',
  ghost: 'bg-transparent text-ink-muted hover:text-ink',
  danger: 'bg-card text-danger border border-danger hover:bg-danger hover:text-white',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'text-sm px-3.5 py-1.5 rounded-md',
  md: 'text-[15px] px-6 py-3 rounded-md font-medium',
  lg: 'text-base px-7 py-3.5 rounded-md font-medium',
};

export const buttonClasses = (variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className = ''): string =>
  `inline-flex items-center justify-center gap-2 transition-all duration-100 ease-out disabled:opacity-40 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

export const Button = forwardRef<HTMLButtonElement, Props>(({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
  const cls = buttonClasses(variant, size, className);
  return <button ref={ref} className={cls} {...props}>{children}</button>;
});
Button.displayName = 'Button';
