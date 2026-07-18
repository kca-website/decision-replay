import { db, type DecisionSnapshot, type DecisionReplay, type DecisionNote } from '../db/db';

export interface BackupPayload {
  app: 'decision-replay';
  version: 1;
  exportedAt: number;
  decisions: DecisionSnapshot[];
  replays: DecisionReplay[];
  notes: DecisionNote[];
}

export const exportBackup = async (): Promise<BackupPayload> => {
  const [decisions, replays, notes] = await Promise.all([
    db.decisions.toArray(),
    db.replays.toArray(),
    db.notes.toArray(),
  ]);
  return { app: 'decision-replay', version: 1, exportedAt: Date.now(), decisions, replays, notes };
};

export const downloadBackup = async (): Promise<void> => {
  const payload = await exportBackup();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  a.download = `decision-replay-backup-${date}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const validateBackup = (raw: unknown): raw is BackupPayload => {
  const p = raw as Partial<BackupPayload>;
  return (
    !!p && typeof p === 'object' &&
    p.app === 'decision-replay' &&
    typeof p.version === 'number' &&
    Array.isArray(p.decisions) &&
    Array.isArray(p.replays) &&
    Array.isArray(p.notes)
  );
};

export const restoreBackup = async (payload: BackupPayload, mode: 'replace' | 'merge'): Promise<number> => {
  if (mode === 'replace') {
    await db.transaction('rw', db.decisions, db.replays, db.notes, async () => {
      await Promise.all([db.decisions.clear(), db.replays.clear(), db.notes.clear()]);
      await db.decisions.bulkPut(payload.decisions);
      await db.replays.bulkPut(payload.replays);
      await db.notes.bulkPut(payload.notes);
    });
  } else {
    // merge — skip existing IDs
    await db.transaction('rw', db.decisions, db.replays, db.notes, async () => {
      const existingIds = new Set((await db.decisions.toArray()).map((d) => d.id));
      const newDecisions = payload.decisions.filter((d) => !existingIds.has(d.id));
      await db.decisions.bulkAdd(newDecisions);
      const existingReplays = new Set((await db.replays.toArray()).map((r) => r.id));
      const newReplays = payload.replays.filter((r) => !existingReplays.has(r.id));
      await db.replays.bulkAdd(newReplays);
      const existingNotes = new Set((await db.notes.toArray()).map((n) => n.id));
      const newNotes = payload.notes.filter((n) => !existingNotes.has(n.id));
      await db.notes.bulkAdd(newNotes);
    });
  }
  return payload.decisions.length;
};

export const readFileAsJson = (file: File): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try { resolve(JSON.parse(String(reader.result))); }
      catch (e) { reject(e); }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
};

export const deleteAllData = async (): Promise<void> => {
  await db.transaction('rw', db.decisions, db.replays, db.notes, async () => {
    await db.decisions.clear();
    await db.replays.clear();
    await db.notes.clear();
  });
};
