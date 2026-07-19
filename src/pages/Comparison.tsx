import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLiveQuery } from 'dexie-react-hooks';
import { AlertTriangle, ArrowLeft, Check, Share2, X } from 'lucide-react';
import { db, type DecisionReplay } from '../db/db';
import { getObservation } from '../utils/calibration';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { formatDate } from '../utils/date';
import { ShareCard } from '../components/ShareCard';

type ExpectationMatch = NonNullable<DecisionReplay['expectationMatch']>;

export const Comparison = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [lesson, setLesson] = useState('');
  const [saved, setSaved] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const decision = useLiveQuery(() => (id ? db.decisions.get(id) : undefined), [id]);
  const replay = useLiveQuery(() => (id ? db.replays.where('decisionId').equals(id).first() : undefined), [id]);

  useEffect(() => {
    if (replay?.lesson) {
      setLesson(replay.lesson);
      setSaved(true);
    }
  }, [replay?.lesson]);

  if (!decision || !replay) return <div className="container-app py-10 text-ink-muted">{t('common.loading')}</div>;

  const saveLesson = async () => {
    if (!lesson.trim()) return;
    await db.replays.update(replay.id, { lesson: lesson.trim() });
    setSaved(true);
  };

  const observations = getObservation(decision.confidence, replay.expectationMatch, t);
  const ratingLabels = ['ratingBad', 'ratingNeutral', 'ratingGood', 'ratingGreat'];
  const choice = decision.choice || decision.options[decision.choiceIndex];

  return (
    <div className="container-app py-6 md:py-10 max-w-5xl">
      <Link to={`/app/decisions/${decision.id}`} className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink mb-6">
        <ArrowLeft size={16} /> {decision.title}
      </Link>

      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.16em] text-accent font-semibold mb-2">{t('comparison.replayComplete')}</div>
          <h1 className="font-display text-3xl md:text-4xl">{t('comparison.title')}</h1>
        </div>
        <Button size="sm" variant="secondary" onClick={() => setShowShare(true)}>
          <Share2 size={14} /> {t('share.shareButton')}
        </Button>
      </div>

      <MatchSummary match={replay.expectationMatch} confidence={decision.confidence} />

      <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6">
        <Card padding="lg" className="bg-subtle">
          <div className="text-xs uppercase tracking-[0.18em] text-ink-muted font-semibold mb-1">{t('comparison.then')}</div>
          <div className="text-xs text-ink-subtle mb-6">{formatDate(decision.lockedAt, i18n.language)}</div>

          {choice && <Field label={t('comparison.decision')}>{choice}</Field>}
          <Field label={t('detail.reason')}>{decision.reason}</Field>
          <Field label={t('comparison.prediction')}>{decision.expected}</Field>
          <Field label={t('comparison.confidence')}>
            <span className="font-display text-3xl text-accent font-medium tabular-nums">{decision.confidence}%</span>
          </Field>
          {decision.successCriterion && <Field label={t('detail.success')}>{decision.successCriterion}</Field>}
          {decision.assumptions && <Field label={t('comparison.assumptions')}>{decision.assumptions}</Field>}
          {decision.risks && <Field label={t('comparison.risks')}>{decision.risks}</Field>}
        </Card>

        <Card padding="lg">
          <div className="text-xs uppercase tracking-[0.18em] text-accent font-semibold mb-1">{t('comparison.now')}</div>
          <div className="text-xs text-ink-subtle mb-6">{formatDate(replay.completedAt, i18n.language)}</div>

          <Field label={t('comparison.outcome')}>{replay.outcome}</Field>
          <Field label={t('comparison.predictionMatch')}>
            <MatchPill match={replay.expectationMatch} />
          </Field>
          <Field label={t('comparison.outcomeQuality')}>
            <div className="flex items-center gap-3">
              <span className="font-display text-2xl text-accent">{replay.rating}/4</span>
              <span>{t(`replay.${ratingLabels[replay.rating - 1]}`)}</span>
            </div>
          </Field>
          {replay.wentAsExpected && (
            <Field label={t('replay.wentAsExpected')}>
              <div className="flex items-start gap-2"><Check size={16} className="text-success mt-1 flex-shrink-0" /><span>{replay.wentAsExpected}</span></div>
            </Field>
          )}
          {replay.wentDifferent && (
            <Field label={t('replay.wentDifferent')}>
              <div className="flex items-start gap-2"><X size={16} className="text-danger mt-1 flex-shrink-0" /><span>{replay.wentDifferent}</span></div>
            </Field>
          )}
          {replay.unexpected && (
            <Field label={t('replay.unexpected')}>
              <div className="flex items-start gap-2"><AlertTriangle size={16} className="text-warning mt-1 flex-shrink-0" /><span>{replay.unexpected}</span></div>
            </Field>
          )}
          <Field label={t('replay.wouldRepeat')}>{t(`common.${replay.wouldRepeat}`)}</Field>
          {replay.whatChange && <Field label={t('replay.whatChange')}>{replay.whatChange}</Field>}
        </Card>
      </div>

      {observations.length > 0 && (
        <Card padding="md" className="mb-6 bg-accent-soft/30 !border-accent-soft">
          <div className="text-xs uppercase tracking-wider text-accent font-medium mb-2">{t('comparison.observationTitle')}</div>
          <ul className="space-y-2 text-ink">
            {observations.map((observation, index) => <li key={index}>• {observation}</li>)}
          </ul>
        </Card>
      )}

      <Card padding="lg">
        <div className="text-xs uppercase tracking-wider text-ink-muted font-medium mb-3">{t('comparison.lessonTitle')}</div>
        {saved ? (
          <>
            <p className="text-ink whitespace-pre-wrap mb-4">{lesson}</p>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="text-sm text-success font-medium">✓ {t('comparison.done')} — {t('comparison.doneSub')}</div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => setSaved(false)}>{t('common.edit')}</Button>
                <Button size="sm" variant="secondary" onClick={() => setShowShare(true)}>
                  <Share2 size={14} /> {t('share.shareButton')}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <textarea
              value={lesson}
              onChange={(event) => setLesson(event.target.value.slice(0, 280))}
              placeholder={t('comparison.lessonPlaceholder')}
              className="w-full px-3.5 py-3 border rounded-md bg-card text-[15px] focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 min-h-[96px]"
              maxLength={280}
              aria-label={t('comparison.lessonTitle')}
            />
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-ink-subtle">{lesson.length}/280</span>
              <Button onClick={saveLesson} disabled={!lesson.trim()}>{t('comparison.saveLesson')}</Button>
            </div>
          </>
        )}
      </Card>

      <ShareCard decision={decision} replay={replay} open={showShare} onClose={() => setShowShare(false)} />
    </div>
  );
};

const MatchSummary = ({ match, confidence }: { match: DecisionReplay['expectationMatch']; confidence: number }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-card border rounded-xl p-5 md:p-6 mb-6 flex items-center justify-between gap-5 flex-wrap">
      <div>
        <div className="text-xs uppercase tracking-wider text-ink-muted font-medium mb-2">{t('comparison.keyResult')}</div>
        <MatchPill match={match} large />
      </div>
      <div className="sm:text-right">
        <div className="text-xs text-ink-muted mb-1">{t('comparison.originalConfidence')}</div>
        <div className="font-display text-3xl text-accent font-medium">{confidence}%</div>
      </div>
    </div>
  );
};

const MatchPill = ({ match, large = false }: { match: DecisionReplay['expectationMatch']; large?: boolean }) => {
  const { t } = useTranslation();
  const value = match as ExpectationMatch | undefined;
  const styles: Record<ExpectationMatch, string> = {
    yes: 'bg-success/10 text-success border-success/30',
    partial: 'bg-warning/10 text-warning border-warning/30',
    no: 'bg-danger/10 text-danger border-danger/30',
  };
  if (!value) return <span className="text-sm text-ink-muted">{t('comparison.matchNotRecorded')}</span>;
  return (
    <span className={`inline-flex items-center border rounded-full font-medium ${large ? 'px-4 py-2 text-base' : 'px-3 py-1 text-sm'} ${styles[value]}`}>
      {t(`replay.match${value === 'yes' ? 'Yes' : value === 'partial' ? 'Partial' : 'No'}`)}
    </span>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="mb-5 last:mb-0">
    <div className="text-[13px] text-ink-muted mb-1.5 font-medium">{label}</div>
    <div className="text-ink whitespace-pre-wrap leading-relaxed">{children}</div>
  </div>
);
