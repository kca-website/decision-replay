import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Briefcase, BookOpen, Compass, ArrowRight } from 'lucide-react';
import { useProfile } from '../store/profileStore';
import { Button } from '../components/ui/Button';
import type { UserProfile } from '../db/db';

export const Onboarding = () => {
  const { t } = useTranslation();
  const nav = useNavigate();
  const { setProfile, setOnboarded } = useProfile();
  const [step, setStep] = useState<1 | 2>(1);
  const [chosen, setChosen] = useState<UserProfile | null>(null);

  const done = () => {
    if (chosen) setProfile(chosen);
    setOnboarded(true);
    nav('/app');
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-app flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-xs text-ink-subtle mb-3">1 / 2</div>
          <h1 className="font-display text-3xl md:text-4xl mb-3">{t('onboarding.step1Title')}</h1>
          <p className="text-ink-muted mb-8">{t('onboarding.step1Sub')}</p>

          <div className="space-y-3">
            <ProfileButton icon={<Briefcase size={20} />} title={t('profile.professional')} desc={t('landing.profileProfDesc')} value="professional" chosen={chosen} onClick={setChosen} />
            <ProfileButton icon={<BookOpen size={20} />} title={t('profile.student')} desc={t('landing.profileStudentDesc')} value="student" chosen={chosen} onClick={setChosen} />
            <ProfileButton icon={<Compass size={20} />} title={t('profile.personal')} desc={t('landing.profilePersonalDesc')} value="personal" chosen={chosen} onClick={setChosen} />
          </div>

          <p className="text-xs text-ink-subtle mt-6">{t('onboarding.changeLater')}</p>

          <div className="mt-8 flex justify-between items-center gap-3">
            <Button variant="ghost" onClick={done}>{t('common.skip')}</Button>
            <Button onClick={() => setStep(2)} disabled={!chosen}>
              {t('common.next')} <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-xs text-ink-subtle mb-3">2 / 2</div>
        <h1 className="font-display text-3xl mb-4">{t('brand')}</h1>
        <div className="space-y-6 mb-10">
          <div className="border-l-4 border-accent pl-4"><p className="text-lg">{t('onboarding.step2Title1')}</p></div>
          <div className="border-l-4 border-accent pl-4"><p className="text-lg">{t('onboarding.step2Title2')}</p></div>
          <div className="border-l-4 border-accent pl-4"><p className="text-lg">{t('onboarding.step2Title3')}</p></div>
        </div>
        <Button onClick={done} size="lg" className="w-full justify-center">
          {t('onboarding.goToApp')} <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
};

interface PBProps { icon: JSX.Element; title: string; desc: string; value: UserProfile; chosen: UserProfile | null; onClick: (v: UserProfile) => void; }
const ProfileButton = ({ icon, title, desc, value, chosen, onClick }: PBProps) => {
  const active = chosen === value;
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
        active ? 'border-accent bg-accent-soft' : 'border-border hover:border-border-strong bg-card'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 ${active ? 'bg-accent text-white' : 'bg-accent-soft text-accent'}`}>{icon}</div>
        <div>
          <div className="font-medium text-ink">{title}</div>
          <div className="text-sm text-ink-muted">{desc}</div>
        </div>
      </div>
    </button>
  );
};
