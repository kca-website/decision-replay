import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Copy, Download, Linkedin, Share2 } from 'lucide-react';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import type { DecisionSnapshot, DecisionReplay } from '../db/db';
import { trackEvent } from '../utils/analytics';

interface ShareCardProps {
  decision: DecisionSnapshot;
  replay: DecisionReplay;
  open: boolean;
  onClose: () => void;
}

export const ShareCard = ({ decision, replay, open, onClose }: ShareCardProps) => {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);
  const [generating, setGenerating] = useState(false);
  const [includeTitle, setIncludeTitle] = useState(false);
  const [includeLesson, setIncludeLesson] = useState(false);
  const [copied, setCopied] = useState(false);

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const matchKey = replay.expectationMatch
    ? `replay.match${replay.expectationMatch === 'yes' ? 'Yes' : replay.expectationMatch === 'partial' ? 'Partial' : 'No'}`
    : 'share.replayCompleted';
  const cardTitle = includeTitle ? decision.title : t('share.anonymousTitle');
  const signalKey = getSignalKey(decision.confidence, replay.expectationMatch);

  useEffect(() => {
    if (open) trackEvent('share_card_opened');
  }, [open]);

  const renderCanvas = async () => {
    if (!cardRef.current) return null;
    const html2canvas = (await import('html2canvas')).default;
    return html2canvas(cardRef.current, {
      backgroundColor: '#FAF7F0',
      scale: 2,
      useCORS: true,
    });
  };

  const generateImage = async () => {
    setGenerating(true);
    try {
      const canvas = await renderCanvas();
      if (!canvas) return;
      const link = document.createElement('a');
      link.download = `decision-replay-${decision.id.slice(0, 8)}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      trackEvent('share_card_downloaded', { format: 'png' });
    } finally {
      setGenerating(false);
    }
  };

  const shareText = t('share.postText', {
    confidence: decision.confidence,
    match: t(matchKey),
    rating: replay.rating,
  });

  const copyShareText = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${origin}`);
      setCopied(true);
      trackEvent('share_text_copied', { destination: 'linkedin' });
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access can be blocked by browser permissions.
    }
  };

  const nativeShare = async () => {
    setGenerating(true);
    try {
      const canvas = await renderCanvas();
      if (canvas) {
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
        if (blob) {
          const file = new File([blob], `decision-replay-${decision.id.slice(0, 8)}.png`, { type: 'image/png' });
          if (navigator.share && navigator.canShare?.({ files: [file] })) {
            await navigator.share({ title: 'Decision Replay', text: shareText, files: [file] });
            trackEvent('share_native_opened', { content: 'image' });
            return;
          }
        }
      }

      if (navigator.share) {
        await navigator.share({ title: 'Decision Replay', text: shareText, url: origin });
        trackEvent('share_native_opened', { content: 'link' });
        return;
      }

      await copyShareText();
    } catch {
      // The user may cancel the native share dialog.
    } finally {
      setGenerating(false);
    }
  };

  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(origin)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <Modal open={open} onClose={onClose} title={t('share.title')}>
      <p className="text-sm text-ink-muted mb-4">{t('share.privacyNote')}</p>

      <div className="space-y-2 mb-5">
        <label className="flex items-start gap-3 p-3.5 bg-subtle rounded-lg cursor-pointer">
          <input
            type="checkbox"
            checked={includeTitle}
            onChange={(event) => setIncludeTitle(event.target.checked)}
            className="w-4 h-4 mt-0.5 accent-accent"
          />
          <span>
            <span className="block text-sm font-medium">{t('share.includeTitle')}</span>
            <span className="block text-xs text-ink-muted mt-0.5">{t('share.includeTitleHint')}</span>
          </span>
        </label>

        {replay.lesson && (
          <label className="flex items-start gap-3 p-3.5 bg-subtle rounded-lg cursor-pointer">
            <input
              type="checkbox"
              checked={includeLesson}
              onChange={(event) => setIncludeLesson(event.target.checked)}
              className="w-4 h-4 mt-0.5 accent-accent"
            />
            <span>
              <span className="block text-sm font-medium">{t('share.includeLesson')}</span>
              <span className="block text-xs text-ink-muted mt-0.5">{t('share.includeLessonHint')}</span>
            </span>
          </label>
        )}
      </div>

      <div
        ref={cardRef}
        className="rounded-xl overflow-hidden mb-6"
        style={{
          background: 'linear-gradient(135deg, #FAF7F0 0%, #F0E8D8 100%)',
          padding: '28px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#8A8070', marginBottom: '8px' }}>
            Decision Replay · Then / Now
          </div>
          <div style={{ fontSize: '19px', fontWeight: 600, color: '#2C2825', lineHeight: 1.3 }}>
            {cardTitle}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
          <Metric label={t('share.originalConfidence')} value={`${decision.confidence}%`} accent />
          <Metric label={t('share.predictionMatch')} value={t(matchKey)} />
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: includeLesson && replay.lesson ? '14px' : '18px' }}>
          <Metric label={t('share.outcomeQuality')} value={`${replay.rating}/4`} />
          <Metric label={t('share.calibrationSignal')} value={t(signalKey)} compact />
        </div>

        {includeLesson && replay.lesson && (
          <div style={{ background: 'rgba(178,90,60,0.09)', borderRadius: '8px', padding: '12px 15px', marginBottom: '18px' }}>
            <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#B25A3C', marginBottom: '5px' }}>
              {t('share.lesson')}
            </div>
            <div style={{ fontSize: '13px', color: '#2C2825', fontStyle: 'italic', lineHeight: 1.45 }}>
              “{replay.lesson}”
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', fontSize: '10px', color: '#8A8070', marginBottom: '8px' }}>
          {t('share.singleReplayNote')}
        </div>
        <div style={{ textAlign: 'center', fontSize: '12px', color: '#B25A3C', fontWeight: 600 }}>
          decision replay · {origin.replace(/^https?:\/\//, '')}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <Button onClick={generateImage} disabled={generating}>
          <Download size={16} /> {generating ? t('share.generating') : t('share.downloadPng')}
        </Button>
        <Button variant="secondary" onClick={nativeShare} disabled={generating}>
          <Share2 size={16} /> {t('share.shareImage')}
        </Button>
        <Button variant="secondary" onClick={copyShareText}>
          {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? t('share.copied') : t('share.copyLinkedIn')}
        </Button>
        <Button variant="secondary" onClick={shareToLinkedIn}><Linkedin size={16} /> LinkedIn</Button>
      </div>
    </Modal>
  );
};

const Metric = ({ label, value, accent = false, compact = false }: { label: string; value: string; accent?: boolean; compact?: boolean }) => (
  <div style={{ flex: 1, background: 'rgba(255,255,255,0.76)', borderRadius: '12px', padding: '15px', textAlign: 'center' }}>
    <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#8A8070', marginBottom: '8px' }}>
      {label}
    </div>
    <div style={{
      fontSize: compact ? '14px' : accent ? '30px' : '16px',
      fontWeight: 700,
      color: accent ? '#B25A3C' : '#2C2825',
      lineHeight: 1.25,
      minHeight: compact ? '38px' : undefined,
      display: compact ? 'flex' : undefined,
      alignItems: compact ? 'center' : undefined,
      justifyContent: compact ? 'center' : undefined,
    }}>
      {value}
    </div>
  </div>
);

const getSignalKey = (confidence: number, match: DecisionReplay['expectationMatch']): string => {
  if (!match) return 'share.signalNotAvailable';
  if (match === 'partial') return 'share.signalPartial';
  if (match === 'no' && confidence >= 70) return 'share.signalHighConfidenceMiss';
  if (match === 'yes' && confidence < 60) return 'share.signalCautiousHit';
  if (match === 'yes') return 'share.signalWellCalibrated';
  return 'share.signalNotAvailable';
};
