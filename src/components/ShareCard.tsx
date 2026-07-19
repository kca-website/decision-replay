import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, Share2, X } from 'lucide-react';
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

  const ratingEmojis = ['😞', '😐', '🙂', '😄'];
  const gap = Math.abs(decision.confidence - (replay.rating >= 3 ? decision.confidence : Math.max(0, decision.confidence - 30)));
  const confirmed = replay.rating >= 3;

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
    } catch (err) {
      console.error('Failed to generate image:', err);
    }
    setGenerating(false);
  };

  const shareText = `${t('share.tweet', { title: decision.title, confidence: decision.confidence })} ${window.location.origin}`;

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`, '_blank');
  };

  return (
    <Modal open={open} onClose={onClose} title={t('share.title')}>
      {/* The shareable card */}
      <div
        ref={cardRef}
        className="rounded-xl overflow-hidden mb-6"
        style={{
          background: 'linear-gradient(135deg, #FAF7F0 0%, #F0E8D8 100%)',
          padding: '32px',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#8A8070', marginBottom: '8px' }}>
            Decision Replay
          </div>
          <div style={{ fontSize: '20px', fontWeight: 600, color: '#2C2825', lineHeight: 1.3 }}>
            {decision.title}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.7)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#8A8070', marginBottom: '8px' }}>
              {t('share.predicted')}
            </div>
            <div style={{ fontSize: '32px', fontWeight: 700, color: '#B25A3C' }}>
              {decision.confidence}%
            </div>
            <div style={{ fontSize: '12px', color: '#6B6560', marginTop: '4px' }}>
              {t('share.confidence')}
            </div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.7)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#8A8070', marginBottom: '8px' }}>
              {t('share.actual')}
            </div>
            <div style={{ fontSize: '32px' }}>
              {ratingEmojis[replay.rating - 1]}
            </div>
            <div style={{ fontSize: '12px', color: '#6B6560', marginTop: '4px' }}>
              {confirmed ? t('share.confirmed') : t('share.notConfirmed')}
            </div>
          </div>
        </div>

        {replay.lesson && (
          <div style={{ background: 'rgba(178,90,60,0.08)', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#B25A3C', marginBottom: '4px' }}>
              {t('share.lesson')}
            </div>
            <div style={{ fontSize: '14px', color: '#2C2825', fontStyle: 'italic' }}>
              "{replay.lesson}"
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', fontSize: '13px', color: '#B25A3C', fontWeight: 500 }}>
          {t('share.cta')} → {window.location.origin}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={generateImage} disabled={generating} className="flex-1">
          <Download size={16} />
          {generating ? t('share.generating') : t('share.downloadPng')}
        </Button>
        <Button variant="secondary" onClick={shareToTwitter} className="flex-1">
          𝕏 Twitter
        </Button>
        <Button variant="secondary" onClick={shareToLinkedIn} className="flex-1">
          LinkedIn
        </Button>
      </div>
    </Modal>
  );
};
