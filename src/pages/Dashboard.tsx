import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLiveQuery } from 'dexie-react-hooks';
import { Plus, Info, ChevronRight, PlayCircle } from 'lucide-react';
import { db, computeDecisionStatus } from '../db/db';
import { computeCalibration } from '../utils/calibration';
import { formatDate, getTimeOfDayGreeting } from '../utils/date';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { buttonClasses } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { InsightChart } from '../components/ui/InsightChart';

export const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const decisions = useLiveQuery(() => db.decisions.toArray(), []) ?? [];
  const replays = useLiveQuery(() => db.replays.toArray(), []) ?? [];

  const enriched = useMemo(() => {
    const now = Date.now();
    return decisions.map((d) => ({
      d,
      status: computeDecisionStatus(d, replays.some((r) => r.decisionId === d.id), now),
    }));
  }, [decisions, replays]);

  const counts = {
    active: enriched.filter((e) => e.status === 'active').length,
    checkin: enriched.filter((e) => e.status === 'checkin').length,
    replay: enriched.filter((e) => e.status === 'replay').length,
    completed: enriched.filter((e) => e.status === 'completed').length,
  };

  const cal = computeCalibration(decisions, replays);
  const greetingKey = getTimeOfDayGreeting();
  const today = new Date().toLocaleDateString(i18n.language === 'el' ? 'el-GR' : 'en-US', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
  });

  const upcoming = enriched
    .filter((e) => e.status !== 'completed')
    .sort((a, b) => a.d.replayDate - b.d.replayDate)
    .slice(0, 5);

  const replayReady = enriched.find((e) => e.status === 'replay');

  if (decisions.length === 0) {
    return (
      <div className="container-app py-10 md:py-16 text-center max-w-2xl">
        <h1 className="font-display text-3xl md:text-4xl mb-3">{t('dashboard.emptyTitle')}</h1>
        <p className="text-ink-muted mb-8">{t('dashboard.emptyDesc')}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link to="/app/decisions/new" className="inline-flex items-center justify-center gap-2 bg-accent text-white text-base px-7 py-3.5 rounded-md font-medium hover:bg-accent-hover transition-colors">
            <Plus size={18} /> {t('nav.newDecision')}
          </Link>
          <Link to="/#demo" className="inline-flex items-center justify-center gap-2 bg-card border border-border-strong text-ink text-base px-7 py-3.5 rounded-md font-medium hover:bg-subtle transition-colors">
            <PlayCircle size={18} /> {t('landing.ctaDemo')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-app py-8 md:py-10">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl md:text-4xl">{t(`dashboard.${greetingKey}`)}</h1>
          <p className="text-ink-muted text-sm mt-1">{today}</p>
        </div>
        <Link to="/app/decisions/new" className="inline-flex items-center gap-2 bg-accent text-white text-[15px] px-6 py-3 rounded-md font-medium hover:bg-accent-hover transition-colors">
          <Plus size={16} /> {t('nav.newDecision')}
        </Link>
      </div>

      {replayReady && (
        <div className="bg-[#EDE4C7] border border-[#E1CFA0] rounded-lg p-4 md:p-5 mb-8 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="font-medium text-ink">{t('dashboard.alertReplayToday', { count: counts.replay })}</div>
            <div className="text-sm text-ink-muted mt-0.5">{replayReady.d.title}</div>
          </div>
          <Link to={`/app/decisions/${replayReady.d.id}/replay`} className={buttonClasses('primary', 'sm')}>
            {t('dashboard.startReplay')}
          </Link>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <KPI label={t('dashboard.kpiActive')} value={counts.active} />
        <KPI label={t('dashboard.kpiCheckin')} value={counts.checkin} />
        <KPI label={t('dashboard.kpiReplay')} value={counts.replay} />
        <KPI label={t('dashboard.kpiCompleted')} value={counts.completed} />
      </div>

      {/* Insight Statistics — the new calibration visualization */}
      {cal.count >= 2 && (
        <Card className="mb-8" padding="lg">
          <InsightChart
            averageConfidence={cal.averageConfidence}
            averageMatch={cal.averageMatch}
            count={cal.count}
          />
        </Card>
      )}

      {/* Simple calibration bars for early users */}
      {cal.count > 0 && cal.count < 2 && (
        <Card className="mb-8" padding="lg">
          <h3 className="font-display text-xl mb-1">{t('dashboard.calibrationTitle')}</h3>
          <p className="text-ink-muted text-sm mb-5">{t('dashboard.calibrationSub')}</p>
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="text-ink-muted">{t('dashboard.averageMatch')}</span>
            <span className="font-medium tabular-nums">{cal.averageMatch}%</span>
          </div>
          <ProgressBar value={cal.averageMatch} />
          <div className="flex justify-between items-center text-sm mt-5 mb-2">
            <span className="text-ink-muted">{t('dashboard.averageConfidence')}</span>
            <span className="font-medium tabular-nums">{cal.averageConfidence}%</span>
          </div>
          <ProgressBar value={cal.averageConfidence} color="warning" />
          <div className="mt-5 pt-4 border-t flex items-start gap-2 text-sm text-ink-muted">
            <Info size={16} className="flex-shrink-0 mt-0.5 text-ink-subtle" />
            {t('dashboard.calibrationNoData')}
          </div>
        </Card>
      )}

      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-xl md:text-2xl">{t('dashboard.nextDecisions')}</h3>
        <Link to="/app/decisions" className="text-sm text-ink-muted hover:text-ink">{t('dashboard.seeAll')} →</Link>
      </div>

      <Card padding="sm" className="!p-0 overflow-hidden">
        {upcoming.map(({ d, status }, i) => (
          <Link
            key={d.id}
            to={`/app/decisions/${d.id}`}
            className={`flex items-center gap-4 px-5 py-4 hover:bg-app transition-colors ${i > 0 ? 'border-t' : ''}`}
          >
            <div className="flex-1 min-w-0">
              <div className="text-[15px] font-medium truncate">{d.title}</div>
              <div className="text-sm text-ink-muted mt-0.5">
                {t('list.lockedOn', { date: formatDate(d.lockedAt, i18n.language) })} · {t('list.replayOn', { date: formatDate(d.replayDate, i18n.language) })}
              </div>
            </div>
            <Badge variant={status}>{t(`list.status${status.charAt(0).toUpperCase() + status.slice(1)}`)}</Badge>
            <ChevronRight size={18} className="text-ink-subtle hidden md:block" />
          </Link>
        ))}
      </Card>
    </div>
  );
};

const KPI = ({ label, value }: { label: string; value: number }) => (
  <div className="bg-card border rounded-lg p-5 shadow-xs">
    <div className="text-xs uppercase tracking-wider text-ink-muted font-medium mb-2">{label}</div>
    <div className="font-display text-3xl md:text-4xl font-medium tabular-nums leading-none">{value}</div>
  </div>
);
