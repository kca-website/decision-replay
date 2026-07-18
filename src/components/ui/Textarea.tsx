import { forwardRef, type TextareaHTMLAttributes } from 'react';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(({ invalid, className = '', ...props }, ref) => {
  const cls = `w-full px-3.5 py-3 border rounded-md bg-card text-ink text-[15px] leading-relaxed resize-y min-h-[96px] transition-colors focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 ${invalid ? 'border-danger' : ''} ${className}`;
  return <textarea ref={ref} className={cls} {...props} />;
});
Textarea.displayName = 'Textarea';
