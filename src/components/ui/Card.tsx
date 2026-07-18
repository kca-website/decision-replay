import type { ReactNode, HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: 'sm' | 'md' | 'lg';
}

const padClasses = { sm: 'p-4', md: 'p-6', lg: 'p-8' };

export const Card = ({ children, padding = 'md', className = '', ...props }: Props) => (
  <div className={`bg-card border rounded-lg shadow-xs ${padClasses[padding]} ${className}`} {...props}>
    {children}
  </div>
);
