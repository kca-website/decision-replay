import { useEffect, useId, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export const Modal = ({ open, onClose, title, children }: Props) => {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => panelRef.current?.focus());
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
      previous?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50" onMouseDown={onClose}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        className="bg-card rounded-xl shadow-lg max-w-md w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto outline-none"
        onMouseDown={(event) => event.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between mb-4 gap-4">
            <h3 id={titleId} className="font-display text-xl font-medium">{title}</h3>
            <button onClick={onClose} aria-label="Close" className="text-ink-subtle hover:text-ink p-1">
              <X size={20} />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
