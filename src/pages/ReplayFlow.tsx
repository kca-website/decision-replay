import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLiveQuery } from 'dexie-react-hooks';
import { ArrowLeft, ArrowRight, CheckCircle2, CircleDashed, EyeOff, XCircle } from 'lucide-react';
import { db, genId, type DecisionReplay } from '../db/db';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { FormField } from '../components/ui/FormField';
import { formatDate } from '../utils/date';

type Rating = 1 | 2 | 3 | 4;
type WouldRepeat = 'yes' | 'no' | 'maybe';
type ExpectationMatch = NonNullable<DecisionReplay['expectationMatch']>;

export const ReplayFlow = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const decision = useLiveQuery(() => (id ? db.decisions.get(id) : undefined), [id]);

  const [step, setStep] = useState<1 | 2>(1);
  const [outcome, setOutcome] = useState('');
  const [expectationMatch, setExpectationMatch] = useState<ExpectationMatch | null>(null);
  const [rating, setRating] = useState<Rating | null>(null);
  const [wentAsExpected, setWentAsExpected] = useState('');
  const [wentDifferent, setWentDifferent] = useState('');
  const [unexpected, setUnexpected] = useState('');
  const [wouldRepeat, setWouldRepeat] = useState<WouldRepeat | null>(null);
  const [whatChange, setWhatChange] = useState('');

  if (!decision) return <div className="container-app py-10 text-ink-muted">{t('common.loading')}</div>;

  const save = async () => {
    if (!expectationMatch || !rating || !wouldRepeat) return;
    await db.replays.add({
      id: genId(),
      decisionId: decision.id,
      completedAt: Date.now(),
      outcome: outcome.trim(),
      expectationMatch,
      rating,
      wentAsExpected: wentAsExpected.trim() || undefined,
      wentDifferent: wentDifferent.trim() || undefined,
      unexpected: unexpected.trim() || undefined,
      wouldRepeat,
      whatChange: whatChange.trim() || undefined,
    });
    navigate(`/app/decisions/${decision.id}/compare`);
  };

  return (
    <div className="container-app py-6 md:py-10 max-w-3xl">
      <Link to={`/app/decisions/${decision.id}`} className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink mb-6">
        <ArrowLeft size={16} /> {decision.title}
      </Link>

      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="text-xs text-ink-subtle">
          {t('replay.step', { n: step })} · {t('replay.since', {
            lockDate: formatDate(decision.lockedAt, i18n.language),
            today: formatDate(Date.now(), i18n.language),
          })}
        </div>
        <div className="flex gap-1.5" aria-hidden="true">
          {[1, 2].map((number) => <div key={number} className={`w-8 h-1 rounded-full ${number === step ? 'bg-accent' : number < step ? 'bg-success' : 'bg-border'}`} />)}
        </div>
      </div>

      <div className="bg-card border rounded-xl shadow-sm p-6 md:p-10">
        <div className="flex items-start gap-3 p-4 bg-subtle rounded-lg mb-8 text-sm text-ink-muted">
          <EyeOff size={18} className="text-accent flex-shrink-0 mt-0.5" />
          <p>{t('replay.noHindsight')}</p>
        </div>

        <h1 className="font-display text-3xl md:text-4xl mb-3">
          {step === 1 ? t('replay.step1Title') : t('replay.step2Title')}
        </h1>
        <p className="text-ink-muted mb-8">{step === 1 ? t('replay.step1Sub') : t('replay.step2Sub')}</p>

        {step === 1 && (
          <>
            <FormField htmlFor="actual-outcome" label={t('replay.outcome')} required>
              <Textarea id="actual-outcome" value={outcome} onChange={(event) => setOutcome(event.target.value)} placeholder={t('replay.outcomePlaceholder')} />
            </FormField>

            <FormField label={t('replay.expectationMatch')} helper={t('replay.expectationMatchHelper')} required>
              <div className="grid sm:grid-cols-3 gap-2">
                <ChoiceButton
                  active={expectationMatch === 'yes'}
                  onClick={() => setExpectationMatch('yes')}
                  icon={<CheckCircle2 size={20} />}
                  label={t('replay.matchYes')}
                />
                <ChoiceButton
                  active={expectationMatch === 'partial'}
                  onClick={() => setExpectationMatch('partial')}
                  icon={<CircleDashed size={20} />}
                  label={t('replay.matchPartial')}
                />
                <ChoiceButton
                  active={expectationMatch === 'no'}
                  onClick={() => setExpectationMatch('no')}
                  icon={<XCircle size={20} />}
                  label={t('replay.matchNo')}
                />
              </div>
            </FormField>

            <FormField label={t('replay.outcomeRating')} helper={t('replay.outcomeRatingHelper')} required>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {([1, 2, 3, 4] as Rating[]).map((value) => {
                  const labels = ['ratingBad', 'ratingNeutral', 'ratingGood', 'ratingGreat'];
                  const active = rating === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRating(value)}
                      aria-pressed={active}
                      className={`p-4 border-2 rounded-md text-center transition-all ${
                        active ? 'border-accent bg-accent-soft/40' : 'border-border hover:border-border-strong'
                      }`}
                    >
                      <div className="font-display text-2xl text-accent mb-1">{value}/4</div>
                      <div className="text-sm">{t(`replay.${labels[value - 1]}`)}</div>
                    </button>
                  );
                })}
              </div>
            </FormField>

            <div className="flex justify-end mt-8 pt-6 border-t">
              <Button onClick={() => setStep(2)} disabled={!outcome.trim() || !expectationMatch || !rating}>
                {t('common.next')} <ArrowRight size={16} />
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <FormField htmlFor="went-expected" label={t('replay.wentAsExpected')}>
              <Textarea id="went-expected" value={wentAsExpected} onChange={(event) => setWentAsExpected(event.target.value)} />
            </FormField>
            <FormField htmlFor="went-different" label={t('replay.wentDifferent')}>
              <Textarea id="went-different" value={wentDifferent} onChange={(event) => setWentDifferent(event.target.value)} />
            </FormField>
            <FormField htmlFor="unexpected" label={t('replay.unexpected')}>
              <Input id="unexpected" value={unexpected} onChange={(event) => setUnexpected(event.target.value)} />
            </FormField>

            <FormField label={t('replay.wouldRepeat')} required>
              <div className="grid grid-cols-3 gap-2">
                {(['yes', 'no', 'maybe'] as WouldRepeat[]).map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setWouldRepeat(value)}
                    aria-pressed={wouldRepeat === value}
                    className={`p-4 border-2 rounded-md text-center transition-all ${
                      wouldRepeat === value ? 'border-accent bg-accent-soft/40' : 'border-border hover:border-border-strong'
                    }`}
                  >
                    {t(`common.${value}`)}
                  </button>
                ))}
              </div>
            </FormField>

            <FormField htmlFor="what-change" label={t('replay.whatChange')}>
              <Textarea id="what-change" value={whatChange} onChange={(event) => setWhatChange(event.target.value)} />
            </FormField>

            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button variant="ghost" onClick={() => setStep(1)}>{t('common.back')}</Button>
              <Button onClick={save} disabled={!wouldRepeat}>{t('replay.seeComparison')} <ArrowRight size={16} /></Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const ChoiceButton = ({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: JSX.Element; label: string }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`p-4 border-2 rounded-md text-left transition-all ${
      active ? 'border-accent bg-accent-soft/40' : 'border-border hover:border-border-strong'
    }`}
  >
    <span className={`inline-flex mb-2 ${active ? 'text-accent' : 'text-ink-muted'}`}>{icon}</span>
    <span className="block text-sm font-medium">{label}</span>
  </button>
);
