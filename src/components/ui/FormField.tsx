import type { ReactNode } from 'react';

interface Props {
  label: string;
  helper?: string;
  required?: boolean;
  children: ReactNode;
  error?: string;
  htmlFor?: string;
}

export const FormField = ({ label, helper, required, children, error, htmlFor }: Props) => (
  <div className="mb-6">
    <label htmlFor={htmlFor} className="block text-[15px] font-medium text-ink mb-2">
      {label}
      {required && <span className="text-accent ml-1" aria-hidden="true">*</span>}
    </label>
    {helper && <div className="text-sm text-ink-muted mb-3">{helper}</div>}
    {children}
    {error && <div className="text-sm text-danger mt-2" role="alert">{error}</div>}
  </div>
);
