import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, ChevronDown, Lock, Plus, X } from 'lucide-react';
import { useProfile } from '../store/profileStore';
import { db, genId, type DecisionSnapshot, type UserProfile } from '../db/db';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Slider } from '../components/ui/Slider';
import { FormField } from '../components/ui/FormField';
import { Modal } from '../components/ui/Modal';
import { addDays, fromDateInputValue, toDateInputValue } from '../utils/date';
import { trackEvent } from '../utils/analytics';

type Step = 1 | 2;

interface FormState {
  templateId: string;
  title: string;
  choice: string;
  reason: string;
  expected: string;
  confidence: number;
  situation: string;
  options: string[];
  successCriterion: string;
  assumptions: string;
  risks: string;
  missing: string;
  secondOpinion: string;
  replayDate: number;
}

const defaultsForProfile = (profile: UserProfile | null): Pick<FormState, 'templateId' | 'replayDate'> => {
  if (profile === 'student') return { templateId: 'student-study', replayDate: addDays(14) };
  if (profile === 'personal') return { templateId: 'personal-job', replayDate: addDays(90) };
  return { templateId: 'professional-general', replayDate: addDays(30) };
};

const createInitialState = (profile: UserProfile | null): FormState => ({
  ...defaultsForProfile(profile),
  title: '',
  choice: '',
  reason: '',
  expected: '',
  confidence: 60,
  situation: '',
  options: ['', ''],
  successCriterion: '',
  assumptions: '',
  risks: '',
  missing: '',
  secondOpinion: '',
});

export const NewDecision = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { profile } = useProfile();
  const [step, setStep] = useState<Step>(1);
  const [state, setState] = useState<FormState>(() => createInitialState(profile ?? 'professional'));
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    trackEvent('decision_started', { entry: 'new_decision' });
  }, []);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setState((current) => ({ ...current, [key]: value }));
  };

  const coreComplete = Boolean(
    state.title.trim() && state.choice.trim() && state.reason.trim() && state.expected.trim()
  );

  const lock = async () => {
    const snapshot: DecisionSnapshot = {
      id: genId(),
      createdAt: Date.now(),
      lockedAt: Date.now(),
      templateId: state.templateId,
      status: 'active',
      title: state.title.trim(),
      choice: state.choice.trim(),
      situation: state.situation.trim() || undefined,
      options: state.options.map((option) => option.trim()).filter(Boolean),
      choiceIndex: 0,
      reason: state.reason.trim(),
      expected: state.expected.trim(),
      successCriterion: state.successCriterion.trim() || undefined,
      confidence: state.confidence,
      assumptions: state.assumptions.trim() || undefined,
      risks: state.risks.trim() || undefined,
      missing: state.missing.trim() || undefined,
      secondOpinion: state.secondOpinion.trim() || undefined,
      replayDate: state.replayDate,
      midCheckin: false,
    };

    await db.decisions.add(snapshot);
    trackEvent('decision_locked', { replay_window_days: Math.max(1, Math.round((snapshot.replayDate - snapshot.lockedAt) / 86400000)) });
    navigate(`/app/decisions/${snapshot.id}`, { state: { justCreated: true } });
  };

  return (
    <div className="container-app py-6 md:py-10 max-w-3xl">
      <div className="flex items-center justify-between mb-8 gap-4">
        <button
          type="button"
          onClick={() => (step === 2 ? setStep(1) : navigate(-1))}
          className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink"
        >
          <ArrowLeft size={16} /> {t('common.back')}
        </button>
        <div className="flex items-center gap-3 text-sm text-ink-muted" aria-label={t('wizard.step', { n: step, total: 2 })}>
          <span>{t('wizard.step', { n: step, total: 2 })}</span>
          <div className="flex gap-1.5" aria-hidden="true">
            {[1, 2].map((number) => (
              <div key={number} className={`w-8 h-1 rounded-full ${step === number ? 'bg-accent' : step > number ? 'bg-success' : 'bg-border'}`} />
            ))}
          </div>
        </div>
      </div>

      {step === 1 && (
        <section className="bg-card border rounded-xl shadow-sm p-6 md:p-10">
          <div className="text-xs uppercase tracking-[0.16em] text-accent font-semibold mb-3">{t('wizard.coreEyebrow')}</div>
          <h1 className="font-display text-3xl md:text-4xl mb-3">{t('wizard.coreTitle')}</h1>
          <p className="text-ink-muted mb-8">{t('wizard.coreSub')}</p>

          <FormField htmlFor="decision-title" label={t('wizard.titleField')} helper={t('wizard.titleHelper')} required>
            <Input
              id="decision-title"
              autoFocus
              value={state.title}
              onChange={(event) => updateField('title', event.target.value)}
              placeholder={t('wizard.titlePlaceholder')}
            />
          </FormField>

          <FormField htmlFor="decision-choice" label={t('wizard.choiceCore')} helper={t('wizard.choiceHelper')} required>
            <Textarea
              id="decision-choice"
              value={state.choice}
              onChange={(event) => updateField('choice', event.target.value)}
              placeholder={t('wizard.choicePlaceholder')}
              className="min-h-[84px]"
            />
          </FormField>

          <FormField htmlFor="decision-reason" label={t('wizard.reason')} helper={t('wizard.reasonHelper')} required>
            <Textarea
              id="decision-reason"
              value={state.reason}
              onChange={(event) => updateField('reason', event.target.value)}
              placeholder={t('wizard.reasonPlaceholder')}
            />
          </FormField>

          <FormField htmlFor="decision-expected" label={t('wizard.expected')} helper={t('wizard.expectedHelper')} required>
            <Textarea
              id="decision-expected"
              value={state.expected}
              onChange={(event) => updateField('expected', event.target.value)}
              placeholder={t('wizard.expectedPlaceholder')}
            />
          </FormField>

          <FormField label={t('wizard.confidence')} helper={t('wizard.confidenceQuestion')} required>
            <div className="bg-subtle rounded-lg p-5 md:p-6">
              <Slider
                value={state.confidence}
                onChange={(value) => updateField('confidence', value)}
                hint={t('wizard.confidenceHint')}
                ariaLabel={t('wizard.confidence')}
              />
            </div>
          </FormField>

          <div className="flex justify-end mt-8 pt-6 border-t">
            <Button onClick={() => setStep(2)} disabled={!coreComplete}>
              {t('wizard.setReplay')} <ArrowRight size={16} />
            </Button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="bg-card border rounded-xl shadow-sm p-6 md:p-10">
          <div className="text-xs uppercase tracking-[0.16em] text-accent font-semibold mb-3">{t('wizard.replayEyebrow')}</div>
          <h1 className="font-display text-3xl md:text-4xl mb-3">{t('wizard.replayTitle')}</h1>
          <p className="text-ink-muted mb-8">{t('wizard.replaySub')}</p>

          <div className="bg-subtle rounded-lg p-5 mb-8">
            <div className="text-xs uppercase tracking-wider text-ink-muted font-medium mb-2">{t('wizard.preview')}</div>
            <div className="font-medium mb-1">{state.title}</div>
            <p className="text-sm text-ink-muted line-clamp-3">{state.expected}</p>
            <div className="text-sm text-accent font-medium mt-3">{state.confidence}% {t('wizard.confidenceShort')}</div>
          </div>

          <FormField htmlFor="replay-date" label={t('wizard.replayWhen')} helper={t('wizard.replayWhenHelper')} required>
            <div className="grid sm:grid-cols-3 gap-2 mb-3">
              <ReplayOption days={7} label={t('wizard.in1week')} replayDate={state.replayDate} onChange={(value) => updateField('replayDate', value)} />
              <ReplayOption days={30} label={t('wizard.in1month')} replayDate={state.replayDate} onChange={(value) => updateField('replayDate', value)} />
              <ReplayOption days={90} label={t('wizard.in3months')} replayDate={state.replayDate} onChange={(value) => updateField('replayDate', value)} />
            </div>
            <input
              id="replay-date"
              type="date"
              min={toDateInputValue(addDays(1))}
              value={toDateInputValue(state.replayDate)}
              onChange={(event) => updateField('replayDate', fromDateInputValue(event.target.value))}
              className="w-full px-3.5 py-3 border rounded-md bg-card text-ink text-[15px] focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15"
            />
          </FormField>

          <div className="mt-6 pt-6 border-t">
            <button
              type="button"
              onClick={() => setShowAdvanced((value) => !value)}
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink"
              aria-expanded={showAdvanced}
            >
              <ChevronDown size={16} className={`transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
              {t('wizard.advanced')}
            </button>

            {showAdvanced && (
              <div className="mt-6">
                <FormField htmlFor="decision-success" label={t('wizard.success')} helper={t('wizard.successHelper')}>
                  <Input id="decision-success" value={state.successCriterion} onChange={(event) => updateField('successCriterion', event.target.value)} placeholder={t('wizard.successPlaceholder')} />
                </FormField>

                <FormField htmlFor="decision-situation" label={t('wizard.situation')}>
                  <Textarea id="decision-situation" value={state.situation} onChange={(event) => updateField('situation', event.target.value)} />
                </FormField>

                <FormField label={t('wizard.alternatives')} helper={t('wizard.alternativesHelper')}>
                  <div className="space-y-2">
                    {state.options.map((option, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={option}
                          onChange={(event) => {
                            const options = [...state.options];
                            options[index] = event.target.value;
                            updateField('options', options);
                          }}
                          placeholder={t('wizard.optionPlaceholder')}
                          aria-label={`${t('wizard.alternative')} ${index + 1}`}
                        />
                        {state.options.length > 1 && (
                          <button
                            type="button"
                            onClick={() => updateField('options', state.options.filter((_, optionIndex) => optionIndex !== index))}
                            className="text-ink-subtle hover:text-danger p-2 flex-shrink-0"
                            aria-label={t('wizard.removeOption')}
                          >
                            <X size={18} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => updateField('options', [...state.options, ''])}
                      className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-hover mt-2"
                    >
                      <Plus size={16} /> {t('wizard.addOption')}
                    </button>
                  </div>
                </FormField>

                <FormField htmlFor="decision-assumptions" label={t('wizard.assumptions')}>
                  <Textarea id="decision-assumptions" value={state.assumptions} onChange={(event) => updateField('assumptions', event.target.value)} />
                </FormField>
                <FormField htmlFor="decision-risks" label={t('wizard.risks')}>
                  <Textarea id="decision-risks" value={state.risks} onChange={(event) => updateField('risks', event.target.value)} />
                </FormField>
                <FormField htmlFor="decision-missing" label={t('wizard.missing')}>
                  <Textarea id="decision-missing" value={state.missing} onChange={(event) => updateField('missing', event.target.value)} />
                </FormField>
                <FormField htmlFor="decision-second-opinion" label={t('wizard.secondOpinion')}>
                  <Input id="decision-second-opinion" value={state.secondOpinion} onChange={(event) => updateField('secondOpinion', event.target.value)} />
                </FormField>
              </div>
            )}
          </div>

          <div className="flex justify-between gap-3 mt-8 pt-6 border-t">
            <Button variant="ghost" onClick={() => setStep(1)}>{t('common.back')}</Button>
            <Button onClick={() => setShowConfirm(true)}>
              <Lock size={16} /> {t('wizard.lock')}
            </Button>
          </div>
        </section>
      )}

      <Modal open={showConfirm} onClose={() => setShowConfirm(false)} title={t('wizard.lockConfirmTitle')}>
        <p className="text-ink-muted mb-4">{t('wizard.lockConfirmBody')}</p>
        <div className="bg-subtle rounded-lg p-4 mb-6 text-sm">
          <div className="font-medium">{state.title}</div>
          <div className="text-ink-muted mt-1">{t('wizard.lockedUntil', { date: new Date(state.replayDate).toLocaleDateString() })}</div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setShowConfirm(false)}>{t('common.cancel')}</Button>
          <Button onClick={lock}><Lock size={16} /> {t('wizard.lock')}</Button>
        </div>
      </Modal>
    </div>
  );
};

const ReplayOption = ({
  days,
  label,
  replayDate,
  onChange,
}: {
  days: number;
  label: string;
  replayDate: number;
  onChange: (value: number) => void;
}) => {
  const target = addDays(days);
  const active = Math.abs(replayDate - target) < 12 * 60 * 60 * 1000;
  return (
    <button
      type="button"
      onClick={() => onChange(target)}
      aria-pressed={active}
      className={`p-3 border-2 rounded-md text-sm text-center transition-all ${
        active ? 'border-accent bg-accent-soft/40 text-ink' : 'border-border hover:border-border-strong text-ink-muted'
      }`}
    >
      {label}
    </button>
  );
};
