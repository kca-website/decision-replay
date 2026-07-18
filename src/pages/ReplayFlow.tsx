import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLiveQuery } from 'dexie-react-hooks';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { db, genId } from '../db/db';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { FormField } from '../components/ui/FormField';
import { formatDate } from '../utils/date';

type Rating = 1 | 2 | 3 | 4;
type Would = 'yes' | 'no' | 'maybe';

export const ReplayFlow = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const nav = useNavigate();

  const decision = useLiveQuery(() => (id ? db.decisions.get(id) : undefined), [id]);

  const [step, setStep] = useState<1 | 2>(1);
  const [outcome, setOutcome] = useState('');
  const [rating, setRating] = useState<Rating | null>(null);
  const [wentAsExpected, setWentAsExpected] = useState('');
  const [wentDifferent, setWentDifferent] = useState('');
  const [unexpected, setUnexpected] = useState('');
  const [wouldRepeat, setWouldRepeat] = useState<Would | null>(null);
  const [whatChange, setWhatChange] = useState('');

  if (!decision) return <div className="container-app py-10 text-ink-muted">{t('common.loading')}</div>;

  const save = async () => {
    if (!rating || !wouldRepeat) return;
    await db.replays.add({
      id: genId(),
      decisionId: decision.id,
      completedAt: Date.now(),
      outcome: outcome.trim(),
      rating,
      wentAsExpected: wentAsExpected.trim() || undefined,
      wentDifferent: wentDifferent.trim() || undefined,
      unexpected: unexpected.trim() || undefined,
      wouldRepeat,
      whatChange: whatChange.trim() || undefined,
    });
    nav(`/app/decisions/${decision.id}/compare`);
  };

  return (
    <div className="container-app py-6 md:py-10 max-w-3xl">
      <Link to={`/app/decisions/${decision.id}`} className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink mb-6">
        <ArrowLeft size={16} /> {decision.title}
      </Link>

      <div className="text-xs text-ink-subtle mb-6">
        {t('replay.step', { n: step })} · {t('replay.since', { lockDate: formatDate(decision.lockedAt, i18n.language), today: formatDate(Date.now(), i18n.language) })}
      </div>

      <div className="bg-card border rounded-xl shadow-sm p-6 md:p-10">
        <h2 className="font-display text-2xl md:text-3xl mb-6">
          {step === 1 ? t('replay.step1Title') : t('replay.step2Title')}
        </h2>

        {step === 1 && (
          <>
            <FormField label={t('replay.outcome')} required>
              <Textarea value={outcome} onChange={(e) => setOutcome(e.target.value)} />
            </FormField>

            <FormField label={t('replay.outcomeRating')} required>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {([1, 2, 3, 4] as Rating[]).map((r) => {
                  const labels = ['ratingBad', 'ratingNeutral', 'ratingGood', 'ratingGreat'];
                  const emojis = ['😞', '😐', '🙂', '😄'];
                  const active = rating === r;
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRating(r)}
                      className={`p-4 border-2 rounded-md text-center transition-all ${
                        active ? 'border-accent bg-accent-soft/40' : 'border-border hover:border-border-strong'
                      }`}
                    >
                      <div className="text-2xl mb-1">{emojis[r - 1]}</div>
                      <div className="text-sm">{t(`replay.${labels[r - 1]}`)}</div>
                    </button>
                  );
                })}
              </div>
            </FormField>

            <FormField label={t('replay.wentAsExpected')}>
              <Textarea value={wentAsExpected} onChange={(e) => setWentAsExpected(e.target.value)} />
            </FormField>
            <FormField label={t('replay.wentDifferent')}>
              <Textarea value={wentDifferent} onChange={(e) => setWentDifferent(e.target.value)} />
            </FormField>
            <FormField label={t('replay.unexpected')}>
              <Input value={unexpected} onChange={(e) => setUnexpected(e.target.value)} />
            </FormField>

            <div className="flex justify-end mt-8 pt-6 border-t">
              <Button onClick={() => setStep(2)} disabled={!outcome.trim() || !rating}>
                {t('common.next')} <ArrowRight size={16} />
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <FormField label={t('replay.wouldRepeat')} required>
              <div className="grid grid-cols-3 gap-2">
                {(['yes', 'no', 'maybe'] as Would[]).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setWouldRepeat(v)}
                    className={`p-4 border-2 rounded-md text-center transition-all ${
                      wouldRepeat === v ? 'border-accent bg-accent-soft/40' : 'border-border hover:border-border-strong'
                    }`}
                  >
                    {t(`common.${v}`)}
                  </button>
                ))}
              </div>
            </FormField>

            <FormField label={t('replay.whatChange')}>
              <Textarea value={whatChange} onChange={(e) => setWhatChange(e.target.value)} />
            </FormField>

            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button variant="ghost" onClick={() => setStep(1)}>{t('common.back')}</Button>
              <Button onClick={save} disabled={!wouldRepeat}>{t('replay.seeComparison')} →</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
