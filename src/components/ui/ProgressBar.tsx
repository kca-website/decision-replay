interface Props {
  value: number;
  max?: number;
  color?: 'accent' | 'success' | 'warning';
}

const colors = {
  accent: 'bg-accent',
  success: 'bg-success',
  warning: 'bg-warning',
};

export const ProgressBar = ({ value, max = 100, color = 'accent' }: Props) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="h-2 bg-subtle rounded-full overflow-hidden">
      <div
        className={`h-full ${colors[color]} rounded-full transition-all duration-500`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
};
