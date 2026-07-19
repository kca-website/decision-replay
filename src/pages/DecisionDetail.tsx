import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLiveQuery } from 'dexie-react-hooks';
import { ArrowLeft, Lock, Trash2, Plus, Swords, CalendarPlus, Copy, Check } from 'lucide-react';
import { db, genId, computeDecisionStatus } from '../db/db';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Textarea } from '../components/ui/Textarea';
import { Modal } from '../components/ui/Modal';
import { formatDate, daysUntil } from '../utils/date';
import { buildChallengeUrl, type ChallengeData } from '../utils/challenge';
import { buildGoogleCalendarUrl, buildOutlookCalendarUrl, downloadICS } from '../utils/reminder';

export const DecisionDetail = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const nav = useNavigate();
  const [noteText, setNoteText] = useState('');
  const [showAddNote, setShowAddNote] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showChallenge, setShowChallenge] = useState(false);
  const [challengerName, setChallengerName] = useState('');
  const [copied, setCopied] = useState(false);
  const [showReminder, setShowReminder] = useState(false);

  const decision = useLiveQuery(() => (id ? db.decisions.get(id) : undefined), [id]);
  const replay = useLiveQuery(() => (id ? db.replays.where('decisionId').equals(id).first() : undefined), [id]);
  const notes = useLiveQuery(() => (id ? db.notes.where('decisionId').equals(id).sortBy('createdAt') : []), [id]) ?? [];

  if (!decision) return <div className="container-app py-10 text-ink-muted">{t('common.loading')}</div>;

  const status = computeDecisionStatus(decision, !!replay);
  const days = daysUntil(decision.replayDate);
  const readyForReplay = status === 'replay' && !replay;

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
    nav('/app/decisions');
  };

  const getChallengeUrl = () => {
    const data: ChallengeData = {
      q: decision.title,
      s: decision.situation,
      o: decision.options,
      ci: decision.choiceIndex,
      p: decision.expected,
      c: decision.confidence,
      n: challengerName || t('challenge.anonymous'),
      t: Date.now(),
    };
    return buildChallengeUrl(data);
  };

  const copyChallenge = async () => {
    const url = getChallengeUrl();
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const appUrl = window.location.origin;

  return (
    <div className="container-app py-6 md:py-10 max-w-3xl">
      <Link to="/app/decisions" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink mb-6">
        <ArrowLeft size={16} /> {t('nav.decisions')}
      </Link>

      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex items-center gap-2">
          <Lock size={20} className="text-ink-muted" />
          <Badge variant={status}>{t(`list.status${status.charAt(0).toUpperCase() + status.slice(1)}`)}</Badge>
        </div>
        <button onClick={() => setShowDelete(true)} className="text-ink-subtle hover:text-danger" aria-label={t('detail.deleteDecision')}>
          <Trash2 size={18} />
        </button>
      </div>
      <h1 className="font-display text-3xl md:text-4xl mb-2">{decision.title}</h1>
      <p className="text-sm text-ink-muted mb-6">
        {t('detail.lockedOn', { date: formatDate(decision.lockedAt, i18n.language) })}
        {' · '}
        {status === 'replay' ? t('detail.replayReady') : t('detail.replayIn', { days: Math.max(0, days) })}
      </p>

      {/* Action buttons: Challenge + Reminder */}
      <div className="flex flex-wrap gap-3 mb-6">
        {!replay && (
          <Button size="sm" variant="secondary" onClick={() => setShowChallenge(true)}>
            <Swords size={14} /> {t('detail.challenge')}
          </Button>
        )}
        {!replay && status !== 'replay' && (
          <Button size="sm" variant="secondary" onClick={() => setShowReminder(true)}>
            <CalendarPlus size={14} /> {t('detail.reminder')}
          </Button>
        )}
      </div>

      {readyForReplay && (
        <Card className="mb-6 bg-[#EDE4C7] !border-[#E1CFA0]" padding="md">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <p className="font-medium">{t('detail.replayReady')}</p>
            <Link to={`/app/decisions/${decision.id}/replay`}>
              <Button size="sm">{t('detail.startReplay')}</Button>
            </Link>
          </div>
        </Card>
      )}

      <Card className="mb-6 space-y-5" padding="lg">
        {decision.situation && <Section label={t('detail.situation')} text={decision.situation} />}
        {decision.options.length > 0 && (
          <div>
            <div className="text-xs uppercase tracking-wider text-ink-muted font-medium mb-2">{t('detail.options')}</div>
            <ul className="space-y-1">
              {decision.options.map((o, i) => (
                <li key={i} className={i === decision.choiceIndex ? 'font-medium text-ink' : 'text-ink-muted'}>
                  {i === decision.choiceIndex && '✓ '}{o}
                </li>
              ))}
            </ul>
          </div>
        )}
        <Section label={t('detail.reason')} text={decision.reason} />
        <Section label={t('detail.expected')} text={decision.expected} />
        {decision.successCriterion && <Section label={t('detail.success')} text={decision.successCriterion} />}
        <div>
          <div className="text-xs uppercase tracking-wider text-ink-muted font-medium mb-2">{t('detail.confidence')}</div>
          <div className="font-display text-3xl text-accent font-medium tabular-nums">{decision.confidence}%</div>
        </div>
        {decision.assumptions && <Section label={t('detail.assumptions')} text={decision.assumptions} />}
        {decision.risks && <Section label={t('detail.risks')} text={decision.risks} />}
      </Card>

      {replay && (
        <Link to={`/app/decisions/${decision.id}/compare`}>
          <Button variant="secondary" className="mb-6 w-full justify-center">
            {t('comparison.title')} →
          </Button>
        </Link>
      )}

      <Card padding="md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">{t('detail.notes')} ({notes.length})</h3>
          <Button size="sm" variant="ghost" onClick={() => setShowAddNote(true)}>
            <Plus size={14} /> {t('detail.addNote')}
          </Button>
        </div>
        {showAddNote && (
          <div className="mb-4">
            <Textarea value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder={t('detail.notePlaceholder')} />
            <div className="flex justify-end gap-2 mt-2">
              <Button size="sm" variant="ghost" onClick={() => { setShowAddNote(false); setNoteText(''); }}>{t('common.cancel')}</Button>
              <Button size="sm" onClick={addNote}>{t('common.save')}</Button>
            </div>
          </div>
        )}
        {notes.length === 0 && !showAddNote && <p className="text-sm text-ink-muted">—</p>}
        <ul className="space-y-3">
          {notes.map((n) => (
            <li key={n.id} className="text-sm">
              <div className="text-xs text-ink-subtle mb-1">{formatDate(n.createdAt, i18n.language)}</div>
              <div className="text-ink-muted">{n.text}</div>
            </li>
          ))}
        </ul>
      </Card>

      {/* Delete modal */}
      <Modal open={showDelete} onClose={() => setShowDelete(false)} title={t('detail.deleteDecision')}>
        <p className="text-ink-muted mb-6">{t('detail.deleteConfirm')}</p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setShowDelete(false)}>{t('common.cancel')}</Button>
          <Button variant="danger" onClick={deleteDecision}>{t('common.delete')}</Button>
        </div>
      </Modal>

      {/* Challenge modal */}
      <Modal open={showChallenge} onClose={() => setShowChallenge(false)} title={t('detail.challengeTitle')}>
        <p className="text-ink-muted text-sm mb-4">{t('detail.challengeDesc')}</p>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1.5">{t('detail.challengeName')}</label>
          <input
            type="text"
            value={challengerName}
            onChange={(e) => setChallengerName(e.target.value)}
            placeholder={t('detail.challengeNamePlaceholder')}
            className="w-full px-3.5 py-2.5 border rounded-md bg-card text-[15px] focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15"
          />
        </div>
        <Button onClick={copyChallenge} className="w-full justify-center">
          {copied ? <><Check size={16} /> {t('detail.challengeCopied')}</> : <><Copy size={16} /> {t('detail.challengeCopy')}</>}
        </Button>
      </Modal>

      {/* Reminder modal */}
      <Modal open={showReminder} onClose={() => setShowReminder(false)} title={t('detail.reminderTitle')}>
        <p className="text-ink-muted text-sm mb-4">{t('detail.reminderDesc')}</p>
        <div className="space-y-3">
          <a href={buildGoogleCalendarUrl(decision.title, decision.replayDate, appUrl, decision.id)} target="_blank" rel="noopener">
            <Button variant="secondary" className="w-full justify-center">
              📅 Google Calendar
            </Button>
          </a>
          <a href={buildOutlookCalendarUrl(decision.title, decision.replayDate, appUrl, decision.id)} target="_blank" rel="noopener">
            <Button variant="secondary" className="w-full justify-center">
              📅 Outlook
            </Button>
          </a>
          <Button variant="ghost" className="w-full justify-center" onClick={() => {
            downloadICS(decision.title, decision.replayDate, appUrl, decision.id);
            setShowReminder(false);
          }}>
            📥 {t('detail.downloadICS')}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

const Section = ({ label, text }: { label: string; text: string }) => (
  <div>
    <div className="text-xs uppercase tracking-wider text-ink-muted font-medium mb-2">{label}</div>
    <p className="text-ink whitespace-pre-wrap">{text}</p>
  </div>
);
