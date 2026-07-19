import { useTranslation } from 'react-i18next';

interface InsightChartProps {
  averageConfidence: number;
  averageMatch: number;
  count: number;
}

export const InsightChart = ({ averageConfidence, averageMatch, count }: InsightChartProps) => {
  const { t } = useTranslation();
  const gap = averageConfidence - averageMatch;
  const isOverconfident = gap > 10;
  const isUnderconfident = gap < -10;
  const isAligned = !isOverconfident && !isUnderconfident;

  const label = isAligned
    ? t('insights.aligned')
    : isOverconfident
      ? t('insights.overconfident', { gap: Math.abs(gap) })
      : t('insights.underconfident', { gap: Math.abs(gap) });

  return (
    <div>
      <div className="flex items-start justify-between mb-5 gap-4">
        <div>
          <h3 className="font-display text-xl">{t('insights.title')}</h3>
          <p className="text-sm text-ink-muted mt-1">{t('insights.subtitle')}</p>
        </div>
        <span className="text-xs text-ink-subtle whitespace-nowrap">{t('insights.basedOn', { count })}</span>
      </div>

      <div className="space-y-4 mb-5">
        <MetricBar label={t('insights.yourConfidence')} value={averageConfidence} barClass="bg-warning" />
        <MetricBar label={t('insights.predictionMatch')} value={averageMatch} barClass="bg-success" />
      </div>

      <div className={`rounded-lg p-4 text-center ${
        isAligned ? 'bg-success/10' : isOverconfident ? 'bg-warning/15' : 'bg-accent-soft/50'
      }`}>
        <div className={`font-display text-3xl font-medium mb-1 ${
          isAligned ? 'text-success' : isOverconfident ? 'text-warning' : 'text-accent'
        }`}>
          {isAligned ? '≈' : isOverconfident ? `+${gap}%` : `${gap}%`}
        </div>
        <p className="text-sm text-ink-muted">{label}</p>
      </div>

      {count < 5 && <p className="text-xs text-ink-subtle text-center mt-3">{t('insights.earlyData')}</p>}
    </div>
  );
};

const MetricBar = ({ label, value, barClass }: { label: string; value: number; barClass: string }) => (
  <div>
    <div className="flex justify-between text-sm mb-1.5">
      <span className="text-ink-muted">{label}</span>
      <span className="font-medium tabular-nums">{value}%</span>
    </div>
    <div className="h-3 bg-ink/5 rounded-full overflow-hidden" aria-hidden="true">
      <div className={`h-full rounded-full transition-all duration-700 ${barClass}`} style={{ width: `${value}%` }} />
    </div>
  </div>
);
