import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLiveQuery } from 'dexie-react-hooks';
import { Download, Upload, Trash2 } from 'lucide-react';
import { db } from '../db/db';
import { useProfile } from '../store/profileStore';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { downloadBackup, readFileAsJson, validateBackup, restoreBackup, deleteAllData, type BackupPayload } from '../utils/backup';
import type { UserProfile } from '../db/db';

const VERSION = '0.4.0';

export const Settings = () => {
  const { t, i18n } = useTranslation();
  const { profile, setProfile } = useProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [restoreState, setRestoreState] = useState<BackupPayload | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const count = useLiveQuery(() => db.decisions.count(), []) ?? 0;

  const onFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const raw = await readFileAsJson(file);
      if (validateBackup(raw)) {
        setRestoreState(raw);
      } else {
        setMessage(t('settings.corruptFile'));
      }
    } catch {
      setMessage(t('settings.corruptFile'));
    }
    e.target.value = '';
  };

  const doRestore = async (mode: 'replace' | 'merge') => {
    if (!restoreState) return;
    const n = await restoreBackup(restoreState, mode);
    setRestoreState(null);
    setMessage(t('settings.restoreSuccess', { count: n }));
  };

  const doDelete = async () => {
    await deleteAllData();
    setShowDelete(false);
    setMessage(t('settings.deleteAllDone'));
  };

  return (
    <div className="container-app py-6 md:py-10 max-w-2xl">
      <h1 className="font-display text-3xl md:text-4xl mb-8">{t('settings.title')}</h1>

      {message && (
        <div className="mb-6 p-4 bg-success/10 border border-success/30 rounded-md text-sm text-ink" role="status">
          {message}
        </div>
      )}

      <Card className="mb-6" padding="lg">
        <h3 className="font-medium text-lg mb-4">{t('settings.language')}</h3>
        <div className="flex gap-2">
          {(['el', 'en'] as const).map((lng) => (
            <button
              key={lng}
              onClick={() => i18n.changeLanguage(lng)}
              className={`px-4 py-2 rounded-md border-2 transition-all ${
                i18n.language.startsWith(lng) ? 'border-accent bg-accent-soft' : 'border-border hover:border-border-strong'
              }`}
            >
              {lng === 'el' ? 'Ελληνικά' : 'English'}
            </button>
          ))}
        </div>
      </Card>

      <Card className="mb-6" padding="lg">
        <h3 className="font-medium text-lg mb-4">{t('settings.profile')}</h3>
        <div className="space-y-2">
          {(['professional', 'student', 'personal'] as UserProfile[]).map((p) => (
            <label key={p} className={`flex items-center gap-3 p-3.5 border-2 rounded-md cursor-pointer transition-all ${
              profile === p ? 'border-accent bg-accent-soft/40' : 'border-border hover:border-border-strong'
            }`}>
              <input type="radio" name="profile" checked={profile === p} onChange={() => setProfile(p)} className="w-4 h-4 accent-accent" />
              <span>{t(`profile.${p}`)}</span>
            </label>
          ))}
        </div>
      </Card>

      <Card className="mb-6" padding="lg">
        <h3 className="font-medium text-lg mb-2">{t('settings.data')}</h3>
        <p className="text-sm text-ink-muted mb-4">{t('settings.dataSummary', { count })}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="secondary" onClick={downloadBackup} disabled={count === 0}>
            <Download size={16} /> {t('settings.downloadBackup')}
          </Button>
          <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
            <Upload size={16} /> {t('settings.restoreBackup')}
          </Button>
          <input ref={fileInputRef} type="file" accept="application/json" onChange={onFileSelect} className="hidden" />
        </div>
      </Card>

      <Card padding="lg" className="!border-danger/30">
        <h3 className="font-medium text-lg mb-2 text-danger">{t('settings.dangerZone')}</h3>
        <Button variant="danger" onClick={() => setShowDelete(true)} disabled={count === 0}>
          <Trash2 size={16} /> {t('settings.deleteAll')}
        </Button>
      </Card>

      <p className="text-center text-xs text-ink-subtle mt-8">
        {t('settings.version', { v: VERSION })}
      </p>

      <Modal open={showDelete} onClose={() => setShowDelete(false)} title={t('settings.deleteAll')}>
        <p className="text-ink-muted mb-6">{t('settings.deleteAllConfirm')}</p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setShowDelete(false)}>{t('common.cancel')}</Button>
          <Button variant="secondary" onClick={() => { downloadBackup(); setShowDelete(false); }}>
            <Download size={16} /> {t('settings.downloadBackup')}
          </Button>
          <Button variant="danger" onClick={doDelete}>{t('common.delete')}</Button>
        </div>
      </Modal>

      <Modal open={!!restoreState} onClose={() => setRestoreState(null)} title={t('settings.restoreBackup')}>
        {restoreState && (
          <>
            <p className="text-ink-muted mb-6">{t('settings.restoreQuestion', { count: restoreState.decisions.length })}</p>
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <Button variant="ghost" onClick={() => setRestoreState(null)}>{t('common.cancel')}</Button>
              <Button variant="secondary" onClick={() => doRestore('merge')}>{t('settings.restoreMerge')}</Button>
              <Button onClick={() => doRestore('replace')}>{t('settings.restoreReplace')}</Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};
