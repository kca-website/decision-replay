import { useTranslation } from 'react-i18next';

interface InsightChartProps {
  averageConfidence: number;
  confirmedRate: number;
  count: number;
}

export const InsightChart = ({ averageConfidence, confirmedRate, count }: InsightChartProps) => {
  const { t } = useTranslation();
  const gap = averageConfidence - confirmedRate;
  const isOverconfident = gap > 5;
  const isUnderconfident = gap < -5;
  const isCalibrated = !isOverconfident && !isUnderconfident;

  const label = isCalibrated
    ? t('insights.calibrated')
    : isOverconfident
    ? t('insights.overconfident', { gap: Math.abs(gap) })
    : t('insights.underconfident', { gap: Math.abs(gap) });

  const barMax = Math.max(averageConfidence, confirmedRate, 1);
  const confWidth = (averageConfidence / 100) * 100;
  const accWidth = (confirmedRate / 100) * 100;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-xl">{t('insights.title')}</h3>
        <span className="text-xs text-ink-subtle">{t('insights.basedOn', { count })}</span>
      </div>

      {/* Visual bars */}
      <div className="space-y-3 mb-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-ink-muted">{t('insights.yourConfidence')}</span>
            <span className="font-medium tabular-nums">{averageConfidence}%</span>
          </div>
          <div className="h-6 bg-ink/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-warning rounded-full transition-all duration-700"
              style={{ width: `${confWidth}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-ink-muted">{t('insights.yourAccuracy')}</span>
            <span className="font-medium tabular-nums">{confirmedRate}%</span>
          </div>
          <div className="h-6 bg-ink/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-success rounded-full transition-all duration-700"
              style={{ width: `${accWidth}%` }}
            />
          </div>
        </div>
      </div>

      {/* Gap indicator */}
      <div className={`rounded-lg p-4 text-center ${
        isCalibrated ? 'bg-success/10' : isOverconfident ? 'bg-warning/15' : 'bg-info/10'
      }`}>
        <div className={`font-display text-3xl font-medium mb-1 ${
          isCalibrated ? 'text-success' : isOverconfident ? 'text-warning' : 'text-info'
        }`}>
          {isCalibrated ? '≈' : isOverconfident ? `+${gap}%` : `${gap}%`}
        </div>
        <p className="text-sm text-ink-muted">{label}</p>
      </div>

      {/* Shareable one-liner */}
      {count >= 3 && (
        <p className="text-xs text-ink-subtle text-center mt-3 italic">
          {t('insights.shareable', { confidence: averageConfidence, accuracy: confirmedRate, gap: Math.abs(gap) })}
        </p>
      )}
    </div>
  );
};
