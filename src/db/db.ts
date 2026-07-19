import Dexie, { type Table } from 'dexie';

export type UserProfile = 'professional' | 'student' | 'personal';

export type DecisionStatus = 'active' | 'checkin' | 'replay' | 'completed';

export interface DecisionSnapshot {
  id: string;
  createdAt: number;
  lockedAt: number;
  templateId: string;
  status: DecisionStatus;
  title: string;
  situation?: string;
  options: string[];
  choiceIndex: number;
  choice?: string;
  reason: string;
  expected: string;
  successCriterion?: string;
  confidence: number;
  assumptions?: string;
  risks?: string;
  missing?: string;
  secondOpinion?: string;
  replayDate: number;
  midCheckin: boolean;
}

export interface DecisionReplay {
  id: string;
  decisionId: string;
  completedAt: number;
  outcome: string;
  rating: 1 | 2 | 3 | 4;
  expectationMatch?: 'yes' | 'partial' | 'no';
  wentAsExpected?: string;
  wentDifferent?: string;
  unexpected?: string;
  wouldRepeat: 'yes' | 'no' | 'maybe';
  whatChange?: string;
  lesson?: string;
}

export interface DecisionNote {
  id: string;
  decisionId: string;
  createdAt: number;
  text: string;
}

export interface AppMeta {
  key: string;
  value: string;
}

class DecisionReplayDB extends Dexie {
  decisions!: Table<DecisionSnapshot, string>;
  replays!: Table<DecisionReplay, string>;
  notes!: Table<DecisionNote, string>;
  meta!: Table<AppMeta, string>;

  constructor() {
    super('decision_replay');
    this.version(1).stores({
      decisions: 'id, status, replayDate, createdAt',
      replays: 'id, decisionId, completedAt',
      notes: 'id, decisionId, createdAt',
      meta: 'key',
    });
  }
}

export const db = new DecisionReplayDB();

export const genId = (): string => {
  // Simple lightweight id — no need for uuid dependency
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
};

export const setMeta = async (key: string, value: string): Promise<void> => {
  await db.meta.put({ key, value });
};

export const getMeta = async (key: string): Promise<string | undefined> => {
  const row = await db.meta.get(key);
  return row?.value;
};

export const computeDecisionStatus = (d: DecisionSnapshot, hasReplay: boolean, now = Date.now()): DecisionStatus => {
  if (hasReplay) return 'completed';
  const daysUntilReplay = (d.replayDate - now) / (1000 * 60 * 60 * 24);
  if (daysUntilReplay <= 0) return 'replay';
  if (d.midCheckin) {
    const period = d.replayDate - d.lockedAt;
    const midpoint = d.lockedAt + period / 2;
    if (now >= midpoint && daysUntilReplay > 0) return 'checkin';
  }
  return 'active';
};
