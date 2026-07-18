import type { ReactNode } from 'react';

type Variant = 'active' | 'checkin' | 'replay' | 'completed';

interface Props { variant: Variant; children: ReactNode; }

const cls: Record<Variant, string> = {
  active: 'bg-accent-soft text-accent',
  checkin: 'bg-[#DDE7EF] text-[#3E5C73]',
  replay: 'bg-[#EDE4C7] text-[#8B6B1E]',
  completed: 'bg-[#DFE7CE] text-[#4E6B2E]',
};

export const Badge = ({ variant, children }: Props) => (
  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${cls[variant]}`}>
    {children}
  </span>
);
