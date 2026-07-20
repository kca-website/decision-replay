import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, LockKeyhole, Swords } from 'lucide-react';
import { decodeChallenge, type ChallengeData } from '../utils/challenge';
import { Card } from '../components/ui/Card';
import { Button, buttonClasses } from '../components/ui/Button';
import { Slider } from '../components/ui/Slider';
import { Textarea } from '../components/ui/Textarea';
import { trackEvent } from '../utils/analytics';

export const Challenge = () => {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const queryEncoded = params.get('d');
  const hashEncoded = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.hash.replace(/^#/, '')).get('d')
    : null;
  const encoded = hashEncoded || queryEncoded;
  const [challenge, setChallenge] = useState<ChallengeData | null>(null);
  const [step, setStep] = useState<'predict' | 'reveal'>('predict');
  const [myPrediction, setMyPrediction] = useState('');
  const [myConfidence, setMyConfidence] = useState(50);
  const [myName, setMyName] = useState('');

  useEffect(() => {
    if (encoded) {
      const data = decodeChallenge(encoded);
      if (data) setChallenge(data);
    }
  }, [encoded]);

  if (!encoded || !challenge) {
    return (
      <div className="container-app py-10 md:py-16 text-center max-w-2xl">
        <Swords size={48} className="mx-auto text-ink-subtle mb-4" />
        <h1 className="font-display text-3xl mb-3">{t('challenge.invalidTitle')}</h1>
        <p className="text-ink-muted mb-6">{t('challenge.invalidDesc')}</p>
        <Link to="/" className={buttonClasses()}>{t('challenge.goHome')}</Link>
      </div>
    );
  }

  const reveal = () => {
    setStep('reveal');
    trackEvent('challenge_completed', {
      confidence_gap: Math.abs(myConfidence - challenge.c),
    });
  };

  if (step === 'reveal') {
    const myConf = myConfidence;
    const theirConf = challenge.c;
    const gap = Math.abs(myConf - theirConf);

    return (
      <div className="container-app py-6 md:py-10 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink mb-6">
          <ArrowLeft size={16} /> {t('brand')}
        </Link>

        <h1 className="font-display text-3xl md:text-4xl mb-2">
          <Swords size={28} className="inline mr-2 text-accent" />
          {t('challenge.revealTitle')}
        </h1>
        <p className="text-ink-muted mb-8">{challenge.q}</p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Card padding="lg" className="bg-subtle">
            <div className="text-xs uppercase tracking-wider text-ink-muted font-medium mb-4">
              {challenge.n} {t('challenge.said')}
            </div>
            <div className="mb-3">
              <div className="text-[13px] text-ink-muted mb-1">{t('challenge.prediction')}</div>
              <p className="text-ink">{challenge.p}</p>
            </div>
            {challenge.o.length > 0 && (
              <div className="mb-3">
                <div className="text-[13px] text-ink-muted mb-1">{t('challenge.choice')}</div>
                <p className="text-ink font-medium">{challenge.o[challenge.ci]}</p>
              </div>
            )}
            <div>
              <div className="text-[13px] text-ink-muted mb-1">{t('challenge.confidence')}</div>
              <div className="font-display text-2xl text-accent font-medium">{theirConf}%</div>
            </div>
          </Card>

          <Card padding="lg">
            <div className="text-xs uppercase tracking-wider text-accent font-medium mb-4">
              {myName || t('challenge.you')} {t('challenge.said')}
            </div>
            <div className="mb-3">
              <div className="text-[13px] text-ink-muted mb-1">{t('challenge.prediction')}</div>
              <p className="text-ink">{myPrediction}</p>
            </div>
            <div>
              <div className="text-[13px] text-ink-muted mb-1">{t('challenge.confidence')}</div>
              <div className="font-display text-2xl text-accent font-medium">{myConf}%</div>
            </div>
          </Card>
        </div>

        <Card padding="md" className="bg-accent-soft/30 !border-accent-soft mb-4">
          <div className="text-center">
            <div className="text-sm text-ink-muted mb-1">{t('challenge.confidenceGap')}</div>
            <div className="font-display text-4xl font-medium text-accent">{gap}%</div>
            <p className="text-sm text-ink-muted mt-2">
              {gap <= 10 ? t('challenge.gapClose') : gap <= 30 ? t('challenge.gapModerate') : t('challenge.gapLarge')}
            </p>
          </div>
        </Card>

        <p className="text-sm text-ink-muted text-center mb-7">{t('challenge.completedNote')}</p>

        <div className="text-center">
          <p className="text-ink-muted text-sm mb-4">{t('challenge.ctaDesc')}</p>
          <Link to="/app/decisions/new" className={buttonClasses()}>{t('challenge.tryApp')}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-app py-6 md:py-10 max-w-2xl">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink mb-6">
        <ArrowLeft size={16} /> {t('brand')}
      </Link>

      <div className="flex items-center gap-3 mb-2">
        <Swords size={24} className="text-accent" />
        <h1 className="font-display text-2xl md:text-3xl">{t('challenge.title')}</h1>
      </div>
      <p className="text-ink-muted mb-5">
        {t('challenge.from', { name: challenge.n })}
      </p>

      <div className="flex items-start gap-3 p-4 bg-success/10 border border-success/20 rounded-lg mb-6 text-sm text-ink-muted">
        <LockKeyhole size={18} className="text-success flex-shrink-0 mt-0.5" />
        <p>{t('challenge.privateUntilSubmit')}</p>
      </div>

      <Card padding="lg" className="mb-6">
        <h2 className="font-display text-xl mb-4">{challenge.q}</h2>
        {challenge.s && (
          <div className="mb-4">
            <div className="text-[13px] text-ink-muted mb-1">{t('detail.situation')}</div>
            <p className="text-ink text-sm">{challenge.s}</p>
          </div>
        )}
        {challenge.o.length > 0 && (
          <div className="mb-4">
            <div className="text-[13px] text-ink-muted mb-1">{t('detail.options')}</div>
            <ul className="space-y-1 text-sm">
              {challenge.o.map((option, index) => <li key={index} className="text-ink">• {option}</li>)}
            </ul>
          </div>
        )}
      </Card>

      <Card padding="lg" className="mb-6 space-y-5">
        <div>
          <label htmlFor="challenge-name" className="block text-sm font-medium mb-2">{t('challenge.yourName')}</label>
          <input
            id="challenge-name"
            type="text"
            value={myName}
            onChange={(event) => setMyName(event.target.value)}
            placeholder={t('challenge.namePlaceholder')}
            className="w-full px-3.5 py-2.5 border rounded-md bg-card text-[15px] focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15"
          />
        </div>
        <div>
          <label htmlFor="challenge-prediction" className="block text-sm font-medium mb-2">{t('challenge.yourPrediction')}</label>
          <Textarea
            id="challenge-prediction"
            value={myPrediction}
            onChange={(event) => setMyPrediction(event.target.value)}
            placeholder={t('challenge.predictionPlaceholder')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t('challenge.yourConfidence')}</label>
          <Slider value={myConfidence} onChange={setMyConfidence} ariaLabel={t('challenge.yourConfidence')} />
        </div>
      </Card>

      <Button
        className="w-full justify-center"
        disabled={!myPrediction.trim()}
        onClick={reveal}
      >
        {t('challenge.reveal')}
      </Button>
    </div>
  );
};
