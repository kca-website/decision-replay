import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLiveQuery } from 'dexie-react-hooks';
import { Plus, ChevronRight } from 'lucide-react';
import { db, computeDecisionStatus, type DecisionStatus } from '../db/db';
import { formatDate } from '../utils/date';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

type Filter = 'all' | DecisionStatus;

export const DecisionsList = () => {
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useState<Filter>('all');
  const decisions = useLiveQuery(() => db.decisions.orderBy('createdAt').reverse().toArray(), []) ?? [];
  const replays = useLiveQuery(() => db.replays.toArray(), []) ?? [];

  const enriched = useMemo(() => {
    const now = Date.now();
    return decisions.map((d) => ({
      d,
      status: computeDecisionStatus(d, replays.some((r) => r.decisionId === d.id), now),
    }));
  }, [decisions, replays]);

  const filtered = filter === 'all' ? enriched : enriched.filter((e) => e.status === filter);
  const filters: Filter[] = ['all', 'active', 'checkin', 'replay', 'completed'];

  return (
    <div className="container-app py-8 md:py-10">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="font-display text-3xl md:text-4xl">{t('list.title')}</h1>
        <Link to="/app/decisions/new" className="inline-flex items-center gap-2 bg-accent text-white text-[15px] px-6 py-3 rounded-md font-medium hover:bg-accent-hover transition-colors">
          <Plus size={16} /> {t('nav.newDecision')}
        </Link>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === f ? 'bg-ink text-app' : 'bg-subtle text-ink-muted hover:text-ink'
            }`}
          >
            {t(`list.filter${f.charAt(0).toUpperCase() + f.slice(1)}`)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card padding="lg" className="text-center py-16 text-ink-muted">
          {t('list.empty')}
        </Card>
      ) : (
        <Card padding="sm" className="!p-0 overflow-hidden">
          {filtered.map(({ d, status }, i) => (
            <Link
              key={d.id}
              to={`/app/decisions/${d.id}`}
              className={`flex items-center gap-4 px-5 py-4 hover:bg-app transition-colors ${i > 0 ? 'border-t' : ''}`}
            >
              <div className="flex-1 min-w-0">
                <div className="text-[15px] font-medium truncate">{d.title}</div>
                <div className="text-sm text-ink-muted mt-0.5">
                  {status === 'completed'
                    ? t('list.completedOn', { date: formatDate(replays.find((r) => r.decisionId === d.id)?.completedAt ?? d.replayDate, i18n.language) })
                    : t('list.replayOn', { date: formatDate(d.replayDate, i18n.language) })}
                </div>
              </div>
              <Badge variant={status}>{t(`list.status${status.charAt(0).toUpperCase() + status.slice(1)}`)}</Badge>
              <ChevronRight size={18} className="text-ink-subtle hidden md:block" />
            </Link>
          ))}
        </Card>
      )}
    </div>
  );
};
