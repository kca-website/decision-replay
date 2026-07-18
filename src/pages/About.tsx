import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';

export const About = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-app">
      <div className="container-read py-10">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink mb-8">
          <ArrowLeft size={16} /> {t('brand')}
        </Link>
        <h1 className="font-display text-4xl mb-6">{t('about.title')}</h1>
        <p className="text-lg leading-relaxed text-ink mb-4">{t('about.p1')}</p>
        <p className="text-lg leading-relaxed text-ink-muted mb-10">{t('about.p2')}</p>

        <h2 className="font-display text-2xl mt-10 mb-4">{t('about.isNotTitle')}</h2>
        <ul className="space-y-2 text-ink-muted list-disc pl-6">
          <li>{t('about.isNot1')}</li>
          <li>{t('about.isNot2')}</li>
          <li>{t('about.isNot3')}</li>
          <li>{t('about.isNot4')}</li>
        </ul>
      </div>
    </div>
  );
};
