import { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLiveQuery } from 'dexie-react-hooks';
import { ArrowLeft, CalendarPlus, Check, Copy, Lock, Plus, Swords, Trash2 } from 'lucide-react';
import { db, genId, computeDecisionStatus } from '../db/db';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button, buttonClasses } from '../components/ui/Button';
import { Textarea } from '../components/ui/Textarea';
import { Modal } from '../components/ui/Modal';
import { formatDate, daysUntil } from '../utils/date';
import { buildChallengeUrl, type ChallengeData } from '../utils/challenge';
import { buildGoogleCalendarUrl, buildOutlookCalendarUrl, downloadICS } from '../utils/reminder';

export const DecisionDetail = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [noteText, setNoteText] = useState('');
  const [showAddNote, setShowAddNote] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showChallenge, setShowChallenge] = useState(false);
  const [challengerName, setChallengerName] = useState('');
  const [copied, setCopied] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [showCreated, setShowCreated] = useState(Boolean((location.state as { justCreated?: boolean } | null)?.justCreated));

  const decision = useLiveQuery(() => (id ? db.decisions.get(id) : undefined), [id]);
  const replay = useLiveQuery(() => (id ? db.replays.where('decisionId').equals(id).first() : undefined), [id]);
  const notes = useLiveQuery(() => (id ? db.notes.where('decisionId').equals(id).sortBy('createdAt') : []), [id]) ?? [];

  if (!decision) return <div className="container-app py-10 text-ink-muted">{t('common.loading')}</div>;

  const status = computeDecisionStatus(decision, Boolean(replay));
  const days = daysUntil(decision.replayDate);
  const readyForReplay = status === 'replay' && !replay;
  const appUrl = window.location.origin;
  const choice = decision.choice || decision.options[decision.choiceIndex];

  const addNote = async () => {
    if (!noteText.trim()) return;
    await db.notes.add({ id: genId(), decisionId: decision.id, createdAt: Date.now(), text: noteText.trim() });
    setNoteText('');
    setShowAddNote(false);
  };

  const deleteDecision = async () => {
    await db.transaction('rw', db.decisions, db.replays, db.notes, async () => {
      await db.decisions.delete(decision.id);
      await db.replays.where('decisionId').equals(decision.id).delete();
      await db.notes.where('decisionId').equals(decision.id).delete();
    });
    navigate('/app/decisions');
  };

  const getChallengeUrl = () => {
    const data: ChallengeData = {
      q: decision.title,
      s: decision.situation,
      o: choice ? [choice, ...decision.options.filter((option) => option !== choice)] : decision.options,
      ci: 0,
      p: decision.expected,
      c: decision.confidence,
      n: challengerName || t('challenge.anonymous'),
      t: Date.now(),
    };
    return buildChallengeUrl(data);
  };

  const copyChallenge = async () => {
    await navigator.clipboard.writeText(getChallengeUrl());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const addICS = () => {
    downloadICS(decision.title, decision.replayDate, appUrl, decision.id);
    setShowCreated(false);
  };

  return (
    <div className="container-app py-6 md:py-10 max-w-4xl">
      <Link to="/app/decisions" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink mb-6">
        <ArrowLeft size={16} /> {t('nav.decisions')}
      </Link>

      {showCreated && !replay && (
        <Card className="mb-6 bg-success/10 !border-success/30" padding="lg">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-success font-semibold mb-2">{t('detail.createdEyebrow')}</div>
              <h2 className="font-display text-2xl mb-2">{t('detail.createdTitle')}</h2>
              <p className="text-sm text-ink-muted">{t('detail.createdSub', { date: formatDate(decision.replayDate, i18n.language) })}</p>
            </div>
            <button type="button" onClick={() => setShowCreated(false)} className="text-sm text-ink-muted hover:text-ink">{t('common.dismiss')}</button>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={buildGoogleCalendarUrl(decision.title, decision.replayDate, appUrl, decision.id)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses('primary', 'sm')}
            >
              <CalendarPlus size={15} /> Google Calendar
            </a>
            <Button size="sm" variant="secondary" onClick={addICS}><CalendarPlus size={15} /> {t('detail.downloadICS')}</Button>
          </div>
        </Card>
      )}

      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex items-center gap-2">
          <Lock size={20} className="text-ink-muted" />
          <Badge variant={status}>{t(`list.status${status.charAt(0).toUpperCase() + status.slice(1)}`)}</Badge>
        </div>
        <button onClick={() => setShowDelete(true)} className="text-ink-subtle hover:text-danger p-1" aria-label={t('detail.deleteDecision')}>
          <Trash2 size={18} />
        </button>
      </div>

      <h1 className="font-display text-3xl md:text-4xl mb-2">{decision.title}</h1>
      <p className="text-sm text-ink-muted mb-6">
        {t('detail.lockedOn', { date: formatDate(decision.lockedAt, i18n.language) })}
        {' · '}
        {status === 'replay' ? t('detail.replayReady') : t('detail.replayIn', { days: Math.max(0, days) })}
      </p>

      {readyForReplay ? (
        <Card className="mb-6 bg-[#EDE4C7] !border-[#E1CFA0]" padding="md">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="font-medium">{t('detail.replayReady')}</p>
              <p className="text-sm text-ink-muted mt-1">{t('detail.replayReadySub')}</p>
            </div>
            <Link to={`/app/decisions/${decision.id}/replay`} className={buttonClasses('primary', 'sm')}>{t('detail.startReplay')}</Link>
          </div>
        </Card>
      ) : !replay ? (
        <div className="flex flex-wrap gap-3 mb-6">
          <Button size="sm" variant="secondary" onClick={() => setShowReminder(true)}>
            <CalendarPlus size={14} /> {t('detail.reminder')}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setShowChallenge(true)}>
            <Swords size={14} /> {t('detail.challenge')}
          </Button>
        </div>
      ) : null}

      <div className="grid md:grid-cols-[1.1fr_.9fr] gap-4 mb-6">
        <Card padding="lg">
          <div className="text-xs uppercase tracking-[0.16em] text-accent font-semibold mb-5">{t('detail.decisionSnapshot')}</div>
          {choice && <Section label={t('detail.choice')} text={choice} emphasis />}
          <Section label={t('detail.reason')} text={decision.reason} />
          {decision.situation && <Section label={t('detail.situation')} text={decision.situation} />}
          {decision.options.length > 0 && (
            <div>
              <div className="text-xs uppercase tracking-wider text-ink-muted font-medium mb-2">{t('detail.alternatives')}</div>
              <ul className="space-y-1 text-ink-muted">
                {decision.options.map((option, index) => <li key={index}>• {option}</li>)}
              </ul>
            </div>
          )}
        </Card>

        <Card padding="lg" className="bg-subtle">
          <div className="text-xs uppercase tracking-[0.16em] text-ink-muted font-semibold mb-5">{t('detail.predictionSnapshot')}</div>
          <Section label={t('detail.expected')} text={decision.expected} emphasis />
          <div className="mb-5">
            <div className="text-xs uppercase tracking-wider text-ink-muted font-medium mb-2">{t('detail.confidence')}</div>
            <div className="font-display text-4xl text-accent font-medium tabular-nums">{decision.confidence}%</div>
          </div>
          {decision.successCriterion && <Section label={t('detail.success')} text={decision.successCriterion} />}
        </Card>
      </div>

      {(decision.assumptions || decision.risks || decision.missing || decision.secondOpinion) && (
        <Card className="mb-6 grid sm:grid-cols-2 gap-5" padding="lg">
          {decision.assumptions && <Section label={t('detail.assumptions')} text={decision.assumptions} />}
          {decision.risks && <Section label={t('detail.risks')} text={decision.risks} />}
          {decision.missing && <Section label={t('detail.missing')} text={decision.missing} />}
          {decision.secondOpinion && <Section label={t('detail.secondOpinion')} text={decision.secondOpinion} />}
        </Card>
      )}

      {replay && (
        <Link
          to={`/app/decisions/${decision.id}/compare`}
          className={buttonClasses('secondary', 'md', 'w-full justify-center mb-6')}
        >
          {t('comparison.openReplay')} →
        </Link>
      )}

      <Card padding="md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">{t('detail.notes')} ({notes.length})</h3>
          <Button size="sm" variant="ghost" onClick={() => setShowAddNote(true)}><Plus size={14} /> {t('detail.addNote')}</Button>
        </div>
        {showAddNote && (
          <div className="mb-4">
            <Textarea value={noteText} onChange={(event) => setNoteText(event.target.value)} placeholder={t('detail.notePlaceholder')} aria-label={t('detail.addNote')} />
            <div className="flex justify-end gap-2 mt-2">
              <Button size="sm" variant="ghost" onClick={() => { setShowAddNote(false); setNoteText(''); }}>{t('common.cancel')}</Button>
              <Button size="sm" onClick={addNote}>{t('common.save')}</Button>
            </div>
          </div>
        )}
        {notes.length === 0 && !showAddNote && <p className="text-sm text-ink-muted">{t('detail.noNotes')}</p>}
        <ul className="space-y-3">
          {notes.map((note) => (
            <li key={note.id} className="text-sm border-t first:border-t-0 pt-3 first:pt-0">
              <div className="text-xs text-ink-subtle mb-1">{formatDate(note.createdAt, i18n.language)}</div>
              <div className="text-ink-muted whitespace-pre-wrap">{note.text}</div>
            </li>
          ))}
        </ul>
      </Card>

      <Modal open={showDelete} onClose={() => setShowDelete(false)} title={t('detail.deleteDecision')}>
        <p className="text-ink-muted mb-6">{t('detail.deleteConfirm')}</p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setShowDelete(false)}>{t('common.cancel')}</Button>
          <Button variant="danger" onClick={deleteDecision}>{t('common.delete')}</Button>
        </div>
      </Modal>

      <Modal open={showChallenge} onClose={() => setShowChallenge(false)} title={t('detail.challengeTitle')}>
        <p className="text-ink-muted text-sm mb-3">{t('detail.challengeDesc')}</p>
        <p className="text-xs text-warning bg-warning/10 rounded-md p-3 mb-4">{t('detail.challengePrivacy')}</p>
        <div className="mb-4">
          <label htmlFor="challenger-name" className="block text-sm font-medium mb-1.5">{t('detail.challengeName')}</label>
          <input
            id="challenger-name"
            type="text"
            value={challengerName}
            onChange={(event) => setChallengerName(event.target.value)}
            placeholder={t('detail.challengeNamePlaceholder')}
            className="w-full px-3.5 py-2.5 border rounded-md bg-card text-[15px] focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15"
          />
        </div>
        <Button onClick={copyChallenge} className="w-full justify-center">
          {copied ? <><Check size={16} /> {t('detail.challengeCopied')}</> : <><Copy size={16} /> {t('detail.challengeCopy')}</>}
        </Button>
      </Modal>

      <Modal open={showReminder} onClose={() => setShowReminder(false)} title={t('detail.reminderTitle')}>
        <p className="text-ink-muted text-sm mb-4">{t('detail.reminderDesc', { date: formatDate(decision.replayDate, i18n.language) })}</p>
        <div className="space-y-3">
          <a
            href={buildGoogleCalendarUrl(decision.title, decision.replayDate, appUrl, decision.id)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses('secondary', 'md', 'w-full justify-center')}
          >
            <CalendarPlus size={16} /> Google Calendar
          </a>
          <a
            href={buildOutlookCalendarUrl(decision.title, decision.replayDate, appUrl, decision.id)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses('secondary', 'md', 'w-full justify-center')}
          >
            <CalendarPlus size={16} /> Outlook
          </a>
          <Button variant="ghost" className="w-full justify-center" onClick={() => { addICS(); setShowReminder(false); }}>
            {t('detail.downloadICS')}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

const Section = ({ label, text, emphasis = false }: { label: string; text: string; emphasis?: boolean }) => (
  <div className="mb-5 last:mb-0">
    <div className="text-xs uppercase tracking-wider text-ink-muted font-medium mb-2">{label}</div>
    <p className={`whitespace-pre-wrap leading-relaxed ${emphasis ? 'text-lg font-medium text-ink' : 'text-ink'}`}>{text}</p>
  </div>
);
