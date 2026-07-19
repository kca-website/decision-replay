import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Copy, Download, Share2 } from 'lucide-react';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import type { DecisionSnapshot, DecisionReplay } from '../db/db';

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
  const [copied, setCopied] = useState(false);

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const matchKey = replay.expectationMatch
    ? `replay.match${replay.expectationMatch === 'yes' ? 'Yes' : replay.expectationMatch === 'partial' ? 'Partial' : 'No'}`
    : 'share.replayCompleted';
  const cardTitle = includeTitle ? decision.title : t('share.anonymousTitle');

  const generateImage = async () => {
    if (!cardRef.current) return;
    setGenerating(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#FAF7F0',
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement('a');
      link.download = `decision-replay-${decision.id.slice(0, 8)}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      setGenerating(false);
    }
  };

  const shareText = t('share.postText', {
    confidence: decision.confidence,
    match: t(matchKey),
  });

  const copyShareText = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${origin}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access can be blocked by browser permissions. Native share remains available where supported.
    }
  };

  const nativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Decision Replay', text: shareText, url: origin });
        return;
      }
      await copyShareText();
    } catch {
      // The user may cancel the native share dialog; no error state is needed.
    }
  };

  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(origin)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <Modal open={open} onClose={onClose} title={t('share.title')}>
      <p className="text-sm text-ink-muted mb-4">{t('share.privacyNote')}</p>

      <label className="flex items-start gap-3 p-3.5 bg-subtle rounded-lg mb-5 cursor-pointer">
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

        <div style={{ display: 'flex', gap: '12px', marginBottom: '18px' }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.76)', borderRadius: '12px', padding: '15px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#8A8070', marginBottom: '8px' }}>
              {t('share.originalConfidence')}
            </div>
            <div style={{ fontSize: '30px', fontWeight: 700, color: '#B25A3C' }}>{decision.confidence}%</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.76)', borderRadius: '12px', padding: '15px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#8A8070', marginBottom: '8px' }}>
              {t('share.predictionMatch')}
            </div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#2C2825', lineHeight: 1.25, minHeight: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {t(matchKey)}
            </div>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.58)', borderRadius: '10px', padding: '13px 16px', marginBottom: replay.lesson ? '14px' : '18px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#8A8070', marginBottom: '5px' }}>
            {t('share.outcomeQuality')}
          </div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#2C2825' }}>{replay.rating}/4</div>
        </div>

        {replay.lesson && (
          <div style={{ background: 'rgba(178,90,60,0.09)', borderRadius: '8px', padding: '12px 15px', marginBottom: '18px' }}>
            <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#B25A3C', marginBottom: '5px' }}>
              {t('share.lesson')}
            </div>
            <div style={{ fontSize: '13px', color: '#2C2825', fontStyle: 'italic', lineHeight: 1.45 }}>
              “{replay.lesson}”
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', fontSize: '12px', color: '#B25A3C', fontWeight: 600 }}>
          decision replay · {origin.replace(/^https?:\/\//, '')}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <Button onClick={generateImage} disabled={generating}>
          <Download size={16} /> {generating ? t('share.generating') : t('share.downloadPng')}
        </Button>
        <Button variant="secondary" onClick={nativeShare}>
          <Share2 size={16} /> {t('share.shareButton')}
        </Button>
        <Button variant="secondary" onClick={copyShareText}>
          {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? t('share.copied') : t('share.copyText')}
        </Button>
        <Button variant="secondary" onClick={shareToLinkedIn}>LinkedIn</Button>
      </div>
    </Modal>
  );
};
