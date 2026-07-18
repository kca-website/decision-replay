import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLiveQuery } from 'dexie-react-hooks';
import { ArrowLeft, Check, X, AlertTriangle } from 'lucide-react';
import { db } from '../db/db';
import { getObservation } from '../utils/calibration';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { formatDate } from '../utils/date';

export const Comparison = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [lesson, setLesson] = useState('');
  const [saved, setSaved] = useState(false);

  const decision = useLiveQuery(() => (id ? db.decisions.get(id) : undefined), [id]);
  const replay = useLiveQuery(() => (id ? db.replays.where('decisionId').equals(id).first() : undefined), [id]);

  if (!decision || !replay) return <div className="container-app py-10 text-ink-muted">{t('common.loading')}</div>;

  const saveLesson = async () => {
    if (!lesson.trim()) return;
    await db.replays.update(replay.id, { lesson: lesson.trim() });
    setSaved(true);
  };

  const observations = getObservation(decision.confidence, replay.rating, !!decision.risks, t);
  const ratingLabels = ['ratingBad', 'ratingNeutral', 'ratingGood', 'ratingGreat'];
  const ratingEmojis = ['😞', '😐', '🙂', '😄'];

  return (
    <div className="container-app py-6 md:py-10 max-w-4xl">
      <Link to={`/app/decisions/${decision.id}`} className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink mb-6">
        <ArrowLeft size={16} /> {decision.title}
      </Link>

      <h1 className="font-display text-3xl md:text-4xl mb-8">{t('comparison.title')}</h1>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <Card padding="lg" className="bg-subtle">
          <div className="text-xs uppercase tracking-wider text-ink-muted font-medium mb-4">
            {t('comparison.then')} · {formatDate(decision.lockedAt, i18n.language)}
          </div>
          {decision.options.length > 0 && (
            <Field label={t('detail.options')}>
              {decision.options.map((o, i) => (
                <div key={i} className={i === decision.choiceIndex ? 'font-medium' : 'text-ink-muted'}>
                  {i === decision.choiceIndex && '✓ '}{o}
                </div>
              ))}
            </Field>
          )}
          <Field label={t('comparison.prediction')}>{decision.expected}</Field>
          <Field label={t('comparison.confidence')}>
            <span className="font-display text-2xl text-accent font-medium tabular-nums">{decision.confidence}%</span>
          </Field>
          {decision.assumptions && <Field label={t('comparison.assumptions')}>{decision.assumptions}</Field>}
          {decision.risks && <Field label={t('comparison.risks')}>{decision.risks}</Field>}
        </Card>

        <Card padding="lg">
          <div className="text-xs uppercase tracking-wider text-accent font-medium mb-4">
            {t('comparison.now')} · {formatDate(replay.completedAt, i18n.language)}
          </div>
          <Field label={t('comparison.outcome')}>{replay.outcome}</Field>
          <Field label={t('comparison.rating')}>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{ratingEmojis[replay.rating - 1]}</span>
              <span>{t(`replay.${ratingLabels[replay.rating - 1]}`)}</span>
            </div>
          </Field>
          {replay.wentAsExpected && (
            <Field label={t('replay.wentAsExpected')}>
              <div className="flex items-start gap-2">
                <Check size={16} className="text-success mt-1 flex-shrink-0" />
                <span>{replay.wentAsExpected}</span>
              </div>
            </Field>
          )}
          {replay.wentDifferent && (
            <Field label={t('replay.wentDifferent')}>
              <div className="flex items-start gap-2">
                <X size={16} className="text-danger mt-1 flex-shrink-0" />
                <span>{replay.wentDifferent}</span>
              </div>
            </Field>
          )}
          {replay.unexpected && (
            <Field label={t('replay.unexpected')}>
              <div className="flex items-start gap-2">
                <AlertTriangle size={16} className="text-warning mt-1 flex-shrink-0" />
                <span>{replay.unexpected}</span>
              </div>
            </Field>
          )}
        </Card>
      </div>

      {observations.length > 0 && (
        <Card padding="md" className="mb-6 bg-accent-soft/30 !border-accent-soft">
          <div className="text-xs uppercase tracking-wider text-accent font-medium mb-2">{t('comparison.observationTitle')}</div>
          <ul className="space-y-2 text-ink">
            {observations.map((obs, i) => <li key={i}>• {obs}</li>)}
          </ul>
        </Card>
      )}

      <Card padding="lg">
        <div className="text-xs uppercase tracking-wider text-ink-muted font-medium mb-3">{t('comparison.lessonTitle')}</div>
        {saved ? (
          <>
            <p className="text-ink whitespace-pre-wrap mb-4">{replay.lesson || lesson}</p>
            <div className="text-sm text-success font-medium">✓ {t('comparison.done')} — {t('comparison.doneSub')}</div>
          </>
        ) : (
          <>
            <textarea
              value={lesson}
              onChange={(e) => setLesson(e.target.value.slice(0, 280))}
              placeholder={t('comparison.lessonPlaceholder')}
              className="w-full px-3.5 py-3 border rounded-md bg-card text-[15px] focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 min-h-[80px]"
              maxLength={280}
            />
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-ink-subtle">{lesson.length}/280</span>
              <Button onClick={saveLesson} disabled={!lesson.trim()}>{t('comparison.saveLesson')}</Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="mb-4 last:mb-0">
    <div className="text-[13px] text-ink-muted mb-1 font-medium">{label}</div>
    <div className="text-ink">{children}</div>
  </div>
);
