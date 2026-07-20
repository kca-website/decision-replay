import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Briefcase, BookOpen, Compass, ArrowRight, Home } from 'lucide-react';
import { useProfile } from '../store/profileStore';
import { Button } from '../components/ui/Button';
import type { UserProfile } from '../db/db';

export const Onboarding = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { profile, setProfile, setOnboarded } = useProfile();
  const [chosen, setChosen] = useState<UserProfile>(profile ?? 'professional');

  const done = () => {
    setProfile(chosen);
    setOnboarded(true);
    navigate('/app/decisions/new');
  };

  return (
    <div className="min-h-screen bg-app p-4">
      <div className="max-w-xl mx-auto pt-4 md:pt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink mb-6"
        >
          <Home size={17} />
          {t('nav.home')}
        </Link>

        <div className="w-full bg-card border rounded-xl p-6 md:p-10 shadow-sm">
          <div className="text-xs uppercase tracking-[0.16em] text-accent font-semibold mb-3">{t('onboarding.eyebrow')}</div>
          <h1 className="font-display text-3xl md:text-4xl mb-3">{t('onboarding.step1Title')}</h1>
          <p className="text-ink-muted mb-8">{t('onboarding.step1Sub')}</p>

          <div className="space-y-3">
            <ProfileButton icon={<Briefcase size={20} />} title={t('profile.professional')} desc={t('onboarding.professionalDesc')} value="professional" chosen={chosen} onClick={setChosen} />
            <ProfileButton icon={<BookOpen size={20} />} title={t('profile.student')} desc={t('onboarding.studentDesc')} value="student" chosen={chosen} onClick={setChosen} />
            <ProfileButton icon={<Compass size={20} />} title={t('profile.personal')} desc={t('onboarding.personalDesc')} value="personal" chosen={chosen} onClick={setChosen} />
          </div>

          <p className="text-xs text-ink-subtle mt-6">{t('onboarding.changeLater')}</p>

          <div className="mt-8 flex justify-end">
            <Button onClick={done} size="lg">
              {t('onboarding.continue')} <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProfileButtonProps {
  icon: JSX.Element;
  title: string;
  desc: string;
  value: UserProfile;
  chosen: UserProfile;
  onClick: (value: UserProfile) => void;
}

const ProfileButton = ({ icon, title, desc, value, chosen, onClick }: ProfileButtonProps) => {
  const active = chosen === value;
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      aria-pressed={active}
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
