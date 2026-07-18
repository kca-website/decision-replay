import type { DecisionSnapshot, DecisionReplay } from '../db/db';

export interface CalibrationStats {
  count: number;
  averageConfidence: number;
  confirmedRate: number;
  hasEnoughData: boolean;
}

export const computeCalibration = (
  decisions: DecisionSnapshot[],
  replays: DecisionReplay[]
): CalibrationStats => {
  const replayed = replays.map((r) => {
    const dec = decisions.find((d) => d.id === r.decisionId);
    return dec ? { dec, rep: r } : null;
  }).filter((x): x is { dec: DecisionSnapshot; rep: DecisionReplay } => x !== null);

  if (replayed.length === 0) {
    return { count: 0, averageConfidence: 0, confirmedRate: 0, hasEnoughData: false };
  }

  const avgConf = replayed.reduce((sum, { dec }) => sum + dec.confidence, 0) / replayed.length;
  // "Confirmed" = rating 3 or 4 (good or great) — a soft proxy
  const confirmed = replayed.filter(({ rep }) => rep.rating >= 3).length;
  const confirmedRate = (confirmed / replayed.length) * 100;

  return {
    count: replayed.length,
    averageConfidence: Math.round(avgConf),
    confirmedRate: Math.round(confirmedRate),
    hasEnoughData: replayed.length >= 5,
  };
};

export const getObservation = (
  confidence: number,
  rating: number,
  hadRisks: boolean,
  t: (key: string, opts?: any) => string
): string[] => {
  const observations: string[] = [];
  // Rating: 1-4. Confidence: 0-100. Confirmed if rating >= 3.
  const confirmed = rating >= 3;
  if (confirmed && confidence >= 55 && confidence <= 85) {
    observations.push(t('comparison.observationCalibratedGood', { c: confidence }));
  } else if (!confirmed && confidence >= 75) {
    observations.push(t('comparison.observationOveroptimistic'));
  }
  if (hadRisks) {
    observations.push(t('comparison.observationRiskCaught'));
  }
  return observations;
};
