import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Shield } from 'lucide-react';

export const Privacy = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-app">
      <div className="container-read py-10">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink mb-8">
          <ArrowLeft size={16} /> {t('brand')}
        </Link>
        <div className="flex items-center gap-3 mb-6">
          <Shield className="text-accent" />
          <h1 className="font-display text-4xl">{t('privacy.title')}</h1>
        </div>
        <p className="text-lg leading-relaxed text-ink mb-6">{t('privacy.summary')}</p>
        <ul className="space-y-3 text-ink-muted list-disc pl-6 mb-10">
          <li>{t('privacy.detail1')}</li>
          <li>{t('privacy.detail2')}</li>
          <li>{t('privacy.detail3')}</li>
          <li>{t('privacy.detail4')}</li>
          <li>{t('privacy.detail5')}</li>
        </ul>

        <div className="bg-subtle rounded-lg p-6">
          <h3 className="font-medium mb-2">{t('privacy.sensitiveTitle')}</h3>
          <p className="text-sm text-ink-muted">{t('privacy.sensitive')}</p>
        </div>
      </div>
    </div>
  );
};
