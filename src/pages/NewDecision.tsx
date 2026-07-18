import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Plus, Lock, X, ChevronDown } from 'lucide-react';
import { useProfile } from '../store/profileStore';
import { TEMPLATES, getTemplateById, type Template } from '../data/templates';
import { db, genId, type DecisionSnapshot } from '../db/db';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Slider } from '../components/ui/Slider';
import { FormField } from '../components/ui/FormField';
import { Modal } from '../components/ui/Modal';
import { addDays } from '../utils/date';

type Step = 1 | 2 | 3 | 4;

interface FormState {
  templateId: string;
  title: string;
  situation: string;
  options: string[];
  choiceIndex: number;
  reason: string;
  expected: string;
  successCriterion: string;
  confidence: number;
  assumptions: string;
  risks: string;
  missing: string;
  secondOpinion: string;
  replayDate: number;
  midCheckin: boolean;
}

const initialState: FormState = {
  templateId: 'professional-general',
  title: '',
  situation: '',
  options: ['', ''],
  choiceIndex: 0,
  reason: '',
  expected: '',
  successCriterion: '',
  confidence: 50,
  assumptions: '',
  risks: '',
  missing: '',
  secondOpinion: '',
  replayDate: addDays(30),
  midCheckin: false,
};

export const NewDecision = () => {
  const { t } = useTranslation();
  const nav = useNavigate();
  const { profile } = useProfile();
  const [step, setStep] = useState<Step>(1);
  const [state, setState] = useState<FormState>(initialState);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const template = getTemplateById(state.templateId);
  const availableTemplates = profile ? TEMPLATES.filter((tp) => tp.profile === profile) : TEMPLATES;

  const updateField = <K extends keyof FormState>(k: K, v: FormState[K]) => setState((s) => ({ ...s, [k]: v }));

  const hasField = (key: string) => {
    if (!template) return true;
    return template.fields.includes(key) || (showAdvanced && template.advancedFields.includes(key));
  };

  const chooseTemplate = (tpl: Template) => {
    setState((s) => ({ ...s, templateId: tpl.id, replayDate: addDays(tpl.defaultReplayDays) }));
    setStep(2);
  };

  const chooseBlank = () => {
    setState((s) => ({ ...s, templateId: 'professional-general' }));
    setStep(2);
  };

  const lock = async () => {
    const snap: DecisionSnapshot = {
      id: genId(),
      createdAt: Date.now(),
      lockedAt: Date.now(),
      templateId: state.templateId,
      status: 'active',
      title: state.title.trim(),
      situation: state.situation.trim() || undefined,
      options: state.options.filter((o) => o.trim()),
      choiceIndex: state.choiceIndex,
      reason: state.reason.trim(),
      expected: state.expected.trim(),
      successCriterion: state.successCriterion.trim() || undefined,
      confidence: state.confidence,
      assumptions: state.assumptions.trim() || undefined,
      risks: state.risks.trim() || undefined,
      missing: state.missing.trim() || undefined,
      secondOpinion: state.secondOpinion.trim() || undefined,
      replayDate: state.replayDate,
      midCheckin: state.midCheckin,
    };
    await db.decisions.add(snap);
    nav(`/app/decisions/${snap.id}`);
  };

  return (
    <div className="container-app py-6 md:py-10 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => step > 1 ? setStep((step - 1) as Step) : nav(-1)} className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink">
          <ArrowLeft size={16} /> {t('common.back')}
        </button>
        <div className="flex items-center gap-3 text-sm text-ink-muted">
          <span>{t('wizard.step', { n: step === 4 ? 3 : step, total: 3 })}</span>
          <div className="flex gap-1.5">
            {[1, 2, 3].map((n) => (
              <div key={n} className={`w-6 h-1 rounded-full ${
                (step === 4 ? 3 : step) === n ? 'bg-accent' : (step === 4 ? 3 : step) > n ? 'bg-success' : 'bg-border'
              }`} />
            ))}
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="bg-card border rounded-xl shadow-sm p-6 md:p-10">
          <h2 className="font-display text-2xl md:text-3xl mb-2">{t('wizard.step1Title')}</h2>
          <p className="text-ink-muted mb-8">{t('wizard.step1Sub')}</p>

          <div className="grid gap-3">
            {availableTemplates.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => chooseTemplate(tpl)}
                className="text-left p-4 border rounded-lg hover:border-accent hover:bg-accent-soft/40 transition-all"
              >
                <div className="font-medium text-ink">{t(tpl.nameKey)}</div>
                <div className="text-sm text-ink-muted mt-1">{t(tpl.descKey)}</div>
              </button>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t text-center">
            <button onClick={chooseBlank} className="text-sm text-ink-muted hover:text-ink underline underline-offset-4">
              {t('wizard.blankTemplate')}
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-card border rounded-xl shadow-sm p-6 md:p-10">
          <h2 className="font-display text-2xl md:text-3xl mb-2">{t('wizard.step2Title')}</h2>
          <p className="text-ink-muted mb-8">{t('wizard.step2Sub')}</p>

          <FormField label={t('wizard.titleField')} required>
            <Input value={state.title} onChange={(e) => updateField('title', e.target.value)} placeholder={t('wizard.titlePlaceholder')} />
          </FormField>

          {hasField('situation') && (
            <FormField label={t('wizard.situation')}>
              <Textarea value={state.situation} onChange={(e) => updateField('situation', e.target.value)} />
            </FormField>
          )}

          {hasField('options') && (
            <FormField label={t('wizard.options')}>
              <div className="space-y-2">
                {state.options.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input
                      value={opt}
                      onChange={(e) => {
                        const opts = [...state.options];
                        opts[i] = e.target.value;
                        updateField('options', opts);
                      }}
                      placeholder={t('wizard.optionPlaceholder')}
                    />
                    {state.options.length > 2 && (
                      <button
                        onClick={() => {
                          const opts = state.options.filter((_, idx) => idx !== i);
                          updateField('options', opts);
                          if (state.choiceIndex >= opts.length) updateField('choiceIndex', 0);
                        }}
                        className="text-ink-subtle hover:text-danger flex-shrink-0"
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
          )}

          {hasField('choice') && state.options.filter((o) => o.trim()).length > 0 && (
            <FormField label={t('wizard.choice')} required>
              <div className="space-y-2">
                {state.options.map((opt, i) => opt.trim() && (
                  <label key={i} className={`flex items-center gap-3 p-3.5 border-2 rounded-md cursor-pointer transition-all ${
                    state.choiceIndex === i ? 'border-accent bg-accent-soft/40' : 'border-border hover:border-border-strong'
                  }`}>
                    <input
                      type="radio"
                      name="choice"
                      checked={state.choiceIndex === i}
                      onChange={() => updateField('choiceIndex', i)}
                      className="w-4 h-4 accent-accent"
                    />
                    <span className="text-[15px]">{opt}</span>
                  </label>
                ))}
              </div>
            </FormField>
          )}

          {hasField('reason') && (
            <FormField label={t('wizard.reason')} required>
              <Textarea value={state.reason} onChange={(e) => updateField('reason', e.target.value)} />
            </FormField>
          )}

          {template && template.advancedFields.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink"
              >
                <ChevronDown size={16} className={`transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                {t('wizard.advanced')}
              </button>
              {showAdvanced && (
                <div className="mt-5">
                  {hasField('assumptions') && <FormField label={t('wizard.assumptions')}><Textarea value={state.assumptions} onChange={(e) => updateField('assumptions', e.target.value)} /></FormField>}
                  {hasField('risks') && <FormField label={t('wizard.risks')}><Textarea value={state.risks} onChange={(e) => updateField('risks', e.target.value)} /></FormField>}
                  {hasField('missing') && <FormField label={t('wizard.missing')}><Textarea value={state.missing} onChange={(e) => updateField('missing', e.target.value)} /></FormField>}
                  {hasField('secondOpinion') && <FormField label={t('wizard.secondOpinion')}><Input value={state.secondOpinion} onChange={(e) => updateField('secondOpinion', e.target.value)} /></FormField>}
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
            <Button variant="ghost" onClick={() => setStep(1)}>{t('common.back')}</Button>
            <Button onClick={() => setStep(3)} disabled={!state.title.trim() || !state.reason.trim()}>
              {t('common.next')} <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-card border rounded-xl shadow-sm p-6 md:p-10">
          <h2 className="font-display text-2xl md:text-3xl mb-2">{t('wizard.step3Title')}</h2>
          <p className="text-ink-muted mb-8">{t('wizard.step3Sub')}</p>

          <FormField label={t('wizard.expected')} required>
            <Textarea value={state.expected} onChange={(e) => updateField('expected', e.target.value)} />
          </FormField>

          {hasField('success') && (
            <FormField label={t('wizard.success')}>
              <Input value={state.successCriterion} onChange={(e) => updateField('successCriterion', e.target.value)} />
            </FormField>
          )}

          <div className="bg-subtle rounded-lg p-6 mb-6">
            <Slider value={state.confidence} onChange={(v) => updateField('confidence', v)} hint={t('wizard.confidenceHint')} />
          </div>

          <FormField label={t('wizard.replayWhen')} required>
            <div className="space-y-2">
              <ReplayOption days={3} label={t('wizard.in3days')} state={state} setState={updateField} />
              <ReplayOption days={7} label={t('wizard.in1week')} state={state} setState={updateField} />
              <ReplayOption days={30} label={t('wizard.in1month')} state={state} setState={updateField} />
              <div className="p-3.5 border-2 border-border rounded-md">
                <label className="text-sm text-ink-muted block mb-2">{t('wizard.customDate')}</label>
                <input
                  type="date"
                  value={new Date(state.replayDate).toISOString().slice(0, 10)}
                  onChange={(e) => updateField('replayDate', new Date(e.target.value).getTime())}
                  className="px-3 py-2 border rounded-md text-[15px]"
                />
              </div>
            </div>
          </FormField>

          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={state.midCheckin} onChange={(e) => updateField('midCheckin', e.target.checked)} className="w-4 h-4 accent-accent" />
            <span className="text-sm text-ink-muted">{t('wizard.midCheckin')}</span>
          </label>

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
            <Button variant="ghost" onClick={() => setStep(2)}>{t('common.back')}</Button>
            <Button onClick={() => setShowConfirm(true)} disabled={!state.expected.trim()}>
              <Lock size={16} /> {t('wizard.lock')}
            </Button>
          </div>
        </div>
      )}

      <Modal open={showConfirm} onClose={() => setShowConfirm(false)} title={t('wizard.lockConfirmTitle')}>
        <p className="text-ink-muted mb-6">{t('wizard.lockConfirmBody')}</p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setShowConfirm(false)}>{t('common.cancel')}</Button>
          <Button onClick={lock}><Lock size={16} /> {t('wizard.lock')}</Button>
        </div>
      </Modal>
    </div>
  );
};

interface ROProps { days: number; label: string; state: FormState; setState: <K extends keyof FormState>(k: K, v: FormState[K]) => void; }
const ReplayOption = ({ days, label, state, setState }: ROProps) => {
  const target = addDays(days, Date.now());
  const active = Math.abs(state.replayDate - target) < 12 * 60 * 60 * 1000;
  return (
    <label className={`flex items-center gap-3 p-3.5 border-2 rounded-md cursor-pointer transition-all ${
      active ? 'border-accent bg-accent-soft/40' : 'border-border hover:border-border-strong'
    }`}>
      <input type="radio" name="replay" checked={active} onChange={() => setState('replayDate', target)} className="w-4 h-4 accent-accent" />
      <span className="text-[15px]">{label}</span>
    </label>
  );
};
