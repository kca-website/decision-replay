import { useTranslation } from 'react-i18next';

export const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const cur = i18n.language.startsWith('en') ? 'en' : 'el';
  const change = (lng: 'el' | 'en') => i18n.changeLanguage(lng);

  return (
    <div className="inline-flex bg-subtle rounded-full p-0.5 text-xs font-medium" role="group" aria-label="Language">
      <button
        onClick={() => change('el')}
        className={`px-2.5 py-1 rounded-full transition-colors ${cur === 'el' ? 'bg-card text-ink shadow-xs' : 'text-ink-muted'}`}
      >
        EL
      </button>
      <button
        onClick={() => change('en')}
        className={`px-2.5 py-1 rounded-full transition-colors ${cur === 'en' ? 'bg-card text-ink shadow-xs' : 'text-ink-muted'}`}
      >
        EN
      </button>
    </div>
  );
};
