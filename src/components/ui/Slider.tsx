import type { ChangeEvent } from 'react';

interface Props {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  hint?: string;
}

export const Slider = ({ value, onChange, min = 0, max = 100, hint }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value));
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="font-display text-4xl md:text-5xl text-accent font-medium tabular-nums leading-none">
        {value}%
      </div>
      {hint && <div className="text-sm text-ink-muted mt-1 mb-5">{hint}</div>}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        style={{ '--val': `${pct}%`, width: '100%' } as React.CSSProperties}
        aria-label="Confidence"
      />
      <div className="flex justify-between text-xs text-ink-muted mt-2">
        <span>0%</span>
        <span>100%</span>
      </div>
    </div>
  );
};
